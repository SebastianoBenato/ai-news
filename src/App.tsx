import './App.css'
import { useState, useEffect } from 'react';
import { NewsCard } from './components/NewsCard'
import { getNewsInArray, getNewsInArrayWithError } from './services/aiService'
import { getImageURL } from './services/imageService'
import loadingGif from './assets/loading.gif';

let errorCatcher = false; // Variable para simular error en la obtención de noticias

const getNews = async () => {
  if (!errorCatcher) {
    return await getNewsInArray();
  }
  return await getNewsInArrayWithError();
}

function App() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [newsListWithImages, setNewsListWithImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const datos: any[] = await getNews();
        setNewsList(datos);

        if (datos.length > 0) {
          const newsWithImages = await Promise.all(
            datos.map(async (item: any) => ({
              ...item,
              imageUrl: await getImageURL(item.fuente),
            }))
          );
          setNewsListWithImages(newsWithImages);
        }
      } catch (err) {
        console.error('Error fetching news', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Para depuración, se pueden eliminar más adelante
  console.log("Lista de noticias en App:", newsList);
  console.log("Lista con imágenes:", newsListWithImages);
  console.log("Estado de carga:", isLoading);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Últimas Noticias</h1>

      <div
        id="news-container"
        className="min-h-[40vh] flex justify-center items-center"
      >
        {isLoading && (
          <img
            src={loadingGif}
            alt="Cargando..."
            className="w-20 h-20 object-cover"
          />
        )}

        {!isLoading && newsListWithImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {newsListWithImages.map((item, key) => (
              <NewsCard
                key={key}
                title={item.titulo}
                description={item.resumen}
                linkNoticia={item.fuente}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}

        {!isLoading && newsListWithImages.length === 0 && (
          <button
            onClick={() => errorCatcher = true} // Simula un error al hacer clic
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Error al cargar las noticias
          </button>
        )}
      </div>
    </div>
  )
}

export default App
