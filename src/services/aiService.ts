import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const summarizeNews = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `Dame una lista de las 5 noticias más importantes del día en Uruguay. 
                  Cada una debe tener un titulo, resumen y un link como fuente.
                  Devuelve la respuesta en formato JSON, limpio, sin usar backticks ni comillas. 
                  Solo devuelve el JSON, sin texto adicional.`;
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
  //const newsSummary = await summarizeNews();
  return [
{
"titulo": "El Gobierno de Yamandú Orsi encabeza su primer Consejo de Ministros de marzo",
"resumen": "El presidente Yamandú Orsi reunió a su gabinete en la Torre Ejecutiva para tratar una agenda centrada en la seguridad pública y el empleo juvenil, en un contexto marcado por el alza internacional del petróleo.",
"fuente": "https://www.gub.uy/presidencia/comunicacion/noticias/presidente-yamandu-orsi-encabeza-consejo-ministros"
},
{
"titulo": "Presentan nueva Ley de Empleo Juvenil con el objetivo de crear 12.000 puestos",
"resumen": "El ministro de Trabajo, Juan Castillo, adelantó detalles del proyecto que busca descentralizar las herramientas de promoción del empleo, dado que actualmente el 80% de los beneficios se concentran en Montevideo y Canelones.",
"fuente": "https://www.gub.uy/presidencia/comunicacion/noticias/poder-ejecutivo-analiza-nueva-ley-sobre-empleo-foco-promocion-del-trabajo"
},
{
"titulo": "Ministerio del Interior alista el Plan Nacional de Seguridad Pública con 100 medidas",
"resumen": "El ministro Negro anunció que el nuevo plan desplegará acciones concretas contra el narcotráfico, los homicidios y el ciberdelito, incluyendo una reformulación del Programa de Alta Dedicación Operativa (PADO).",
"fuente": "https://www.gub.uy/presidencia/comunicacion/noticias/seguridad-plan-nacional-desplegara-100-medidas-concretas-adelanto-negro"
},
{
"titulo": "Jornada nacional de concientización sobre salud cardiovascular en la mujer",
"resumen": "Bajo el lema del 'Efecto Paulina Luisi', autoridades de salud destacaron que las enfermedades cardiovasculares son la principal causa de muerte en mujeres uruguayas y que el 80% son prevenibles.",
"fuente": "https://www.imcanelones.gub.uy/noticias/atlantida-fue-sede-una-nueva-jornada-nacional-sobre-salud-cardiovascular-mujer"
},
{
"titulo": "Condenan a 30 años de prisión a reclusos por el incendio en el ex-Comcar",
"resumen": "La Justicia dictó la pena máxima para cuatro internos responsables de haber prendido fuego a otros ocho presos durante un incidente ocurrido en el año 2023 en el principal centro penitenciario del país.",
"fuente": "https://www.elpais.com.uy/informacion/judiciales/condenaron-a-30-anos-a-cuatro-reclusos-por-haber-prendido-fuego-a-otros-ocho-presos-en-el-excomcar-en-2023"
}
]
  try {
    const newsArray = JSON.parse(newsSummary);
   return newsArray;
  } catch (error) {
    console.error("Error al parsear el resumen de noticias:", error);
    return [];
  }
}