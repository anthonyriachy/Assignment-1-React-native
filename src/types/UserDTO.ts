
export type UserDTO={
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    profileImage: {
        url:string;
    };
    isEmailVerified: boolean;
    createdAt: string;
}