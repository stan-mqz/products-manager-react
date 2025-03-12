import { formatCurrency } from "../helpers";
import { Product } from "../types/types";
import { useNavigate } from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {

    //A diferencia de Link, este puede ser usado en cualquier parte del componente, no solo en la presentacion
   const navigate = useNavigate() 

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
        </div>
      </td>
    </tr>
  );
};
