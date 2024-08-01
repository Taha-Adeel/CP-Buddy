module.exports = {
    SYSTEM_MESSAGE: 'You are a helpful competetive programming buddy.',
    HINT_PROMPT: "I have a problem statement and solution for an algorithmic competitive programming question.\n" +
    "I want one of my colleague to solve this problem statement for which i want to help him. \n" +
    "I am thinking of giving him hints to solve this problem. I will give him hints one by one. like first hint, once he works on that hint then i will give him second hint and so on.\n" +
    "I want you to generate these hints for me.\n" +
    "I want to give 3-4 hints to my colleague such that these hints are\n" +
    "1. Conceptual hints, not too descriptive so that solution is in the hints.\n" +
    "2. Hints should be concise.\n" +
    "3. Hints can be a title and description \n" +
    "Further, the response should contain only the hints, be in markdown format, and each hint should be separated by a line break.\n" +
    "This is a problem statement = ${problem_statement}\n ********* \n " +
    "This is a solution to that problem statement = ${editorial}",
};
  