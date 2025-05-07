import { Image, View } from "react-native";
import { ItemDetailsImageProps } from "./ItemDetailsImage.type.ts";
import { styles } from "./ItemDetailsImage.style.ts";
import { BackArrow } from "../../atoms/BackArrow/index.ts";
export function ItemDetailsImage({ image }: ItemDetailsImageProps) {
	return <View style={styles.container}>
		<Image source={{ uri: image }} style={styles.image} />
		<BackArrow />
	</View>;
}   