import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    setPosts(data)
    console.log(posts);
    
  }
  useEffect(()=>{
    getPosts()
  })

  return (
    <>
    <div>
   
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      
</div>
    </>
  )
}

export default App
