const OpenAI = require('openai');

require('dotenv').config(); // Load .env file with OpenAI API key

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = openai;