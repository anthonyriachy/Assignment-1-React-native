import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { GetProductsParams } from "./useGetProducts.type";

export const useGetProducts = ({ page, limit = 10 }: GetProductsParams = {}) => {
    return useInfiniteQuery({
        queryKey: ["products", page, limit] as const,
        queryFn: ({ pageParam = 1 }) => ProductService.getProducts(pageParam, limit),
        getNextPageParam: (lastPage) => {
            if (!lastPage.success || !lastPage.pagination.hasNextPage) {
                return undefined;
            }
            return lastPage.pagination.currentPage + 1;
        },
        initialPageParam: 1,
    });
};