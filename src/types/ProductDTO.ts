 
export type ProductDTO={
    location:LocationDTO;
	_id:string;
	title:string;
	description:string;
	price:number;
	images:ImageDTO[];
	user:{
		_id:string;
		email:string;
	}
	createdAt:string;
	updatedAt:string;
	score:number;
	
}

export type LocationDTO={		
	name:string;
	longitude:number;
	latitude:number;
 }

export type ImageDTO={
	url:string;
	_id:string;
}