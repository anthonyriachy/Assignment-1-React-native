import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationIcon from '../../../assets/icons/Notifications.svg';
import { styles } from './CustomHeader.style';

export const CustomHeader = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top+20 }]}>
      <View style={styles.leftContainer}>
        <Image source={require('../../../assets/images/Profile.png')} style={styles.ImageContainer} />
        <View>
          <Text style={{fontWeight:'light'}}>Hello,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <NotificationIcon width={50} height={50} />
      </View>
    </View>
  );
};
