import axios from "axios";


export default async function Blogs({params}:{
  params: Promise<{//generics needed will learn later
      blogsID: string
  }>
}) {
    const blogID = (await params).blogsID;//params is a promise, so we need (awit params).whatever is the name inside[] in the folder name
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${blogID}`);
    const data = response.data;

  return (
    <div>
        one route with whatever value after /blogs/ will render blog page but will not rend anything on /blogs <br/>
        blogID- {blogID}<br/>
        blog title- {data.title}<br/>
        blog body- {data.body}
    </div>
  );
}