import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../Styles/Style';
import React from 'react';

type Props = {
  titleStyle: Object;
  value: string | undefined;
  placeholder: string;
  onChangeText: (text: string) => void;
  error: string | undefined;
  onSubmitEditing: () => void;
  refName: any;
};

export const ErrorStyles = StyleSheet.create({
  error: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,

    color: Colors.danger,
    marginTop: 4,
  },
});

export const CustomTextInput = (props: Props) => {
  const handleSubmitEditing = () => {
    props.onSubmitEditing();
  };

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
        returnKeyType="done"
        ref={props.refName}
      />

      {props.error && <Text style={ErrorStyles.error}>{props.error}</Text>}
    </View>
  );
};
