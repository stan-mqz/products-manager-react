import {  array, boolean, InferOutput, number, object, string } from "valibot";

export const DraftProductsSchema = object(
    {
        name: string(),
        price: number(),
        
    }
)

export const ProductSchema = object(
    {
        id: number(),
        name: string(),
        price: number(),
        availability: boolean()
    }
)

//De esta manera le indicamos que esperamos un arreglo de objetos con las propiedades definidas en el schema
export const ProductsSchema = array(ProductSchema)
//Infer Output convierte el schema a un type
export type Product = InferOutput<typeof ProductSchema>
