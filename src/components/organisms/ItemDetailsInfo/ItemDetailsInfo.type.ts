import { ProductDTO } from "../../../types/ProductDTO";

export type ItemDetailsInfoProps = {
	item: ProductDTO;
	onScroll?: (event: any) => void;
	refreshing?: boolean;
	onRefresh?: () => Promise<void>;
};