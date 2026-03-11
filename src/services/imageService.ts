const backgroundImageURL = 'https://images.unsplash.com/photo-1710162734135-8dc148f53abe?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBzaW1wbGV8ZW58MHx8MHx8fDA%3D';

export async function getImageURL(urlDestino: string) {
  // Usamos AllOrigins como puente
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlDestino)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json(); // AllOrigins devuelve un JSON con el HTML en .contents
    
    // Usamos el DOMParser nativo del navegador para leer el HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, "text/html");

    // Buscamos el meta tag og:image
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
    
    // Si no hay meta, buscamos la primera imagen del artículo
    const firstImg = doc.querySelector('article img')?.getAttribute('src') || 
                     doc.querySelector('img')?.getAttribute('src');


    const imageUrl = ogImage || firstImg || backgroundImageURL;
    console.log(`Imagen encontrada para ${urlDestino}:`, imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error con el proxy:", error);
    return backgroundImageURL;
  }
}