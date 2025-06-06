import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../../../src/test-utils/test-utils';
import { InputFieldSell } from '../../atoms/InputFieldSell/InputFieldSell';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

jest.mock('../../atoms/CustomText/CustomText', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    CustomText: ({ children, style }: any) => (
      <Text style={style}>{children}</Text>
    ),
  };
});

jest.mock('../../atoms/ErrorText/ErrorText', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    ErrorText: ({ error }: any) => (
      <Text testID="error-text">{error}</Text>
    ),
  };
});

jest.mock('../../../hooks/UseTheme', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff',
      text: '#000',
      primary: '#007AFF',
      border: '#ccc',
    },
  }),
}));

describe('InputFieldSell', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter text"
          onChangeText={mockOnChangeText}
        />
      </ThemeProvider>
    );

    expect(getByText('Test Label')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This is an error';
    const { getByTestId } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter text"
          error={errorMessage}
          onChangeText={mockOnChangeText}
        />
      </ThemeProvider>
    );

    expect(getByTestId('error-text')).toHaveTextContent(errorMessage);
  });

  it('handles text input correctly', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter text"
          onChangeText={mockOnChangeText}
        />
      </ThemeProvider>
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'test input');
    expect(mockOnChangeText).toHaveBeenCalledWith('test input');
  });

  it('renders in description mode when description prop is true', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter description"
          description={true}
          onChangeText={mockOnChangeText}
        />
      </ThemeProvider>
    );

    const input = getByPlaceholderText('Enter description');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(5);
  });

  it('renders correctly with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter text"
          onChangeText={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter text"
          onChangeText={jest.fn()}
          error="Error message"
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly in description mode', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <InputFieldSell 
          label="Test Label"
          placeholder="Enter description"
          onChangeText={jest.fn()}
          description={true}
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
}); 