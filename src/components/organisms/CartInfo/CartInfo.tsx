import { View } from "react-native";
import { CartInfoProps } from "./CartInfo.type";
import { createStyles } from "./CartInfo.style";
import { useTheme } from "../../../hooks/UseTheme";
import { CustomText } from "../../atoms/CustomText/CustomText";
import { CartInfoRow } from "../../molecules/CartInfoRow/CartInfoRow";

export const CartInfo = ({numberOfItems,subTotal,deliveryCharges,total}:CartInfoProps) => {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Order Summary</CustomText>
            <View style={styles.infoContainer}>
                <CartInfoRow title="Number of Items" value={numberOfItems.toString()} />
                <CartInfoRow title="Sub Total" value={subTotal.toString()} />
                <CartInfoRow title="Delivery Charges" value={deliveryCharges.toString()} />
            </View>
            <View style={styles.divider} />
            <View style={styles.totalContainer}>
                <CustomText style={styles.totalTitle}>Total</CustomText>
                <CustomText style={styles.totalValue}>{total.toString()}</CustomText>
            </View>
        </View>
    )
}