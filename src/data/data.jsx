export const chatSession = [
    {
        "role": "ai",
        "message": "Welcome! Please share your preferred language to continue: English, বাংলা (Bangla), or हिंदी (Hindi).",
        "time": "09:48:49"
    },


]


export const inactiveMsgList = [
    "Do you have any further queries you'd like to ask?",
    "Are you still there? Please let me know if you need any assistance.",
    "Since we have not received a response, we are closing this session. Thank you, and have a good day ahead."
];


/*  how to create sessionId 
* create a random six digit number
* concatenate with "six digit random number + userId + languageId + ASCI value of userName"
*/