import { useEffect } from 'react';
import { Alert, AlertButton } from 'react-native';
import { UseErrorAlertProps } from './useErrorAlert.type';


export const useErrorAlert = ({ error, onRetry, onDismiss }: UseErrorAlertProps) => {
    useEffect(() => {
        if (!error) return;

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

        Alert.alert('Error', error.message, buttons);
    }, [error, onRetry, onDismiss]);
}; 