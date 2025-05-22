import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { handleError } from "../../../../lib/handleError";

export const useSearchProducts = (searchQuery: string) => {
    return useQuery({
        queryKey: ['products', 'search', searchQuery],
        queryFn: async () => {
            try {
                const response = await ProductService.searchProducts(searchQuery);
                return response;
            } catch (error) {
                throw handleError(error);
            }
        },
        select: (response) => {
            if (!response.success || !response.data) {
                return [];
            }
            return response.data;
        },
        enabled: !!searchQuery && searchQuery.length >= 2,
    });
}; 