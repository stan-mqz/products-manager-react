import { formatCurrency } from "../helpers";
import { deleteProduct } from "../services/ProductService";
import { Product } from "../types/types";
import { ActionFunctionArgs, Form, useNavigate, redirect } from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {

  if (params.id !== undefined) {

    await deleteProduct(+params.id)
    return redirect('/');
 
  }

  throw new Error("Producto no encontrado");
    
    
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  //A diferencia de Link, este puede ser usado en cualquier parte del componente, no solo en la presentacion
  const navigate = useNavigate();

  const isAvailable = product.availability;

  return (
    <tr className="border-b border-gray-400 ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            //Usa el evento onClick y le pasas la URL a la que quieres desde la funcion
            onClick={() => navigate(`productos/${product.id}/editar`)}
          >
            Editar
          </button>

          {/* Utilizamos el componente de formulario de React Router para definir la accion y hacer la peticion a la BD para eliminar el producto  */}

          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`} //Le indicamos que al presionar submit envie los datos a esta URL y que ejecute la accion vinculada a ella, de esta manera lo haces desde el componente en vez del router
            onSubmit={(e) => { //Esto se ejecuta antes que el action
              if (!confirm('¿Eliminar?')) {
                e.preventDefault()
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};
