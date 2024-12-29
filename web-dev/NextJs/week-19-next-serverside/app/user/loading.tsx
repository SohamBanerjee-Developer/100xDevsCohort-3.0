// if there is awaits in the page.tsx i.e page.tsx is stuck the nextJs will fallback to this loading.tsx and it will be rendered
export default function Loading(){
    return <div>
        loading...
    </div>
}