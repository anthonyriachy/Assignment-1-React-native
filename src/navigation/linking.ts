import { LinkingOptions } from '@react-navigation/native';
import { MainNavigatorRoutes } from '../constants/MainNavigatorRoutes';
import { AppStackRoutes } from '../constants/AppStackRoutes';
import { Linking } from 'react-native';
import useAuthStore from '../stores/authStore/authStore';
import useDeepLinkStore from '../stores/deepLinkStore/deepLinkStore';

export const linking: LinkingOptions<any> = {
  prefixes: ['e-commerce://'],
  config: {
    screens: {
      [MainNavigatorRoutes.AppStack]: {
        screens: {
          [AppStackRoutes.Details]: {
            path: 'product/:itemId',
            parse: {
              itemId: (itemId: string) => {
                return itemId;
              },
            },
          },
        },
      },
    },
  },

  async getInitialURL() {
    try {
      const url = await Linking.getInitialURL();
      if (!url) {
        return null;
      }

      if (!useAuthStore.getState().hasStoreLoaded) {
        console.log('Auth store not loaded yet, storing deep link');
        useDeepLinkStore.getState().setPendingDeepLink(url);
        return null;
      }

      // Check if user is authenticated
      const { accessToken, user } = useAuthStore.getState();
      const isAuthenticated = Boolean(accessToken && user);

      if (!isAuthenticated) {
        console.log('User not authenticated, storing deep link:', url);
        useDeepLinkStore.getState().setPendingDeepLink(url);
        return null;
      }

      console.log('User authenticated, processing deep link:', url);
      return url;
    } catch (error) {
      console.error('Error getting initial URL:', error);
      return null;
    }
  },

  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => {
      try {
        if (!useAuthStore.getState().hasStoreLoaded) {
          console.log('Auth store not loaded yet, storing deep link');
          useDeepLinkStore.getState().setPendingDeepLink(url);
          return;
        }

        // Check if user is authenticated
        const { accessToken, user } = useAuthStore.getState();
        const isAuthenticated = Boolean(accessToken && user);

        if (!isAuthenticated) {
          console.log('User not authenticated, storing deep link:', url);
          useDeepLinkStore.getState().setPendingDeepLink(url);
          return;
        }

        console.log('User authenticated, processing deep link:', url);
        listener(url);
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };

    const subscription = Linking.addEventListener('url', onReceiveURL);

    Linking.getInitialURL().then(url => {
      if (url) {
        onReceiveURL({ url });
      }
    }).catch(error => {
      console.error('Error getting initial URL:', error);
    });

    return () => {
      subscription.remove();
    };
  },
};
