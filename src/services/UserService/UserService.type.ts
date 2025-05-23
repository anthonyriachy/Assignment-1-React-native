import { UserDTO } from '../../types/UserDTO';

export type VerifyOTPType = {
    email:string;
    otp:string;
}
export type resendOTPType = {
    email:string;
}


export type LoginResponse={
    success:boolean;
    data:{
        accessToken:string;
        refreshToken:string;
        message?:string;
    }
}
export type SignUpResponse={
   data?:{
    message:string;
   }
   success:boolean;
   error?: {
        statusCode:number;
        message:string;
    }
}

export type VerifyOTPResponse={
    success:boolean;
    data?:{
        message:string;
        isEmailVerified:boolean;
    }
    error?: {
        statusCode:number;
        message:string;
    }
}

export type UserResponse={
    success:boolean;
    data?:{
        user:UserDTO;
    }
    
    error?: {
        statusCode:number;
        message:string;
    }
}

export type RefreshTokenResponse={
    success:boolean;
    data:{
        accessToken:string;
        refreshToken:string;
    }
    error?: {
        statusCode:number;
        message:string;
    }
}

export type EditProfileResponse={
    success:boolean;
    data?:{
        message:string;
        user:UserDTO;
    }
    error?: {
        statusCode:number;
        message:string;
    }
}

export type ForgotPasswordResponse={
    success:boolean;
    data?:{
        message:string;
    }
    error?: {
        statusCode:number;
        message:string;
    }
}