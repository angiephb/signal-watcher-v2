const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = "AIzaSyCgwoqZK_1bwzEILp_aS8n1iWdHjUsjFnI";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (error) {
        console.error("Failed:", error);
    }
}

test();
