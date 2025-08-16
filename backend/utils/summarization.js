const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OpenAI } = require("openai");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const dotenv =  require('dotenv');
dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;
// const GENAI_API_KEY = process.env.GENAI_API_KEY;
const GENAI_MODEL = process.env.GENAI_MODEL;
const Huggingface_API = process.env.HUGGINGFACE_API;
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);
const openapikey= process.env.OPENAI_API_KEY



// const openai = new OpenAI({ apiKey: openapikey });

// async function transcribeAudio(audioPath) {
//     try {
//         const response = await openai.audio.transcriptions.create({
//             file: fs.createReadStream(audioPath),
//             model: "whisper-1",
//         });

//         console.log("Transcription:", response.text);
//         return response.text;
//     } catch (error) {
//         console.error("Error during transcription:", error);
//     }
// }

// transcribeAudio("./uploads/dummy2.wav");


// const API_KEY =openapikey;
// Transcribe Lecture audio
// const transcribeLecture = async (audioPath) => {
//   try {
//     if (!fs.existsSync(audioPath)) {
//       throw new Error("Audio file not found");
//     }

//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(audioPath));
//     formData.append("model", "whisper-1");

//     const response = await axios.post(
//       "https://api.openai.com/v1/audio/transcriptions",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           ...formData.getHeaders(),
//         },
//       }
//     );

//     fs.unlinkSync(audioPath);
//     console.log(response.data.text);
//     return { transcription: response.data.text };
//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//     return { error: "Transcription failed" };
//   }
// };

// (async () => {
//   const result = await transcribeLecture("./uploads/dummy2.wav");
//   console.log(result);
// })();


// Summarize Lecture Content
const summarizeLecture = async (content) => {
  try {
    const response = await axios.post(
      Huggingface_API,
      { inputs: content, parameters: { min_length: 20, max_length: 300 } },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    return response.data[0]?.summary_text || "Summarization error.";
  } catch (error) {
    console.error("Summarization Error:", error);
    return "Error in summarization.";
  }
};


// Generate Questions
const generateQuestions = async (summary) => {
  try {
    const model = genAI.getGenerativeModel({ model: GENAI_MODEL });

    const prompt = `Read the following text: ${summary} and generate 5-10 long type word question-answer pairs. Use the format:
    
    1. Question: [Insert question]
       Answer: [Insert answer]`;

    const response = await model.generateContent(prompt);

    const generatedText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response text found";
    return generatedText;
  } catch (error) {
    console.error("Question Generation Error:", error);
    return "Error generating questions.";
  }
};

module.exports = { summarizeLecture, generateQuestions   };
