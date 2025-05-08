import { Pressable, ScrollView, Text, View } from 'react-native';
import { ItemDetailsInfoProps } from './ItemDetailsInfo.type';
import { createStyles } from './ItemDetailsInfo.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../atoms/CustomButton';
import Share from '../../../assets/icons/share.svg';
import { useTheme } from '../../../hooks/UseTheme';
import { useState } from 'react';

export function ItemDetailsInfo({ item }: ItemDetailsInfoProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const insets = useSafeAreaInsets();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text 
                            style={styles.description} 
                            numberOfLines={isExpanded ? undefined : 4}
                        >
                            {item.description}
                        </Text>
                        {item.description.length > 200 && (
                            <Pressable onPress={toggleExpand} >
                                <Text style={[styles.description, { color: colors.primary,textAlign:'right' }]}>
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton style={{ flex: 1 }} title="Add to Cart" onPress={() => {}} />
                <Pressable style={styles.cardBtn}>
                    <Share width={35} height={35} />
                </Pressable>
            </View>
        </View>
    );
}
