import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const summarizeNews = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `Dame una lista de las 5 noticias más importantes del día en Uruguay. 
                  Cada una debe tener un titulo, resumen y un link como fuente.
                  Devuelve la respuesta en formato JSON. Solo devuelve el JSON, sin texto adicional.`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error con Gemini:", error);
    return "No se pudo generar el resumen.";
  }
};

export const getNewsInArray = async () => {
  const newsSummary = await summarizeNews();
  try {
    const newsArray = JSON.parse(newsSummary);
    return newsArray;
  } catch (error) {
    console.error("Error al parsear el resumen de noticias:", error);
    return [];
  }
}