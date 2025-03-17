import {
  safeParse,
  number,
  parse,
  string,
  transform,
  pipe,
  url,
} from "valibot";
import {
  DraftProductsSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types/types";
import axios from "axios";
import { toBoolean } from "../helpers";

//Type que indica de que tipo son los datos que vamos a recibir
type ProductData = {
  [k: string]: FormDataEntryValue;
};

//Funcion que procesa los datos
export const addProduct = async (data: ProductData) => {
  try {
    //Cambiar el tipo de las propiedades del objeto data

    //Verificamos que los datos pasados al formulario tengan el tipo definido en el schema, pasamos el schema y los datos que queremos validar
    const result = safeParse(DraftProductsSchema, {
      //Estos datos deben llamarse igual que el atributo name de sus formularios
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      //Si el resultado es correcto enviamos los datos a esta URL
      const URL = `${import.meta.env.VITE_API_URL}/products`;
      //Con axios utilizamos el meotodo POST, que pide una URL y los datos
      await axios.post(URL, {
        //Los valores que tendremos disponibles para enviar seran los que hemos definido en nuestro type "DraftProductsSchema"
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const URL = `${import.meta.env.VITE_API_URL}/products`;
    const { data } = await axios(URL);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = async (id: Product["id"]) => {
  try {
    const URL = `${import.meta.env.VITE_API_URL}/products/${id}`;
    const { data } = await axios(URL);
    const result = safeParse(ProductSchema, data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

// Exportamos una función asíncrona llamada `updateProduct` que recibe dos parámetros:
// `data` de tipo `ProductData` y `id` de tipo `Product["id"]`.
export const updateProduct = async (data: ProductData, id: Product["id"]) => {
  try {
    // Se define un esquema de validación `NumberSchema` utilizando `pipe`, que realiza tres pasos:
    // 1. Convierte el valor a string (`string()`)
    // 2. Luego lo transforma en un número (`transform(Number)`)
    // 3. Finalmente, valida que efectivamente sea un número (`number()`)
    const NumberSchema = pipe(string(), transform(Number), number());

    // Se valida el objeto `result` utilizando `safeParse` con el esquema `ProductSchema`.
    // `safeParse` permite validar el objeto y devuelve un resultado sin lanzar errores.
    const result = safeParse(ProductSchema, {
      id, // Se mantiene el ID del producto
      name: data.name, // Se asigna el nombre desde `data`
      price: parse(NumberSchema, data.price), // Se convierte `data.price` en un número con `NumberSchema`
      availability: toBoolean(data.availability.toString()), // Se mantiene la disponibilidad desde `data`
    });

    // Se imprime el resultado en consola para depuración

    if (result.success) {
      const URL = `${import.meta.env.VITE_API_URL}/products/${id}`;
      await axios.put(URL, result.output);
    }
  } catch (error) {
    // En caso de error, se captura y se muestra en consola
    console.log(error);
  }
};

export const deleteProduct = async (id: Product["id"]) => {
    try {
        const URL = `${import.meta.env.VITE_API_URL}/products/${id}`
        await axios.delete(URL)
    } catch (error) {
        console.log(error)
    }
};
