import { useState } from 'react'
import './App.css'
import { NewsCard } from './components/NewsCard'

function App() {
  const [count, setCount] = useState(0)

return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <NewsCard 
        title="IA revoluciona noticias en Uruguay"
        description="Un nuevo desarrollador está creando una app increíble usando React y Gemini API."
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/World_Trade_Center%2C_New_York_City_-_aerial_view_%28March_2001%29_%28modified_version_with_desaturated_towers%29.jpg/330px-World_Trade_Center%2C_New_York_City_-_aerial_view_%28March_2001%29_%28modified_version_with_desaturated_towers%29.jpg"
      />
    </div>
  )
}

export default App
