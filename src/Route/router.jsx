import { createBrowserRouter } from "react-router-dom";
import Hero from "../Components/Hero";
import Projectpage from "../Components/Projectpage";
import Postpage from "../Components/Postpage";
import Writepost from "../Components/Writepost";
import Dashboard from "../Components/Dashboard";

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
                path : '/postpage/:postId',
                element : <Postpage />
            },
            {
                path : '/writepost',
                element : <Writepost />
            },
            {
                path : '/dashboard',
                element :<Dashboard/>
            }
            
            

            ]}])