import { formatCurrency } from "../helpers";
import { Product } from "../types/types";

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {

    const isAvailable = product.availability

  return (
    <tr className="border-b border-gray-400 ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? 'Disponible' : 'No Disponible' }
      </td>
      <td className="p-3 text-lg text-gray-800 "></td>
    </tr>
  );
};
