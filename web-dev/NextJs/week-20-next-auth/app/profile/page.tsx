//these components are demo to show that we can't use traditional token authorization in nextJS


import axios from "axios";
import { useEffect, useState } from "react";

export default async function profile() {
  /*const [image, setImage] = useState();
  useEffect(() => {
    const response =  axios.get("http://localhost:3000/api/profile",{
        headers:{
            authorization: localStorage.getItem("token")
        }
    }).then((response)=>{
        setImage(response.data.avatarurl)
    })
  }, []);*/

  //converting into server component but in serever there is no concept of localstorage so you can't this authentication method(authentication using jwt) in serever component
   /*const response = await axios.get("http://localhost:3000/api/profile",{
    headers:{
        authorization: localStorage.getItem("token")
    }
})*/
//you can read localstorage using fatch or axios.get in js but the first request send by th browser can't read localstorage

  return <div>
    {response.data.avatarurl}
  </div>;
}
