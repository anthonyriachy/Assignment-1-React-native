export interface ImagePickerProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    error?: string;
}
