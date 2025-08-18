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