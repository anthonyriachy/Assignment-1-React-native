export type ItemDTO = {
	_id: string;
	title: string;
	price: number;
	description: string;
	images: {
		url: string;
		_id: string;
	}[];
};
