import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";

export const loader = async () => {
 
 const products = await getProducts()
 console.log(products)



  //Al igual que las acciones siempre debe retornar algo
  return {}
}

export const Products = () => {
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
    </>
  );
};
