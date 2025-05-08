import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import ThemeIcon from '../../../assets/icons/ThemeIcon.svg';
import { useTheme } from '../../../hooks/UseTheme';

export const ThemeToggleButton = () => {
  const { toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <ThemeIcon
        width={25}
        height={25}
        fill={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'#fff'
  },
}); 