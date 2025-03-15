import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { addProduct, getProductByID } from "../services/ProductService";
import { Product } from "../types/types";

//Funcion para la accion
export const action = async ({request}: ActionFunctionArgs) => {
  //Forma para obtener los datos del formulario descomponiendo el objeto request y su metodo formData)()
  const data = Object.fromEntries(await request.formData())
  
  /*
  Los key : value los tomara asi
  key: name del campo en el form
  value: valor introducido en el form
  */
  
  let error = ''

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  //Una vez retornas algo en una accion, esta disponible globalmente para el componente
  if (error) {
    return error
  }

  //Funcion en el archivo de services a la cual le pasamos los datos

  //Ejecuta todo el codigo pero se detiene aca, de esa manera el return no se ejecuta hasta que esta funcion termina de ejecutarse
  await addProduct(data)

  //Una accion siempre debe retornar algo, en este caso, redirecciona al usuario a la página principal
  return redirect('/')
}

//De esta forma puedes recuperar los parametros pasados a la URL 
export const loader = async ({params} : LoaderFunctionArgs) => {
    

    if (params.id !== undefined) {
      const product = await getProductByID(+params.id)
      
      if (!product) {
        throw new Response('', {status: 404, statusText: 'No encontrado'});
        
      }

      return product

    }

}

export const EditProduct = () => {

  //Usando el hook useActionData() puedes acceder desde tu componente a lo que sea que la accion a la que esta conectado haya retornado
  const error = useActionData() as string
  
  //Este hook nos permite acceder a la informacion retornada desde el loader
  const product = useLoaderData() as Product



  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Editar producto
        </h2>

        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>

    {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form 
      className="mt-10"
      method="POST"
      >
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
            //De esta forma ponemos la informacion del producto dentro del campo
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            //De esta forma ponemos la informacion del producto dentro del campo
            defaultValue={product.price}
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};
