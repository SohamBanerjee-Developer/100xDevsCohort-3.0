import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function authLayout(
    {children}//all the pages af auth folder
){
    return(
        <>
        <Navbar/>
        {children}{/*all the page.tsx of auth will have this layout wrapped around*/}
        <Footer/>
        </>
    )
}