const hintsService = require('./chat-bot/hints');
const { getProblemAndEditorialMemoized } = require('./info-retriever/problem_statement');
const chatService = require('./chat-bot/chat');
const memoizeAsync = require('./util').memoizeAsync;

// Memoized version of the getHint function
const memoizedGetHint = memoizeAsync(async (url) => {
  console.log('Received Hint Request');
  console.log('URL:', url);
  
  const { problemText, editorialText } = await getProblemAndEditorialMemoized(url);

  console.log('Problem Statement:\n', problemText);
  console.log('Editorial:\n', editorialText);

  return await hintsService.execute(problemText, editorialText);
});

exports.getHint = async (req, res) => {
  try {
    const { url } = req.body;
    const result = await memoizedGetHint(url);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.chat = async (req, res) => {
  const { url, messages } = req.body;
  const { problem_statement, editorial } = await getProblemAndEditorialMemoized(url);
  const hints = memoizedGetHint(url);

  const result = await chatService.execute(problem_statement, editorial, hints, messages);

  res.status(201).json(result);
};