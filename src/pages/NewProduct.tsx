import { Link, Form, useActionData, ActionFunctionArgs } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

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
  addProduct(data)

  //Una accion siempre debe retornar algo
  return {}
}

export const NewProduct = () => {

  const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar producto
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
