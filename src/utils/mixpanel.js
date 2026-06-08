import mixpanel from "mixpanel-browser";

// eslint-disable-next-line no-undef
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN || "";

// Track 100% of users
const SAMPLING_RATE = 1.0;

// Only initialize if token is provided
if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    // eslint-disable-next-line no-undef
    track_pageview: false,
    persistence: "localStorage", // Keeps session state and anonymous identity
    autocapture: false, // Disabled to prevent duplicate events
    record_sessions_percent: 100, // Disabled for privacy and cost
  });

  // Generate or retrieve anonymous identity (persists across sessions)
  const getOrCreateAnonymousId = () => {
    let anonId = localStorage.getItem("mixpanel_anon_id");

    if (!anonId) {
      // Create anonymous ID: "anon_" + timestamp + random string
      anonId = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("mixpanel_anon_id", anonId);
    }

    return anonId;
  };

  // Check if this user is in the 5% sample
  const isInSample = () => {
    let samplingDecision = localStorage.getItem("mixpanel_sampling");

    if (samplingDecision === null) {
      // First time - randomly decide
      const random = Math.random();
      samplingDecision = random < SAMPLING_RATE ? "true" : "false";
      localStorage.setItem("mixpanel_sampling", samplingDecision);
    }

    return samplingDecision === "true";
  };

  // Set anonymous identity if in sample
  if (isInSample()) {
    const anonId = getOrCreateAnonymousId();
    mixpanel.identify(anonId);

    // Set user properties (anonymous, privacy-safe)
    mixpanel.people.set({
      $name: "Anonymous User",
      sampling_rate: SAMPLING_RATE,
      is_sampled: true,
    });
  }
}

export default mixpanel;