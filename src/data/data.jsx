// data.jsx
export let chatSession = [];

export const setChatSession = (messages) => {
  chatSession = messages;
};



export const inactiveMsgList = [
    "Do you have any further queries you'd like to ask?",
    "Are you still there? Please let me know if you need any assistance.",
    "Since we have not received a response, we are closing this session. Thank you, and have a good day ahead."
];

export const plansData = [
  {
      id: "free",
      name: "Free",
      price: "",
      features: [
        "Avatars: 1 of 4 (switch anytime within the chosen one)",
        "Languages: 1 of 3 (default English)",
        "Session time: 15 min / session",
        "Daily sessions: up to 10 / day",
        "Conversation history: last 50 chats saved",
        "Export transcripts: TXT only",
        "Support: Email (48-72h)",
        "Device limit: 1 logged-in device at a time",
      ],
      buttonText: "Selected",
      isDefault: true,
      bgColor: "bg-[#E8F5E8]"
    },
    {
      id: "premium",
      name: "Rs. 299/-",
      price: "Yearly",
      features: [
        "Avatars: 2 of 4 unlocked",
        "Languages: 2 of 3",
        "Session time: 30 min / session",
        "Daily sessions: up to 30 / day",
        "Conversation history: 200 chats saved",
        "Export transcripts: TXT & PDF",
        "Voice responses: standard",
        "Support: Priority email (24-48h)",
        "Device limit: 2 logged-in devices",
      ],
      buttonText: "Select",
      isPopular: true,
      bgColor: "bg-white"
    },
    {
      id: "pro",
      name: "Rs. 599/-",
      price: "Yearly",
      features: [
        "Avatars: All 4 unlocked",
        "Languages: All 3",
        "Session time: 60 min / session",
        "Daily sessions: Unlimited",
        "Conversation history: Unlimited",
        "Export transcripts: TXT, PDF & CSV",
        "Voice responses: enhanced (clearer TTS)",
        "Support: Priority (2-4h) with chat",
        "Device limit: 3 logged-in devices",
        "Beta access: new avatars & features first",
      ],
      buttonText: "Select",
      isPopular: false,
      bgColor: "bg-white"
    },
];
export const swipetextdata=[

"Are you shy and reserved? Talk to a friendly voice today",

"Not great at small talk? Here’s a space made for you",

"Too shy to start conversations? Your virtual friend will",

"Quiet in real life? Open up here, judgment-free",

"Others like you are already chatting — why wait?",

"Don’t let another day pass without being heard",

"Your story matters. Share it before the moment slips",

"Right now, someone is waiting to talk to you",

"Shy souls welcome let your voice be heard",

"Reserved? That’s your superpower here",

"This is your safe adda speak freely",

"No judgment. Just conversations that understand you"
]


/*  how to create sessionId 
* create a random six digit number
* concatenate with "six digit random number + userId + languageId + ASCI value of userName"
*/