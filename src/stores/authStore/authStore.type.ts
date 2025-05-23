import { UserDTO } from "../../types/UserDTO"

export type AuthState={
    accessToken:string|null,
    refreshToken:string|null,
    setTokens:(accessToken:string,refreshToken:string)=>void
    clearTokens:()=>void,
    hasStoreLoaded:boolean,
    setHasStoreLoaded:(hasStoreLoaded:boolean)=>void
    user:UserDTO|null,
    setUser:(user:UserDTO)=>void,
    clearUser:()=>void,
    logout:()=>void,
    getUserId:()=>string|null,
}