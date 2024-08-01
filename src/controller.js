const hintsService = require('./chat-bot/hints');
const { getProblemAndEditorial } = require('./info-retriever/problem_statement');

exports.getHint = async (req, res) => {
  const { url } = req.body;
  console.log('Received Hint Request');
  console.log('URL:', url);
  
  const { problemText, editorialText } = await getProblemAndEditorial(url);

  console.log('Problem Statement:\n', problemText);
  console.log('Editorial:\n', editorialText);

  const result = await hintsService.execute(problemText, editorialText);
  res.status(201).json(result);
};

exports.chat = async (req, res) => {
  const { problem_statement, editorial, messages } = req.body;
  console.log('Received Chat Request');
  console.log('Problem Statement:\n', problem_statement);
  console.log('Editorial:\n', editorial);
  console.log('History:\, messages');

  const result = await chatService.execute(problem_statement, editorial, hints, messages);

  res.status(201).json(result);
};