const hintsService = require('./chat-bot/hints');

exports.getHint = async (req, res) => {
  const { problem_statement, editorial } = req.body;
  console.log('Received Hint Request');
  console.log('Problem Statement:\n', problem_statement);
  console.log('Editorial:\n', editorial);

  const result = await hintsService.execute(problem_statement, editorial);
  res.status(201).json(result);
};