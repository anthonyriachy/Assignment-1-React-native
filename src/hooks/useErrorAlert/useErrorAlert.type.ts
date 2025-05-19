export type UseErrorAlertProps = {
    error: Error | null;
    onRetry?: () => void;
    onDismiss?: () => void;
}
