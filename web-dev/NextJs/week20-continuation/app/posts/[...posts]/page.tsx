export default async function Posts({params}:{
  params: Promise<{
      posts: string[]
  }>
}) {
    const postsIDs = (await params).posts;//params is a promise, so we need (awit params).whatever is the name inside[] in the folder name
  return (
    <div>
        multiple subroutes with whatever value after /posts/ will render posts page but will not rend anything on /posts <br/>
        {JSON.stringify(postsIDs)}{/*postsIDs is an array of the routes and subroutes and react doen't render array*/}
    </div>
  );
}