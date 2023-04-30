import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Style from '../Styles/Style';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type ButtonProps = {
  title: string;
  onPress: any;
};

const PrimaryButton = (props: ButtonProps) => {
  const style = StyleSheet.create({
    btn: {
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 14,
      paddingBottom: 14,
      backgroundColor: Colors.white,
      borderRadius: 100,
      shadowColor: Style.colors.dark,
      shadowRadius: 3,
      shadowOpacity: 0.1,
    },

    text: {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color: Style.colors.dark,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={style.btn}
      onPress={props.onPress}
      activeOpacity={Style.button.hover.opacity}>
      <Text style={style.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
