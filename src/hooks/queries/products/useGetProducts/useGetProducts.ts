import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../../../../services/ProductService';
import { GetProductsParams } from './useGetProducts.type';



export const useGetProducts = (params: GetProductsParams = {}) => {
    const { page = 1, limit = 10, searchQuery } = params;

    return useQuery({
        queryKey: ['products', { page, limit, searchQuery }],
        queryFn: async () => {
            try {
                const response = await ProductService.getProducts(page, limit);
                return response;
            } catch (error) {
                throw error;
            }
        },
        select: (response) => {
            if (!response.success || !response.data) {
                return [];
            }
            return response.data;
        }
    });
};
