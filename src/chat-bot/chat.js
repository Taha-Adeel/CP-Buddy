const openai = require('../config');
const prompts = require('./prompts');

async function execute(problem_statement, editorial, hints, old_messages) {
  let chatPrompt = prompts.CHAT_PROMPT.replace('${problem_statement}', problem_statement).replace('${editorial}', editorial).replace('${hints}', hints);

  const messages = [
    {"role": "system", "content": prompts.SYSTEM_MESSAGE_CHAT},
    {"role": "user", "content": chatPrompt},
    ...old_messages
  ];

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-4o",
  });

  console.log("Response from GPT-4o:\n ", completion.choices[0].message.content);
  
  const response = completion.choices[0].message.content;
  return response;
}

module.exports = {
  execute
};