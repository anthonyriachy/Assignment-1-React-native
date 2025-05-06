import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenWrapperProps } from './ScreenWrapper.type';
import { styles } from './ScreenWrapper.style';

function ScreenWrapper({ children, disableSafeArea=false, style }: ScreenWrapperProps) {
    if(disableSafeArea){
        return (
            <View style={style}>
                {children}
            </View>
        );
    }
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={['top']}>
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper;

