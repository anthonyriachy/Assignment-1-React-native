import { View } from "react-native";
import { useTheme } from "../../../hooks/UseTheme";
import { CarouselDotsProps } from "./CarouselDots.type";
import { createStyles } from "./CarouselDots.style";

export const CarouselDots  : React.FC<CarouselDotsProps> = ({ currentIndex, total }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
  
    return (
      <View style={styles.paginationContainer}>
        {[...Array(total)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? colors.primary : colors.secondary,
              },
            ]}
          />
        ))}
      </View>
    );
  };