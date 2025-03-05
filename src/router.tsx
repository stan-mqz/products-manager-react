import {createBrowserRouter} from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Products } from './pages/Products'
//Importar la funcion pero con un alias
import { NewProduct, action as newProductAction } from './pages/NewProduct'

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
                element: <NewProduct />,
                //Se ejecuta cuando presionas submir para el formulario dentro del componente indicado
                action: newProductAction
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