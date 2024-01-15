import { createBrowserRouter } from "react-router-dom";
import Hero from "../Components/Hero";
import Projectpage from "../Components/Projectpage";
import Postpage from "../Components/Postpage";

export const router =createBrowserRouter([
    {
        
        errorElement : <h2>ERRRRRORRRR</h2>,
        children : [
            {
                path : '/',
                element : <Hero />
            },
            {
                path : '/projects',
                element : <Projectpage />
            },
            {
                path : '/postpage',
                element : <Postpage />
            }
            

            ]}])