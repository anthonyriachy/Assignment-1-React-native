import { useMutation } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { queryClient } from "../../../../lib/queryClient";


export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async(product: FormData) => {
            const response = await ProductService.createProduct(product);
            return response.data;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            
            // Show local notification

        },
        onError: (error) => {
            throw new Error(error.message);
        }
    });
};