import { useEffect, useRef } from 'react';
import { Alert, AlertButton } from 'react-native';
import { UseSuccessAlertProps } from './useSuccessAlert.type';

export const useSuccessAlert = ({ success, message, onDismiss }: UseSuccessAlertProps) => {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!success || !isMounted.current) return;

        const buttons: AlertButton[] = [];

        if (onDismiss) {
            buttons.push({
                text: 'OK',
                onPress: onDismiss,
                style: 'default'
            });
        }

        if (buttons.length === 0) {
            buttons.push({
                text: 'OK',
                style: 'default'
            });
        }

        // Wrap in setTimeout to ensure the alert is shown after the component is fully mounted
        setTimeout(() => {
            if (isMounted.current) {
                Alert.alert('Success', message || 'Operation completed successfully', buttons);
            }
        }, 0);
    }, [success, message, onDismiss]);
}; 