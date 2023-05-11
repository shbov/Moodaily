import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, Style} from '../../Styles/Style';
import React from 'react';

type Props = {
  titleStyle: Object;
  value: string | undefined;
  placeholder: string;
  onChangeText: (text: string) => void;
  error: string | undefined;
  type: string;
  onFinish?: () => void;
};

export const ErrorStyles = StyleSheet.create({
  error: {
    ...Style.text,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,

    color: Colors.danger,
    marginTop: 4,
  },
});

export const CustomTextInput = (props: Props) => {
  const handleSubmitEditing = () => {
    if (props.onFinish) {
      props.onFinish();
      return;
    }

    Keyboard.dismiss();
  };

  const autoFocus = props.type === 'title';
  return (
    <View>
      <TextInput
        selectionColor={Colors.primary}
        placeholderTextColor={Colors.grey}
        style={props.titleStyle}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value ?? ''}
        multiline={true}
        blurOnSubmit={true}
        onSubmitEditing={handleSubmitEditing}
        autoFocus={autoFocus}
        {...(props.onFinish && {returnKeyType: 'done'})}
      />

      {props.error && <Text style={ErrorStyles.error}>{props.error}</Text>}
    </View>
  );
};
