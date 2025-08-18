// Voice configuration for different avatar types
export const AVATAR_VOICE_CONFIG = {
  Ravi: {
    type: "adultMan",
    rate: 0.9,
    pitch: 0.8,
    description: "Adult man voice",
    voiceFilter: (voice) =>
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('mark') ||
      voice.name.toLowerCase().includes('microsoft mark')
  },
  Hema: {
    type: "adultWoman",
    rate: 0.8,
    pitch: 1.1,
    description: "Adult woman voice",
    voiceFilter: (voice) =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('susan') ||
      voice.name.toLowerCase().includes('microsoft zira')
  },
  Subho: {
    type: "teenagerBoy",
    rate: 0.98,
    pitch: 0.8,
    description: "Teenager boy voice",
    voiceFilter: (voice) =>
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('alex')
  },
  Sita: {
    type: "teenagerGirl",
    rate: 1.2,
    pitch: 1.2,
    description: "Teenager girl voice",
    voiceFilter: (voice) =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen')
  }
};

// Welcome messages for each avatar
export const AVATAR_WELCOME_MESSAGES = {
  Ravi: "Hello! I'm Ravi, nice to meet you!",
  Hema: "Hello! I'm Hema, how can I help you today?",
  Subho: "Hey there! I'm Subho, what's up?",
  Sita: "Hi! I'm Sita, pleased to meet you!"
};

/**
 * Get available voices from the browser
 */
export const getAvailableVoices = () => {
  return speechSynthesis.getVoices();
};

/**
 * Get the best voice for a specific avatar
 */
export const getBestVoiceForAvatar = (avatarName) => {
  const voices = getAvailableVoices();
  const config = AVATAR_VOICE_CONFIG[avatarName];

  if (!config) return null;

  // Try to find a voice that matches the character type
  let bestVoice = voices.find(voice =>
    voice.lang.startsWith('en') && config.voiceFilter(voice)
  );

  // Fallback strategies
  if (!bestVoice) {
    if (avatarName === 'Ravi' || avatarName === 'Subho') {
      // For male characters, find any male voice
      bestVoice = voices.find(voice =>
        voice.lang.startsWith('en') &&
        (voice.name.toLowerCase().includes('male') ||
         !voice.name.toLowerCase().includes('female'))
      );
    } else {
      // For female characters, find any female voice
      bestVoice = voices.find(voice =>
        voice.lang.startsWith('en') &&
        voice.name.toLowerCase().includes('female')
      );
    }
  }

  // Final fallback to first English voice
  if (!bestVoice) {
    bestVoice = voices.find(voice => voice.lang.startsWith('en'));
  }

  return bestVoice;
};

/**
 * Create voice utterance with avatar-specific voice
 */
export const createVoiceUtterance = (text, avatarName) => {
  const config = AVATAR_VOICE_CONFIG[avatarName] || AVATAR_VOICE_CONFIG.Hema;
  const utterance = new SpeechSynthesisUtterance(text);

  // Set the specific voice for this avatar
  const selectedVoice = getBestVoiceForAvatar(avatarName);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.lang = "en-US";
  utterance.rate = config.rate;
  utterance.pitch = config.pitch;

  return utterance;
};

/**
 * Play voice with avatar-specific configuration
 */
export const playAvatarVoice = (text, avatarName, onEnd = null) => {
  // Stop any currently playing speech
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const utterance = createVoiceUtterance(text, avatarName);

  if (onEnd) {
    utterance.onend = onEnd;
  }

  speechSynthesis.speak(utterance);
  return utterance;
};

/**
 * Play welcome message with delay for hover effect
 */
export const playWelcomeWithDelay = (avatarName, delay = 1000, onEnd = null) => {
  return setTimeout(() => {
    const welcomeMessage = AVATAR_WELCOME_MESSAGES[avatarName];
    playAvatarVoice(welcomeMessage, avatarName, onEnd);
  }, delay);
};

/**
 * Cancel any pending welcome message
 */
export const cancelWelcomeMessage = (timeoutId) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
};