import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { handleError } from "../../../../lib/handleError";
export const useGetProductById = (productId: string) => {
    return useQuery({
        queryKey: ['products', productId],
        queryFn: async () => {
            try {
                const response=await ProductService.getProductById(productId);                return response
            } catch (error) {
                throw handleError(error);
            }
        },
        select:(response)=>{
            if(!response.success || !response.data){
                return null
            }
            return response.data
        }
    });
}