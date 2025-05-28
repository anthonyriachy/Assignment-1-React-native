import { LinkingOptions } from '@react-navigation/native';
import { MainNavigatorRoutes } from '../constants/MainNavigatorRoutes';
import { AppStackRoutes } from '../constants/AppStackRoutes';
import { Linking } from 'react-native';

// Helper function to parse URL
const parseUrl = (url: string) => {
  try {
    // Remove the scheme and get the path
    const path = url.replace('e-commerce://', '');
    console.log('[Deep Linking] Parsed path:', path);
    return path;
  } catch (error) {
    console.error('[Deep Linking] Error parsing URL:', error);
    return null;
  }
};

export const linking: LinkingOptions<any> = {
  prefixes: ['e-commerce://'],
  config: {
    screens: {
      [MainNavigatorRoutes.AppStack]: {
        screens: {
          [AppStackRoutes.BottomTabs]: {
            screens: {
              Home: 'home',
              Search: 'search',
              Profile: 'profile',
            },
          },
          [AppStackRoutes.Details]: {
            path: 'product/:itemId',
            parse: {
              itemId: (itemId: string) => {
                console.log('[Deep Linking] Parsing itemId:', itemId);
                return itemId;
              },
            },
          },
          [AppStackRoutes.Products]: 'products',
          [AppStackRoutes.SellModal]: 'sell',
          [AppStackRoutes.Cart]: 'cart',
          [AppStackRoutes.Checkout]: 'checkout',
          [AppStackRoutes.OrderComplete]: 'order-complete',
          [AppStackRoutes.EditProfile]: 'edit-profile',
        },
      },
      [MainNavigatorRoutes.AuthStack]: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
    },
  },
  // Handle dynamic deep linking with authentication
  async getInitialURL() {
    try {
      // Get the deep link used to open the app
      const url = await Linking.getInitialURL();
      console.log('[Deep Linking] Initial URL:', url);
      
      if (!url) {
        console.log('[Deep Linking] No initial URL found - app was not opened via deep link');
        return null;
      }

      const path = parseUrl(url);
      console.log('[Deep Linking] Parsed path:', path);
      
      return url;
    } catch (error) {
      console.error('[Deep Linking] Error getting initial URL:', error);
      return null;
    }
  },
  // Handle deep links while the app is already open
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('[Deep Linking] Received URL:', url);
      try {
        const path = parseUrl(url);
        console.log('[Deep Linking] Parsed path:', path);
        
        // Call the listener with the URL
        listener(url);
      } catch (error) {
        console.error('[Deep Linking] Error handling deep link:', error);
      }
    };
    
    const subscription = Linking.addEventListener('url', onReceiveURL);
    
    // Also handle initial URL
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('[Deep Linking] Initial URL received:', url);
        onReceiveURL({ url });
      }
    }).catch(error => {
      console.error('[Deep Linking] Error getting initial URL:', error);
    });
    
    return () => {
      subscription.remove();
    };
  },
};
