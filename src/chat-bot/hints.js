const openai = require('../config');
const prompts = require('./prompts');

async function execute(problem_statement, editorial) {
  const hintPrompt = `${prompts.HINT_PROMPT.replace('${problem_statement}', problem_statement).replace('${editorial}', editorial)}`;

  const completion = await openai.chat.completions.create({
    messages: [
      {"role": "system", "content": prompts.SYSTEM_MESSAGE},
      {"role": "user", "content": hintPrompt},
    ],
    model: "gpt-4o",
  });

  console.log("Response from GPT-4o:\n ", completion.choices[0].message.content);
  
  const hints_ = completion.choices[0].message.content.split('---');
  hints_.forEach((hint, index) => {
    hints_[index] = hint.trim();
  });

  const jsonHints = {
    hints: hints_
  }
  return jsonHints;
}

module.exports = {
  execute
};