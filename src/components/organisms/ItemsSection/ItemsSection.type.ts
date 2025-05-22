import { ProductDTO } from "../../../types/ProductDTO";

export interface ItemsSectionProps {
	title: string;
	horizontal?: boolean;
	onClick?: () => void;
	data?: ProductDTO[];
	onLoadMore?: () => void;
	isLoading?: boolean;
	hasMore?: boolean;
}
export interface VerticalListProps {
	title: string, 
	onClick?: () => void, 
	data?: ProductDTO[],
	onLoadMore?: () => void,
	isLoading?: boolean,
	hasMore?: boolean
}