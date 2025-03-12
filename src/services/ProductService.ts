import { safeParse } from "valibot";
import { DraftProductsSchema, ProductsSchema } from "../types/types";
import axios from "axios";

//Type que indica de que tipo son los datos que vamos a recibir
type ProductData = {
    [k: string]: FormDataEntryValue;
}

//Funcion que procesa los datos
export const addProduct = async (data : ProductData) => {
    try {
        //Cambiar el tipo de las propiedades del objeto data

        //Verificamos que los datos pasados al formulario tengan el tipo definido en el schema, pasamos el schema y los datos que queremos validar
        const result = safeParse(DraftProductsSchema, {
            //Estos datos deben llamarse igual que el atributo name de sus formularios
            name: data.name,
            price: +data.price
        })
        
        if (result.success) {
            //Si el resultado es correcto enviamos los datos a esta URL
            const URL = `${import.meta.env.VITE_API_URL}/products`
            //Con axios utilizamos el meotodo POST, que pide una URL y los datos
              await axios.post(URL, {

                //Los valores que tendremos disponibles para enviar seran los que hemos definido en nuestro type "DraftProductsSchema"
                name: result.output.name,
                price: result.output.price
            })

          
        } else {
            throw new Error("Datos no validos");
            
        }

    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
        const URL = `${import.meta.env.VITE_API_URL}/products`
        const { data } = await axios(URL)
        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error");
        }
    } catch (error) {
        console.log(error)
    }
}