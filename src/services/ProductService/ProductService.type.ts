import { ProductDTO } from "../../types/ProductDTO"

export type GetByIdResponse={
    data:ProductDTO,
    success:boolean,
    error: {
        statusCode:number,
        message:string,
    }
}
export type GetProductsResponse={
    data?:ProductDTO[],
    pagination:PaginationDTO,
    success:boolean,
    error?:{
        statusCode:number,
        message:string,
    }
}

export type PaginationDTO={
    currentPage:number,
    hasNextPage:boolean,
    hasPrevPage:boolean,
    limit:number,
    totalItems:number,
    totalPages:number
}

export type CreateProductResponse={
    data:ProductDTO,
    success:boolean,
    error: {
        statusCode:number,
        message:string,
    }
}   