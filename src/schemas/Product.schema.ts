import { z } from "zod";

export const ProductSchema=z.object({
    title:z.string().trim().min(1,"Title is required").max(50,"Maximum allowed title is 50 characters"),
    description:z.string().trim().min(1,"Description is required").max(500,"Maximum allowed description is 50 characters"), 
    price:z.number().min(1,"Price is required"),
    images:z.array(z.string()).min(1,"At least one image is required"),
    location:z.object({
        name:z.string().trim().min(1,'Location name is required'),
        longitude:z.number(),
        latitude:z.number()
    })
})
export type ProductSchemaType=z.infer<typeof ProductSchema>