import { Image, View } from "react-native";
import { CustomText } from "../CustomText/CustomText";
import  SmallProfile  from "../../../assets/icons/SmallProfile.svg";
import  CameraIcon  from "../../../assets/icons/photo-camera-svgrepo-com.svg";
export const ChangeProfile = ({styles,profileImage,handleImagePick}:{styles:any,profileImage:string,handleImagePick:()=>void}) => {
    return (
        <View style={styles.profileContainer}>

        <View style={styles.profile}>
          <View style={styles.profileInnerContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: '100%', height: '100%', borderRadius: 40 }}
                resizeMode="contain"
              />
            ) : (
              <SmallProfile width={80} height={80} />
            )}
          </View>
          <View style={styles.profileBtn} onTouchEnd={handleImagePick}>
            <CameraIcon width={24} height={24} />
          </View>
        </View>
        <CustomText>Change Image</CustomText>
      </View>
    )
}