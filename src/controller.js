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