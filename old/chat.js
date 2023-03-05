const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const mainPrompt = `I want to have a conversation with you, where you are a waiter in a french restaurant and you speak french. You should ask me questions as a waiter and you should answer my questions. If I ask or answer anything incorrectly you should ask me for clarification. always provide a translation of your response in english.
AI: Bonjour, qu’est-ce que je peux vous servir? 
Humain: Je voudrais une soupe à l'oignon et un verre de vin rouge. 
AI:  Très bien, vous préférez quel type de vin rouge?
Humain: Je ne suis pas sûr
AI: `;

const mainPrompt2 = `I want to have a conversation with you, where you are a waiter in a french restaurant and you speak french. You should ask me questions as a waiter and you should answer my questions in french.  If any of my responses are incorrect then please tell me before replying and if I ask or answer anything incorrectly you should ask me for clarification.
AI: Bonjour, qu’est-ce que je peux vous servir? 
Humain: Je une soupe à l'oignon et un verre de vin rouge. 
AI: `;

const questionPromot = `I am having a conversation in French, please give me 5 potential answers to the question I am being asked.
AI: Bonjour, qu’est-ce que je peux vous servir? 
Humain: Je voudrais une soupe à l'oignon et un verre de vin rouge. 
AI:  Très bien, vous préférez quel type de vin rouge?
Humain: Je ne suis pas sûr
AI: `;

const main = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: mainPrompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Humain:", "AI:"]
  });

  console.log(response.data);
};

main().catch(console.error);
