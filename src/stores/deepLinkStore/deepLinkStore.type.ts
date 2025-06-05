export interface DeepLinkState {
    pendingDeepLink: string | null;
    setPendingDeepLink: (url: string | null) => void;
    clearPendingDeepLink: () => void;
  }
  