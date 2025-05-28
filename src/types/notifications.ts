export interface NotificationPayload {
  productId?: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface NotificationChannel {
  id: string;
  name: string;
  importance: number;
}

export interface NotificationHandlers {
  onNotificationPress?: (notification: any) => void;
  onBackgroundEvent?: (notification: any) => void;
} 