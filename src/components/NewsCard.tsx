interface Props {
  title: string;
  description: string;
  imageUrl: string;
  linkNoticia: string;
}

export const NewsCard = ({ title, description, linkNoticia, imageUrl }: Props) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-5">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 text-base">
          {description}
        </p>
        <button onClick = {
          () => {
            window.open(linkNoticia, '_blank');
          }
        } className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Leer resumen con IA
        </button>
      </div>
    </div>
  );
};