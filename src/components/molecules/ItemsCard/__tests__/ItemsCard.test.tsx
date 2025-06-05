// src/components/molecules/ItemsCard/__tests__/ItemsCard.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ItemsCard } from '../ItemsCard';
import { ThemeProvider } from '../../../../context/ThemeContext/ThemeContext';
import { ProductDTO } from '../../../../types/ProductDTO';

// ─── M O C K   N A V I G A T I O N ───────────────────────────────────────────────
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ dispatch: jest.fn() }),
  CommonActions: { navigate: jest.fn() },
}));

// ─── M O C K   U S E T H E M E ────────────────────────────────────────────────────
jest.mock('../../../../hooks/UseTheme', () => ({
  useTheme: () => ({
    colors: { background: '#fff', text: '#000', primary: '#007AFF', border: '#ccc' },
    theme: 'light',
  }),
}));

// ─── M O C K   F A S T I M A G E ───────────────────────────────────────────────────
jest.mock('react-native-fast-image', () => {
  const FastImage = () => null;
  FastImage.priority = { low: 0, normal: 1, high: 2 };
  FastImage.resizeMode = { contain: 'contain', cover: 'cover', stretch: 'stretch', center: 'center' };
  return FastImage;
});

// ─── M O C K   S H I M M E R   &   L I N E A R G R A D I E N T ────────────────────
jest.mock('react-native-shimmer-placeholder', () => 'ShimmerPlaceholder');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// ─── M O C K   S V G   I C O N S ───────────────────────────────────────────────────
jest.mock('../../../../assets/icons/Heart.svg', () => 'HeartIcon');
jest.mock('../../../../assets/icons/DateIcon.svg', () => 'DateIcon');
jest.mock('../../../../assets/icons/LocationIcon.svg', () => 'LocationIcon');

// ─── M O C K   C H I L D   C O M P O N E N T S ────────────────────────────────────
// Note the three ".." to get from __tests__ → atoms
jest.mock('../../../atoms/ItemsCardImage', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    ItemsCardImage: ({ testID }: { testID?: string }) => (
      <View testID={testID}>
        <Text>MockImage</Text>
      </View>
    ),
  };
});

jest.mock('../../../atoms/ItemsCardInfo/ItemsCardInfo', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    ItemsCardInfo: ({ title, location }: any) => (
      <View testID="mock-info">
        <Text>{title}</Text>
        <Text>{location.name}</Text>
      </View>
    ),
  };
});

describe('ItemsCard', () => {
  const mockItem: ProductDTO = {
    _id: '123',
    title: 'Test Item',
    description: 'Test Description',
    price: 99.99,
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    location: { name: 'Test Location', longitude: 0, latitude: 0 },
    images: [{ url: 'test.jpg', _id: 'img1' }],
    user: { _id: 'user1', email: 'test@test.com' },
    score: 0,
  };

  it('renders correctly with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <ItemsCard item={mockItem} />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly in smaller variant', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <ItemsCard item={mockItem} smaller={true} />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders without crashing and shows title & location', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ItemsCard item={mockItem} />
      </ThemeProvider>
    );

    expect(getByTestId('items-card-pressable')).toBeTruthy();
    expect(getByTestId('items-card-image')).toBeTruthy();
    expect(getByText(/Test Item/)).toBeTruthy();
    expect(getByText(/Test Location/)).toBeTruthy();
  });

  it('dispatches navigation when pressed', () => {
    const mockDispatch = jest.fn();
    (require('@react-navigation/native').useNavigation as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });

    const { getByTestId } = render(
      <ThemeProvider>
        <ItemsCard item={mockItem} />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId('items-card-pressable'));

    const { CommonActions } = require('@react-navigation/native');
    expect(mockDispatch).toHaveBeenCalledWith(
      CommonActions.navigate({ name: 'Details', params: { itemId: '123' } })
    );
  });
});
