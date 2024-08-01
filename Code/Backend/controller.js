const hintsService = require('./chat-bot/hints');

exports.getHint = (req, res) => {
  const inputData = req.body;
  const result = hintsService.execute(inputData);
  res.json(result);
};