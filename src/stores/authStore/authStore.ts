import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { AuthState } from './authStore.type';
 


const SecureStorage:StateStorage = {
    getItem:async(name)=>{
        try {
            const value = await RNSecureStorage.getItem(name);
            return value ?? null;
        } catch (error: any) {
            if (!error.message?.includes('does not exist')) {
                console.error('Error reading from secure storage:', error);
            }
            return null;
        }
    },
    setItem:async(name,value)=>{
        try {
            await RNSecureStorage.setItem(name,value,{
                accessible:ACCESSIBLE.WHEN_UNLOCKED,
            });
        } catch (error) {
            console.error('Error writing to secure storage:', error);
        }
    },
    removeItem:async(name)=>{
        try {
            await RNSecureStorage.removeItem(name);
        } catch (error) {
            console.error('Error removing from secure storage:', error);
        }
    },
};

const useAuthStore = create<AuthState>()(
    persist(
        (set, get)=>({
            accessToken:null,
            refreshToken:null,
            setTokens:(accessToken,refreshToken)=>set({accessToken,refreshToken}),
            clearTokens:()=>set({accessToken:null,refreshToken:null}),
            hasStoreLoaded:false,
            setHasStoreLoaded:(hasStoreLoaded)=>set({hasStoreLoaded}),
            user:null,
            setUser:(user)=>set({user}),
            clearUser:()=>set({user:null}),
            logout:()=>set({accessToken:null,refreshToken:null,user:null}),
            getUserId:()=>get().user?.id ?? null,
        }),
        {
            name:'auth-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasStoreLoaded(true);
                } else {
                    useAuthStore.getState().setHasStoreLoaded(true);
                }
            },
            storage:createJSONStorage(()=>SecureStorage),
        }
    )
);

export default useAuthStore;
