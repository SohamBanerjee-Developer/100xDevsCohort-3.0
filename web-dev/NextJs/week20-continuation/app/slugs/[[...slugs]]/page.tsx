"use client"
export default async function slug({params}:{
    params: Promise<{
        slugs: string[]
    }>
}){
    const {slugs} = await params
   return(
        <div>
            multiple subroutes with whatever value after /slugs/ will render posts page as well as render  anything on /slugs<br/>
            {JSON.stringify(slugs)}{/*the subroute array if therere is sub routing*/}
        </div>
    )
}