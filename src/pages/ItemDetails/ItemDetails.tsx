import { View, Dimensions } from 'react-native';
import { ItemDetailsImage } from '../../components/molecules/ItemDetailsImage';
import { NotFound } from '../NotFound';
import { createStyles } from './ItemDetails.style';
import { useTheme } from '../../hooks/UseTheme';
import { useErrorAlert } from '../../hooks/useErrorAlert';
import { useGetProductById } from '../../hooks/queries/products/useGetProductById';


import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	withSpring,
} from 'react-native-reanimated';
import { useMemo, useCallback, useState } from 'react';
import { ItemDetailsInfo } from '../../components/organisms/ItemDetailsInfo';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ItemDetailsLoading } from './ItemDetailsLoading';

const SPRING_CONFIG = {
	damping: 15,
	stiffness: 150,
	mass: 0.2,
	overshootClamping: true,
	restDisplacementThreshold: 0.01,
	restSpeedThreshold: 0.01,
};

export function ItemDetails({route}:any) {
	const {itemId} = route.params;
	const scrollY = useSharedValue(0);
	const windowHeight = useSharedValue(Dimensions.get('window').height);
	const isScrolling = useSharedValue(false);
	const [refreshing, setRefreshing] = useState(false);
	const { colors } = useTheme();
	const styles = useMemo(() => createStyles(colors), [colors]);

	const {data:item,isLoading,error,refetch} = useGetProductById(itemId);

	useErrorAlert({
		error: error || null,
		onRetry: refetch,
	});

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
		onBeginDrag: () => {
			isScrolling.value = true;
		},
		onEndDrag: () => {
			isScrolling.value = false;
		},
	});

	const imageAnimatedStyle = useAnimatedStyle(() => {
		const height = interpolate(
			scrollY.value,
			[0, 150],
			[windowHeight.value * 0.45, windowHeight.value * 0.25],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			}
		);

		const translateY = interpolate(
			scrollY.value,
			[0, 150],
			[0, -30],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			}
		);

		return {
			height: withSpring(height, SPRING_CONFIG),
			transform: [
				{
					translateY: withSpring(translateY, SPRING_CONFIG),
				},
			],
		};
	}, []);

	if(isLoading){
		return <ItemDetailsLoading/>;
	}

if(!item){
		return <View style={styles.container}>
			<View style={styles.backButton}>
				<BackArrow />
			</View>
			<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
			<NotFound/>
			</View>
        </View>;
	}

	return (
		<View style={styles.container}>
			<View style={styles.backButton}>
				<BackArrow />
			</View>
			<Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
				<ItemDetailsImage images={item.images}/>
			</Animated.View>
			<ItemDetailsInfo
				item={item}
				onScroll={scrollHandler}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</View>
	);
}
