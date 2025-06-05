import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../../../src/test-utils/test-utils';
import { CustomButton } from '../../atoms/CustomButton/CustomButton';

// Mock child components
jest.mock('../../atoms/CustomText/CustomText', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    CustomText: ({ children, style }: any) => (
      <Text style={style}>{children}</Text>
    ),
  };
});

describe('CustomButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with title', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state correctly', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} loading={true} />
    );

    expect(getByText('Test Button...')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} disabled={true} />
    );

    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('is disabled when loading prop is true', () => {
    const { getByText } = render(
      <CustomButton title="Test Button" onPress={mockOnPress} loading={true} />
    );

    const button = getByText('Test Button...');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <CustomButton 
        title="Test Button" 
        onPress={mockOnPress} 
        style={customStyle}
      />
    );

    const button = getByTestId('custom-button');
    expect(button.props.style).toMatchObject(customStyle);
  });

  it('renders correctly with default props', () => {
    const { toJSON } = render(
      <CustomButton 
        title="Test Button"
        onPress={jest.fn()}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { toJSON } = render(
      <CustomButton 
        title="Disabled Button"
        onPress={jest.fn()}
        disabled={true}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    const { toJSON } = render(
      <CustomButton 
        title="Loading Button"
        onPress={jest.fn()}
        loading={true}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });
}); 