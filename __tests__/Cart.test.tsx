import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { CartScreen } from '../src/pages/Cart/Cart';
import { useNavigation } from '@react-navigation/native';
import useCartStore from '../src/stores/CartStore/CartStore';

// Mock the navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock the cart store
jest.mock('../src/stores/CartStore/CartStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the theme hook
jest.mock('../src/hooks/UseTheme', () => ({
  useTheme: () => ({
    colors: {
      primary: '#000',
      background: '#fff',
      text: '#000',
    },
  }),
}));

describe('CartScreen', () => {
  const mockNavigate = jest.fn();
  const mockItems = [
    {
      id: '1',
      name: 'Test Item',
      price: 10,
      quantity: 2,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup navigation mock
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    // Setup cart store mock
    ((useCartStore as unknown) as jest.Mock).mockReturnValue({
      items: mockItems,
      getTotal: () => 20,
      getItemCount: () => 2,
    });
  });

  it('renders correctly with cart items', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('View Cart Details')).toBeTruthy();
  });

  it('calculates and displays correct totals', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('View Cart Details')).toBeTruthy();
    
    // Open the bottom sheet
    fireEvent.press(getByText('View Cart Details'));
    
    // Check if the total is displayed correctly (20 + 10 delivery charges)
    expect(getByText('30')).toBeTruthy();
  });

  it('navigates to checkout when proceed button is pressed', () => {
    const { getByText } = render(<CartScreen />);
    
    // Open the bottom sheet
    fireEvent.press(getByText('View Cart Details'));
    
    // Press the checkout button
    fireEvent.press(getByText('Proceed to Checkout'));
    
    expect(mockNavigate).toHaveBeenCalledWith('Checkout');
  });
}); 