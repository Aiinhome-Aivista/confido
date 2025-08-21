export const sanitizeTextForSpeech = (text) => {
    if (!text) return "";

    // Remove all emoji and special symbols
    // This regex targets most emojis & special pictographs
    return text
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .replace(/[\r\n]+/g, " ") // replace newlines with space
      .replace(/\s+/g, " ")     // collapse multiple spaces
      .trim();
  };