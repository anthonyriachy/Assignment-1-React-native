import {OneSignal} from 'react-native-onesignal';
import { config } from '../constants/Config';
import { Linking } from 'react-native';

class OneSignalService {
  private static instance: OneSignalService;
  private isInitialized: boolean = false;
  private readonly ONESIGNAL_APP_ID = config.ONESIGNAL_APP_ID;
  private readonly ONESIGNAL_REST_API_KEY = config.ONESIGNAL_REST_API_KEY; // Get this from OneSignal Dashboard

  private constructor() {}

  static getInstance(): OneSignalService {
    if (!OneSignalService.instance) {
      OneSignalService.instance = new OneSignalService();
    }
    return OneSignalService.instance;
  }

  initialize(appId: string) {
    if (this.isInitialized) return;

    // Initialize OneSignal
    OneSignal.initialize(appId);

    // Request notification permission
    OneSignal.Notifications.requestPermission(true);

    // Set up notification handlers
    OneSignal.Notifications.addEventListener('click', this.handleNotificationOpened);
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', this.handleNotificationReceived);

    this.isInitialized = true;
  }

  private handleNotificationOpened = async (event: any) => {
    console.log('Notification opened:', event);
    
    try {
      const data = event.notification.additionalData;
      console.log('Notification data:', data);

      if (data?.type === 'new_product' && data?.productId) {
        // Construct deep link URL for product details
        const deepLink = `e-commerce://product/${data.productId}`;
        console.log('Opening deep link:', deepLink);
        
        // Check if the URL can be opened
        const canOpen = await Linking.canOpenURL(deepLink);
        console.log('Can open URL:', canOpen);
        
        if (canOpen) {
          // Open the deep link
          await Linking.openURL(deepLink);
        } else {
          console.error('Cannot open deep link URL');
          // Fallback: Navigate using React Navigation
          // You'll need to implement this based on your navigation setup
        }
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  private handleNotificationReceived = (event: any) => {
    console.log('Notification received:', event);
    // Handle notification received event
  };

  // Method to send a notification to all users
  async sendNotificationToAll(title: string, message: string, data?: any) {
    try {
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.ONESIGNAL_REST_API_KEY}`
        },
        body: JSON.stringify({
          app_id: this.ONESIGNAL_APP_ID,
          contents: { en: message },
          headings: { en: title },
          data: data,
          included_segments: ['All']
        })
      });

      const result = await response.json();
      console.log('Notification sent:', result);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Method to get the device's OneSignal ID
  async getDeviceId(): Promise<string | null> {
    try {
      return await OneSignal.User.getExternalId() || null;
    } catch (error) {
      console.error('Error getting device ID:', error);
      return null;
    }
  }
}

export default OneSignalService; 