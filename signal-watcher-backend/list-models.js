const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = "process.env.GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

async function list() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

list();
