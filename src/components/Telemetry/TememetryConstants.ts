export enum AidaActions {
  AnswerReceived = "CS Bot answer",
  VoteReceived = "AIDA Vote Received",
  FeedbackReceived = "AIDA Feedback Received",
  RemediationRequested = "AIDA Remediation Requested",
  RemediationReceived = "AIDA Remediation Received",
  AIDAInteractionStarted = "AIDA Interaction Started",
}

export enum AidaClient {
  CS_BOT = "CS_BOT",
  CD_RCA = "CD_RCA",
  CI_RCA = "CI_RCA",
  STO_REM = "STO_REM",
  CODE_SEMANTIC_SEARCH = "CODE_SEMANTIC_SEARCH",
  CODE_PR_SUMMARY = "CODE_PR_SUMMARY",
}

export enum SEIActions {
  SEIPageView = "SEI Page View",
  SEIReleaseNotes = "SEI Release Notes",
}