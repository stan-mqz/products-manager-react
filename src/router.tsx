import {createBrowserRouter} from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Products, loader as productsLoader} from './pages/Products'
//Importar la funcion pero con un alias
import { NewProduct, action as newProductAction } from './pages/NewProduct'
import { EditProduct } from './pages/EditProduct'

export const router = createBrowserRouter([
    //Grupo de paginas que comparten el layout principal
    {
        path: '/',
        element: <Layout/>, 
        children: [
            {
                index: true,
                element: <Products/>,
                //Cuando se carga este componente manda a llamar la funcion de loader
                loader: productsLoader
            },

            {
                //Le indicas a que ruta corresponde ese elemento
                path: 'productos/nuevo',
                element: <NewProduct />,
                //Se ejecuta cuando presionas submir para el formulario dentro del componente indicado
                action: newProductAction
            },

            //Ruta para editar los productos
            {
                path: 'productos/:id/editar', //ROA Pattern - Resource-oriented design
                element: <EditProduct />
            }
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