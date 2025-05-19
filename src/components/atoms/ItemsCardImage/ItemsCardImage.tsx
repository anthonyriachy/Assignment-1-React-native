import { Image, Pressable, View } from 'react-native';
import { ItemsCardImageProps } from './ItemsCardImage.type';
import HeartIcon from '../../../assets/icons/Heart.svg';
import { styles } from './ItemsCardImage.style';
export function ItemsCardImage({image, onClick}: ItemsCardImageProps) {
    
	return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={{uri:image}} style={styles.image} />
        </View>
        <Pressable onPress={onClick} style={styles.heartIconContainer}>
            <HeartIcon width={30} height={30}/>
        </Pressable>
	</View>;
}

