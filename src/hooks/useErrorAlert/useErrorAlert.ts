import { useEffect, useRef } from 'react';
import { Alert, AlertButton } from 'react-native';
import { UseErrorAlertProps } from './useErrorAlert.type';

export const useErrorAlert = ({ error, onRetry, onDismiss }: UseErrorAlertProps) => {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (!error || !isMounted.current) return;

        const buttons: AlertButton[] = [];

        if (onDismiss) {
            buttons.push({
                text: 'Close',
                onPress: onDismiss,
                style: 'cancel'
            });
        }

        if (onRetry) {
            buttons.push({
                text: 'Retry',
                onPress: onRetry,
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
                Alert.alert('Error', error.message, buttons);
            }
        }, 0);
    }, [error, onRetry, onDismiss]);
}; 