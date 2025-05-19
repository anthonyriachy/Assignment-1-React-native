import { UserDTO } from "./UserDTO";

export type ProductDTO={
    location:LocationDTO;
	_id:string;
	title:string;
	description:string;
	price:number;
	images:ImageDTO[];
	user:UserDTO;
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