const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({key : process.env.GEMINI_API_KEY});

module.exports = ai;