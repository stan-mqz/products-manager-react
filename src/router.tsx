import {createBrowserRouter} from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Products } from './pages/Products'
import { NewProduct } from './pages/NewProduct'

export const router = createBrowserRouter([
    //Grupo de paginas que comparten el layout principal
    {
        path: '/',
        element: <Layout/>, 
        children: [
            {
                index: true,
                element: <Products/>
            },

            {
                //Le indicas a que ruta corresponde ese elemento
                path: 'productos/nuevo',
                element: <NewProduct />
            },
        ]
    }

    /*
        Puedes crear otro path o grupo de paginas asi

        {
        path: '/ecommerce',
        element: <LayoutEcommerce/>, 
        children: [
            {
                index: true,
                element: <Products/>
            },
        ]
    }
    */ 
])