module.exports = {
    SYSTEM_MESSAGE: 'You are a helpful competetive programming buddy.',

    SYSTEM_MESSAGE_CHAT: 'You are a strict competetive programming buddy who doesnt like to reveal the solution.',

    HINT_PROMPT: "I have a problem statement and solution for an algorithmic competitive programming question.\n" +
    "I want one of my colleague to solve this problem statement for which i want to help him. \n" +
    "I am thinking of giving him hints to solve this problem. I will give him hints one by one. like first hint, once he works on that hint then i will give him second hint and so on.\n" +
    "I want you to generate these hints for me.\n" +
    "I want to give 3-4 hints to my colleague such that these hints are\n" +
    "1. Conceptual hints, not too descriptive so that solution is in the hints.\n" +
    "2. Hints should be concise.\n" +
    "3. Hints can be a title and description \n" +
    "Furthermore, the response should follow the following rules:\n" +
    "1. Contain only the hints, with no other text\n" +
    "2. Use markdown formatting (Dont specify that it is markdown in the response)\n" +
    "3. Hints separated by --- \n" +
    "This is a problem statement = ${problem_statement}\n ********* \n " +
    "This is a solution to that problem statement = ${editorial}",
    
    CHAT_PROMPT: "I have a problem statement and solution for an algorithmic competitive programming question.\n" +
    "I want to chat with you about it.\n" +
    "I am thinking of giving hints to my colleague to solve this problem. I will give him hints one by one. like first hint, once he works on that hint then i will give him second hint and so on.\n" +
    "I want you to chat with me about this problem statement and solution.\n" +
    "This is a problem statement = ${problem_statement}\n ********* \n " +
    "This is a solution to that problem statement = ${editorial}\n ********* \n " +
    "These are the hints = ${hints}",
};
  