import { ProductDTO } from "../../../types/ProductDTO";

export interface HomeHeaderProps {
    search: string;
    setSearch: (search: string) => void;
    products: ProductDTO[];
    isLoading: boolean;
  } 