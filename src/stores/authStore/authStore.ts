import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { UserDTO } from '../../types/UserDTO';



type AuthState={
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
}


const SecureStorage:StateStorage = {
    getItem:async(name)=>{
     const value = await RNSecureStorage.getItem(name);
     return value ?? null;
    },
    setItem:async(name,value)=>{
        await RNSecureStorage.setItem(name,value,{
            accessible:ACCESSIBLE.WHEN_UNLOCKED,
        });
    },
    removeItem:async(name)=>{
        await RNSecureStorage.removeItem(name);
    },
};

const useAuthStore = create<AuthState>()(
    persist(
        (set)=>({
            accessToken:null,
            refreshToken:null,
            setTokens:(accessToken,refreshToken)=>set({accessToken,refreshToken}),
            clearTokens:()=>set({accessToken:null,refreshToken:null}),
            hasStoreLoaded:false,
            setHasStoreLoaded:()=>set({hasStoreLoaded:true}),
            user:null,
            setUser:(user)=>set({user}),
            clearUser:()=>set({user:null}),
            logout:()=>set({accessToken:null,refreshToken:null,user:null}),
        }),
        {
            name:'auth-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHasStoreLoaded(true);
            },
            storage:createJSONStorage(()=>SecureStorage),
        }
    )
);

export default useAuthStore;
