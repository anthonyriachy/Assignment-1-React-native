import { create } from 'zustand';
import { DeepLinkState } from './deepLinkStore.type';


const useDeepLinkStore = create<DeepLinkState>((set) => ({
  pendingDeepLink: null,
  setPendingDeepLink: (url) => set({ pendingDeepLink: url }),
  clearPendingDeepLink: () => set({ pendingDeepLink: null }),
}));

export default useDeepLinkStore; 