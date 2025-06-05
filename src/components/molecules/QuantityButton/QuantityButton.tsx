import { View, TextInput } from 'react-native';
import { ChangeNumberButton } from '../../atoms/ChangeNumberButton/ChangeNumberButton';
import { QuantityButtonProps } from './QuantityButton.type';
import { createStyles } from './QuantityButton.style';
import { useTheme } from '../../../hooks/UseTheme';
import { useState, useEffect } from 'react';

export function QuantityButton({quantity, onChange}: QuantityButtonProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    const [inputValue, setInputValue] = useState(quantity.toString());

    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            onChange(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            onChange(quantity - 1);
        }
    };

    const handleInputChange = (text: string) => {
        // Allow empty input while typing
        setInputValue(text);
        
        const newValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(newValue)) {
            onChange(Math.max(1, newValue));
        }
    };

    return (
        <View style={styles.container}>
            <ChangeNumberButton Icon={'+'} onPress={() => handleChange('increment')} />
            <TextInput
                style={styles.text}
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <ChangeNumberButton Icon={'-'} onPress={() => handleChange('decrement')} />
        </View>
    );
}
