import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import { ProductDetails } from "../components/ProductDetails";
import { Product } from "../types/types";

export const loader = async () => {
  const products = await getProducts();

  //Al igual que las acciones siempre debe retornar algo, en este caso retornamos los productos desde la funcion getProducts
  return products;
};

export const Products = () => {
  //Con este hook, podemos acceder a lo que nuestro loader haya retornado
  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>

        {/* Por detras es un enlace */}
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
              key={product.id}
              product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
