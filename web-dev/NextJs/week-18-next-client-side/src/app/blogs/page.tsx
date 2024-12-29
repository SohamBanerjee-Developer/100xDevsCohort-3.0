import axios from 'axios'
async function getBlog(){
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    return response.data
}

export default async function blog(){
    const blogs = await getBlog()
    return(
        <div>
            <div className='bg-red-700 p-4 m-4'>
            <p>best platform to learn redux and recoil</p>
            <p>google crwaler can reach as the html will be returned with the actual contents while hitting this route</p>
            <p>no water falling all the blogs are returned in the first index file</p>
            </div>
            {blogs.map((blog: Iblog)=><Blogs title={blog.title} completed={blog.completed}/>)}
        </div>
    )
}
interface Iblog{
    title: String
    completed: Boolean
}

function Blogs({title, completed}: Iblog){
    return(
    <>
    <div>{title}</div>
    <div>{completed? "done" : "not done"}</div>
    </>
    )
}
