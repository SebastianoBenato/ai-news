import './App.css'
import { useState, useEffect } from 'react';
import { NewsCard } from './components/NewsCard'
import { getNewsInArray } from './services/aiService'
import { getImageURL } from './services/imageService'

const getNews = async () => {
  const data = await getNewsInArray();
  console.log(data);
  return data;
}

function App() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [newsListWithImages, setNewsListWithImages] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await getNews();
      setNewsList(datos);
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarImagenes = async () => {
      const newsWithImages = await Promise.all(
        newsList.map(async (item) => ({
          ...item,
          imageUrl: await getImageURL(item.fuente),
        }))
      );
      setNewsListWithImages(newsWithImages);
    };

    if (newsList.length > 0) {
      cargarImagenes();
    }
  }, [newsList]);
  
  console.log("Lista de noticias en App:", newsList);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Últimas Noticias</h1>

      {/* 2. El contenedor de la lista (Grid de Tailwind) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 3. Mapeamos el array para mostrar los componentes */}
        {newsListWithImages.map((item, key) => (
          <NewsCard
            key={key}
            title={item.titulo}
            description={item.resumen}
            linkNoticia={item.fuente}
            imageUrl={item.imageUrl}
          />
        ))}

        {/* 4. Mensaje si la lista está vacía */}
        {newsList.length === 0 && (
          <button
            onClick={
              async () => {
                const newsSummary = await getNewsInArray();
                console.log("Resumen de noticias:", newsSummary);
              }
            }
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            hubo error
          </button>
        )}

      </div>
    </div>
  )
}

export default App
