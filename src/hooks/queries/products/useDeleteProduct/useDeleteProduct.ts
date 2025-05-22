import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleError } from "../../../../lib/handleError";
import { ProductService } from "../../../../services/ProductService";
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => ProductService.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            throw handleError(error)    ;
        },
    });
}; 