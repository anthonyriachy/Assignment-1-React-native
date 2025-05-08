import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenWrapperProps } from './ScreenWrapper.type';
import { createStyles } from './ScreenWrapper.style';
import { useTheme } from '../../../hooks/UseTheme';

function ScreenWrapper({ children, disableSafeArea=false, style }: ScreenWrapperProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    if(disableSafeArea){
        return (
            <View style={style}>
                {children}
            </View>
        );
    }
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper;

