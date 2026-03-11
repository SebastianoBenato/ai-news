import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const summarizeNews = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `Dame una lista de entre 5 a 20 noticias más importantes del día en Uruguay. 
                  Cada una debe tener un titulo, resumen y un link como fuente.
                  Devuelve la respuesta en formato JSON, limpio, sin usar backticks ni comillas. 
                  Solo devuelve el JSON, sin texto adicional.
                  Debe tener el siguiente formato: [
                    {
                    "titulo": "El Gobierno de Yamandú Orsi encabeza su primer Consejo de Ministros de marzo",
                    "resumen": "El presidente Yamandú Orsi reunió a su gabinete en la Torre Ejecutiva para tratar una agenda centrada en la seguridad pública y el empleo juvenil, en un contexto marcado por el alza internacional del petróleo.",
                    "fuente": "https://www.gub.uy/presidencia/comunicacion/noticias/presidente-yamandu-orsi-encabeza-consejo-ministros"
                    },
                    {
                    "titulo": "Presentan nueva Ley de Empleo Juvenil con el objetivo de crear 12.000 puestos",
                    "resumen": "El ministro de Trabajo, Juan Castillo, adelantó detalles del proyecto que busca descentralizar las herramientas de promoción del empleo, dado que actualmente el 80% de los beneficios se concentran en Montevideo y Canelones.",
                    "fuente": "https://www.gub.uy/presidencia/comunicacion/noticias/poder-ejecutivo-analiza-nueva-ley-sobre-empleo-foco-promocion-del-trabajo"
                    }
                  ]`;
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

export const getNewsInArrayWithError = async () => {
  return [
    {titulo: 'Salud Pública confirma aumento a 21 casos de dengue autóctono en Uruguay', 
      resumen: 'El Ministerio de Salud Pública actualizó las cifra…iene la alerta sanitaria en varios departamentos.', 
      fuente: 'https://www.elpais.com.uy/informacion/salud/casos-…onos-y-82-importados-segun-ultimo-reporte-del-msp'},
    {titulo: 'Docentes de Montevideo realizan paro de 24 horas en liceos por inseguridad', 
      resumen: 'La filial de ADES en la capital cumple este miérco…chos violentos registrados en entornos escolares.', 
      fuente: 'https://www.montevideo.com.uy/Noticias/Paro-en-lic…ercoles-las-razones-de-la-medida-de-ADES-uc883076'},
    {titulo: 'Álvaro Delgado presentó su programa de gobierno con énfasis en competitividad', 
      resumen: 'El precandidato por el Partido Nacional lanzó ofic…nda etapa de reformas estructurales en el Estado.', 
      fuente: 'https://www.elobservador.com.uy/nota/delgado-prese…prometio-un-segundo-piso-de-reformas--20243191910'},
    {titulo: 'Histórico: Partió el primer embarque de carne bovina con hueso hacia Israel', 
      resumen: 'Tras culminar las negociaciones técnicas y sanitar…lto valor para el sector agroindustrial uruguayo.', 
      fuente: 'https://www.gub.uy/ministerio-ganaderia-agricultur…uay-exporta-primera-vez-carne-bovina-hueso-israel'},
    {titulo: 'Justicia formaliza a cinco personas por el violento crimen en barrio Maracaná', 
      resumen: 'La Fiscalía logró la imputación de cinco individuo…ha generado gran conmoción y despliegue policial.', 
      fuente: 'https://www.subrayado.com.uy/fiscalia-imputo-cinco-personas-el-homicidio-del-barrio-maracana-n941652'}
  ];
}