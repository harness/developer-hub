#!/usr/bin/env node
/**
 * Unit tests for scripts/lib/pr-sync-shared.mjs.
 *
 * The headline assertion here is an ABSENCE: updatePR() must not send a `title`
 * key. That is the HDH-1099 fix, and an absence is invisible at runtime — if
 * someone re-adds `title` to the payload, nothing fails, no log looks wrong, and
 * the only symptom is contributors quietly losing their PR titles again, which is
 * exactly how the original bug went unnoticed. Hence a test.
 *
 * checkTitleFormat() is covered too: it is advisory-only, so a bug in it is also
 * silent — it would just warn about titles that are fine, or stay quiet on ones
 * that are not.
 *
 * Run: npm run test:pr-sync-shared
 */
import assert from 'node:assert/strict';
import {
  checkTitleFormat,
  isGeneratedTitleAcceptable,
  extractJira,
  resolveTicket,
  detectType,
  updatePR,
  writePR,
  parseTitle,
  repairTitle,
  TICKET_PLACEHOLDER,
  hasRetitleToken,
  stripRetitleToken,
  RETITLE_TOKEN,
  CONVENTIONAL_TYPES,
} from './lib/pr-sync-shared.mjs';

let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`OK   ${name}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${name}`);
    console.error(`  ${err.message}`);
  }
}

async function checkAsync(name, fn) {
  try {
    await fn();
    console.log(`OK   ${name}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${name}`);
    console.error(`  ${err.message}`);
  }
}

// --- updatePR: must echo the live title, never a caller's -------------------
//
// Harness Code rejects a PATCH with no title (400 "Pull request title can't be
// empty"), so one has to be sent. updatePR() reads the live title and echoes it,
// which makes the write a no-op for the title. These tests exist to stop that
// echo quietly turning back into a rewrite.

// Records every request, answering GETs with a fake PR so updatePR() can read a
// title. Returns { requests, patch } — no network involved.
async function captureRequests(fn, args, { prTitle = 'the author wrote this' } = {}) {
  const realFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, init) => {
    const method = init?.method || 'GET';
    requests.push({ url, method, init, body: init?.body ? JSON.parse(init.body) : null });
    if (method === 'GET') {
      return {
        status: prTitle === null ? 404 : 200,
        text: async () => (prTitle === null ? '' : JSON.stringify({ number: 4821, title: prTitle })),
      };
    }
    return { status: 200, text: async () => JSON.stringify({ number: 4821 }) };
  };
  try {
    await fn(args);
  } finally {
    globalThis.fetch = realFetch;
  }
  return { requests, patch: requests.find((r) => r.method === 'PATCH') || null };
}

await checkAsync('updatePR: echoes the live title back unchanged', async () => {
  const { patch } = await captureRequests(
    updatePR,
    { token: 't', number: 4821, description: 'new description' },
    { prTitle: 'HDH-1099 Update CI PR pipeline step scripts' },
  );
  assert.ok(patch, 'expected a PATCH to have been made');
  assert.equal(patch.body.title, 'HDH-1099 Update CI PR pipeline step scripts');
  assert.equal(patch.body.description, 'new description');
});

await checkAsync('updatePR: reads the title itself rather than trusting a caller', async () => {
  // The failure mode this guards: someone "fixes" the 400 by threading a title in
  // from further up. A stale title is how the original bug reverted people's edits.
  const { patch } = await captureRequests(
    updatePR,
    {
      token: 't',
      number: 4821,
      title: 'chore: [HDH-1]: a stale title from minutes ago',
      description: 'new description',
    },
    { prTitle: 'what the author renamed it to' },
  );
  assert.equal(patch.body.title, 'what the author renamed it to');
});

await checkAsync('updatePR: reads the title immediately before writing', async () => {
  const { requests } = await captureRequests(
    updatePR,
    { token: 't', number: 4821, description: 'new description' },
  );
  assert.equal(requests.length, 2, 'expected exactly one GET then one PATCH');
  assert.equal(requests[0].method, 'GET');
  assert.equal(requests[1].method, 'PATCH');
});

await checkAsync('updatePR: refuses to PATCH when the title cannot be read', async () => {
  // Better to skip a description refresh than to risk blanking a PR title.
  const { requests, patch } = await captureRequests(
    updatePR,
    { token: 't', number: 4821, description: 'new description' },
    { prTitle: null },
  );
  assert.equal(patch, null, 'must not PATCH without a title in hand');
  assert.equal(requests.length, 1, 'should have stopped after the failed GET');
});

// --- checkTitleFormat: advisory, read-only -----------------------------------

check('checkTitleFormat: accepts a conforming title', () => {
  const r = checkTitleFormat('chore: [HDH-1099]: stop CI rewriting PR titles', { jira: 'HDH-1099' });
  assert.equal(r.ok, true, `expected ok, got problems: ${r.problems.join('; ')}`);
  assert.deepEqual(r.problems, []);
});

check('checkTitleFormat: accepts feat as well as chore', () => {
  assert.ok(CONVENTIONAL_TYPES.includes('feat'));
  const r = checkTitleFormat('feat: [HDH-1099]: add a thing', { jira: 'HDH-1099' });
  assert.equal(r.ok, true);
});

check('checkTitleFormat: flags a missing type prefix', () => {
  const r = checkTitleFormat('[HDH-1099]: updated some docs', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /conventional-commit prefix/);
});

check('checkTitleFormat: flags an unrecognised type', () => {
  const r = checkTitleFormat('wip: [HDH-1099]: updated some docs', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /unrecognised type "wip"/);
});

check('checkTitleFormat: flags a missing ticket reference', () => {
  const r = checkTitleFormat('chore: updated some docs', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /no \[HDH-1099\] ticket reference/);
});

check('checkTitleFormat: flags a ticket that does not match the branch', () => {
  const r = checkTitleFormat('chore: [HDH-1100]: updated some docs', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /references HDH-1100, but the branch is for HDH-1099/);
});

check('checkTitleFormat: no ticket required when the branch has none', () => {
  const r = checkTitleFormat('chore: tidy up the sidebar', { jira: null });
  assert.equal(r.ok, true, `expected ok, got problems: ${r.problems.join('; ')}`);
});

check('checkTitleFormat: an empty title is a problem, not a crash', () => {
  for (const t of ['', '   ', null, undefined]) {
    const r = checkTitleFormat(t, { jira: 'HDH-1099' });
    assert.equal(r.ok, false);
    assert.deepEqual(r.problems, ['title is empty']);
  }
});

check('checkTitleFormat: reports every problem at once, not just the first', () => {
  const r = checkTitleFormat('updated some docs', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
  assert.equal(r.problems.length, 2, `expected 2 problems, got: ${r.problems.join('; ')}`);
});

// --- helpers kept alive by the label / Jira-link paths -----------------------

check('extractJira: handles both branch conventions', () => {
  assert.equal(extractJira('HDH-1099/ci-pr-title'), 'HDH-1099');
  assert.equal(extractJira('HDH-1099-ci-pr-title'), 'HDH-1099');
  assert.equal(extractJira('hdh-1099-lowercase'), 'HDH-1099');
  assert.equal(extractJira('no-ticket-here'), null);
  assert.equal(extractJira(''), null);
  assert.equal(extractJira(null), null);
});

check('extractJira: does not mistake standards for tickets', () => {
  // Without the denylist, `fix-utf-8-encoding` yields "UTF-8" and the description
  // grows a Jira link to nowhere.
  assert.equal(extractJira('fix-utf-8-encoding'), null);
  assert.equal(extractJira('follow RFC-2119 wording'), null);
  assert.equal(extractJira('document SHA-256 hashing'), null);
  // ...but a real ticket alongside one still wins.
  assert.equal(extractJira('HDH-1099 document SHA-256 hashing'), 'HDH-1099');
  assert.equal(extractJira('document SHA-256 hashing for HDH-1099'), 'HDH-1099');
});

check('resolveTicket: prefers the title, then commits, then the branch', () => {
  assert.equal(
    resolveTicket({ title: 'chore: [HDH-1]: x', commits: ['HDH-2 y'], branch: 'HDH-3/z' }),
    'HDH-1',
  );
  assert.equal(
    resolveTicket({ title: 'fix the links', commits: ['HDH-2 y'], branch: 'HDH-3/z' }),
    'HDH-2',
  );
  assert.equal(
    resolveTicket({ title: 'fix the links', commits: ['no ticket'], branch: 'HDH-3/z' }),
    'HDH-3',
  );
  assert.equal(
    resolveTicket({ title: 'fix the links', commits: ['no ticket'], branch: 'fix-links' }),
    null,
  );
});

check('resolveTicket: takes the earliest commit that carries one', () => {
  // Commits are passed oldest-first: the first commit states the branch's purpose.
  assert.equal(
    resolveTicket({ commits: ['HDH-10 first', 'HDH-20 later cleanup'], branch: 'no-ticket' }),
    'HDH-10',
  );
});

check('repairTitle: picks up a ticket from the commit message', () => {
  const r = repairTitle({
    title: 'Fix the broken anchor links',
    commits: ['HDH-1234 fix the broken anchor links'],
    branch: 'fix-anchor-links',
  });
  assert.equal(r.title, 'chore: [HDH-1234]: Fix the broken anchor links');
});

check('detectType: still classifies commit subjects for labelling', () => {
  assert.equal(detectType('feat: add a thing'), 'feat');
  assert.equal(detectType('chore(docs): tidy'), 'chore');
  assert.equal(detectType('random subject'), 'chore');
});

// --- opt-in retitle ----------------------------------------------------------

check('hasRetitleToken: finds the token in a subject line', () => {
  assert.equal(hasRetitleToken('fix broken links [retitle]'), true);
  assert.equal(hasRetitleToken('[retitle] fix broken links'), true);
});

check('hasRetitleToken: case and inner spacing are forgiving', () => {
  assert.equal(hasRetitleToken('fix links [Retitle]'), true);
  assert.equal(hasRetitleToken('fix links [ RETITLE ]'), true);
});

check('hasRetitleToken: finds the token in a multi-line commit body', () => {
  assert.equal(hasRetitleToken('fix broken links\n\nlonger explanation\n[retitle]\n'), true);
});

check('hasRetitleToken: false when absent, empty, or nullish', () => {
  assert.equal(hasRetitleToken('fix broken links'), false);
  assert.equal(hasRetitleToken('retitle without brackets'), false);
  assert.equal(hasRetitleToken(''), false);
  assert.equal(hasRetitleToken(null), false);
  assert.equal(hasRetitleToken(undefined), false);
});

check('hasRetitleToken: repeated calls stay consistent', () => {
  // The matcher is a /g regex, so a stale lastIndex would make every other call
  // return false — a bug that would show up as "the token works every second push".
  for (let i = 0; i < 5; i++) {
    assert.equal(hasRetitleToken('fix links [retitle]'), true, `call ${i + 1} disagreed`);
    assert.equal(hasRetitleToken('no marker here'), false, `call ${i + 1} disagreed`);
  }
});

check('stripRetitleToken: removes the marker and tidies whitespace', () => {
  assert.equal(stripRetitleToken('fix broken links [retitle]'), 'fix broken links');
  assert.equal(stripRetitleToken('[retitle] fix broken links'), 'fix broken links');
  assert.equal(stripRetitleToken('fix [retitle] broken links'), 'fix broken links');
  assert.equal(stripRetitleToken('fix links [RETITLE]'), 'fix links');
});

check('stripRetitleToken: leaves an unmarked message alone', () => {
  assert.equal(stripRetitleToken('fix broken links'), 'fix broken links');
  assert.equal(stripRetitleToken(''), '');
  assert.equal(stripRetitleToken(null), '');
});

check('RETITLE_TOKEN is what the docs and logs promise', () => {
  assert.equal(RETITLE_TOKEN, '[retitle]');
  assert.equal(hasRetitleToken(`do a thing ${RETITLE_TOKEN}`), true);
});

check('isGeneratedTitleAcceptable: accepts a well-formed ticketed title', () => {
  const r = isGeneratedTitleAcceptable('chore: [HDH-1099]: stop CI rewriting PR titles', { jira: 'HDH-1099' });
  assert.equal(r.ok, true, `expected ok, got: ${r.problems.join('; ')}`);
});

check('isGeneratedTitleAcceptable: accepts a ticketless title on a ticketless branch', () => {
  const r = isGeneratedTitleAcceptable('chore: tidy up the sidebar', { jira: null });
  assert.equal(r.ok, true, `expected ok, got: ${r.problems.join('; ')}`);
});

check('isGeneratedTitleAcceptable: rejects an invented ticket on a ticketless branch', () => {
  // The failure the AI reviewer caught: a placeholder [JIRA-123] reaching a real PR.
  const r = isGeneratedTitleAcceptable('chore: [JIRA-123]: tidy up the sidebar', { jira: null });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /invented the ticket reference JIRA-123/);
});

check('isGeneratedTitleAcceptable: rejects any invented ticket, not just the placeholder', () => {
  const r = isGeneratedTitleAcceptable('feat: [HDH-4242]: add a thing', { jira: null });
  assert.equal(r.ok, false);
  assert.match(r.problems.join(' '), /HDH-4242/);
});

check('isGeneratedTitleAcceptable: rejects the wrong ticket on a ticketed branch', () => {
  const r = isGeneratedTitleAcceptable('chore: [HDH-1100]: tidy up', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
});

check('isGeneratedTitleAcceptable: rejects a missing type prefix', () => {
  const r = isGeneratedTitleAcceptable('[HDH-1099]: tidy up', { jira: 'HDH-1099' });
  assert.equal(r.ok, false);
});

check('isGeneratedTitleAcceptable is stricter than checkTitleFormat', () => {
  // A human may reference a ticket their branch does not carry — that is a
  // judgement call. A model doing the same thing is a fabrication.
  const title = 'chore: [HDH-4242]: tidy up';
  assert.equal(checkTitleFormat(title, { jira: null }).ok, true);
  assert.equal(isGeneratedTitleAcceptable(title, { jira: null }).ok, false);
});

await checkAsync('writePR: sends both fields in one PATCH, with no preliminary read', async () => {
  // Both fields always go: this endpoint validates the whole payload rather than
  // merging a partial one, which is how the "title can't be empty" 400 happened.
  const { requests, patch } = await captureRequests(writePR, {
    token: 't',
    number: 4821,
    title: 'chore: [HDH-1099]: stop CI rewriting PR titles',
    description: 'the description we just built',
  });
  assert.deepEqual(patch.body, {
    title: 'chore: [HDH-1099]: stop CI rewriting PR titles',
    description: 'the description we just built',
  });
  assert.equal(requests.length, 1);
});

// --- parseTitle / repairTitle: tag and ticket only, never the summary --------

check('parseTitle: splits a fully conforming title', () => {
  assert.deepEqual(parseTitle('chore: [HDH-1099]: Update CI PR pipeline step scripts'), {
    tag: 'chore',
    ticket: 'HDH-1099',
    summary: 'Update CI PR pipeline step scripts',
  });
});

check('parseTitle: promotes a bare leading ticket out of the summary', () => {
  // Harness Code's default shape, and the title on HDH-1099's own PR.
  assert.deepEqual(parseTitle('HDH-1099 Update CI PR pipeline step scripts'), {
    tag: null,
    ticket: 'HDH-1099',
    summary: 'Update CI PR pipeline step scripts',
  });
});

check('parseTitle: handles a missing tag, a missing ticket, and a scope', () => {
  assert.deepEqual(parseTitle('[HDH-1099]: fix the links'), { tag: null, ticket: 'HDH-1099', summary: 'fix the links' });
  assert.deepEqual(parseTitle('chore: fix the links'), { tag: 'chore', ticket: null, summary: 'fix the links' });
  assert.deepEqual(parseTitle('chore(docs): [HDH-1099]: fix the links'), { tag: 'chore', ticket: 'HDH-1099', summary: 'fix the links' });
});

check('parseTitle: recognises the placeholder as an occupied ticket slot', () => {
  assert.deepEqual(parseTitle(`chore: [${TICKET_PLACEHOLDER}]: fix the links`), {
    tag: 'chore',
    ticket: TICKET_PLACEHOLDER,
    summary: 'fix the links',
  });
});

check('parseTitle: does not mistake ordinary prose for a tag', () => {
  // "Note:" is not a conventional type, so it belongs to the author's summary.
  assert.deepEqual(parseTitle('Note: fix the links'), { tag: null, ticket: null, summary: 'Note: fix the links' });
});

check('repairTitle: fixes the real-world Harness Code default', () => {
  const r = repairTitle({ title: 'HDH-1099 Update CI PR pipeline step scripts', branchJira: 'HDH-1099' });
  assert.equal(r.title, 'chore: [HDH-1099]: Update CI PR pipeline step scripts');
  assert.equal(r.changed, true);
});

check('repairTitle: leaves a conforming title completely alone', () => {
  const title = 'chore: [HDH-1099]: Update CI PR pipeline step scripts';
  const r = repairTitle({ title, branchJira: 'HDH-1099' });
  assert.equal(r.changed, false, 'a conforming title must not be rewritten on every push');
  assert.equal(r.title, title);
});

check('repairTitle: is idempotent', () => {
  // The property that stops this looping on every push.
  for (const title of [
    'HDH-1099 Update CI PR pipeline step scripts',
    'chore: fix the links',
    '[HDH-1099]: fix the links',
    'fix the links',
    'Note: fix the links',
  ]) {
    const once = repairTitle({ title, branchJira: 'HDH-1099' }).title;
    const twice = repairTitle({ title: once, branchJira: 'HDH-1099' }).title;
    assert.equal(twice, once, `not idempotent for "${title}"`);
    assert.equal(repairTitle({ title: once, branchJira: 'HDH-1099' }).changed, false);
  }
});

check('repairTitle: never alters the summary', () => {
  const summary = 'Update CI PR pipeline step scripts';
  for (const title of [`HDH-1099 ${summary}`, `chore: ${summary}`, `[HDH-1099]: ${summary}`, summary]) {
    const r = repairTitle({ title, branchJira: 'HDH-1099' });
    assert.ok(r.title.endsWith(summary), `summary altered: "${r.title}"`);
  }
});

check('repairTitle: keeps a ticket that differs from the branch', () => {
  // Presence check, not equality check. An author who retargeted their PR keeps it.
  const r = repairTitle({ title: 'chore: [HDH-1100]: fix the links', branchJira: 'HDH-1099' });
  assert.equal(r.changed, false);
  assert.match(r.title, /HDH-1100/);
});

check('repairTitle: inserts the placeholder when no ticket exists anywhere', () => {
  const r = repairTitle({ title: 'fix the links', branchJira: null });
  assert.equal(r.title, `chore: [${TICKET_PLACEHOLDER}]: fix the links`);
  assert.equal(r.changed, true);
});

check('repairTitle: upgrades the placeholder once a real ticket is known', () => {
  const r = repairTitle({ title: `chore: [${TICKET_PLACEHOLDER}]: fix the links`, branchJira: 'HDH-1099' });
  assert.equal(r.title, 'chore: [HDH-1099]: fix the links');
  assert.equal(r.changed, true);
});

check('repairTitle: prefers the ticket the author wrote in the title', () => {
  const r = repairTitle({ title: '[HDH-1100]: fix the links', branchJira: 'HDH-1099' });
  assert.match(r.title, /HDH-1100/, 'the title is the author\'s Jira hook; the branch is a fallback');
});

check('repairTitle: uses feat when that is the default tag', () => {
  const r = repairTitle({ title: 'HDH-1099 add a new page', branchJira: 'HDH-1099', defaultTag: 'feat' });
  assert.equal(r.title, 'feat: [HDH-1099]: add a new page');
});

check('repairTitle: normalises an unsupported tag rather than inventing a slot', () => {
  const r = repairTitle({ title: 'docs: [HDH-1099]: fix the links', branchJira: 'HDH-1099' });
  assert.equal(r.title, 'chore: [HDH-1099]: fix the links');
});

check('repairTitle: refuses to touch a title with no summary', () => {
  const r = repairTitle({ title: 'chore: [HDH-1099]:', branchJira: 'HDH-1099' });
  assert.equal(r.changed, false);
});

// --- title generation must stay deleted --------------------------------------

await checkAsync('pr-sync-shared exports no title-generation helpers', async () => {
  const mod = await import('./lib/pr-sync-shared.mjs');
  for (const gone of ['buildTitle', 'cleanSubject', 'humanizeBranch', 'createPR']) {
    assert.equal(
      typeof mod[gone],
      'undefined',
      `${gone}() was deleted in HDH-1099 and should not come back`,
    );
  }
});

console.log('');
if (failed) {
  console.error(`${failed} test(s) failed.`);
  process.exit(1);
}
console.log('All pr-sync-shared tests passed.');
