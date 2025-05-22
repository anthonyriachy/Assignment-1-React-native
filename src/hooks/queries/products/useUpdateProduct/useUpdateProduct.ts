import { useMutation } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { queryClient } from "../../../../lib/queryClient";
import { handleError } from "../../../../lib/handleError";

export const useUpdateProduct = (productId: string) => {
    return useMutation({
        mutationFn: async(product: FormData) => {
            const response = await ProductService.updateProduct(productId, product);
            return response.data;
        },
        onSuccess: (resposne) => {
            console.log(resposne);
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['products', productId] });
        },
        onError: (error) => {
            throw handleError(error)    ;
        }
    });
}; 