import {StyleSheet} from 'react-native';

export const Colors = {
  primary: 'rgba(245, 143, 85, 1)',
  secondary: 'rgba(16, 24, 40, 0.5)',
  tertiary: 'rgba(16, 24, 40, 0.37)',

  purple: '#7476D8',
  dark: '#101828',

  white: '#fff',
  background: '#FBF9F5',

  lightGrey: 'rgba(232, 234, 236, 1)',
  grey: '#D9D9D9',

  danger: '#F7867E',
};

export const StyleConstant = {
  paddingVertical: 24,
  hover: {
    opacity: 0.85,
  },
  viewScreen: {
    proMax: 428,
    pro: 375,
  },
};

export const Style = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: StyleConstant.paddingVertical,
  },

  button: {
    borderRadius: 10,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },

  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowRadius: 16,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  item: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
