import * as LocalAuthentication from 'expo-local-authentication';

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors, Style} from '../Styles/Style';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any> & {};

interface State {
  errorMessage: string;
  loading: boolean;
}

export class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errorMessage: '',
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({loading: false});
    await this.handleFaceId();
  }

  async handleFaceId() {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Пожалуйста, авторизуйтесь',
    });

    if (result.success) {
      console.log('Authentication successful');
      if (this.props.route.params) {
        this.props.route.params.onSuccessfulAuth();
      }
    } else {
      this.setState({
        errorMessage: 'Ошибка при авторизации по Face ID',
      });
    }
  }

  render() {
    const styles = StyleSheet.create({
      main: {
        backgroundColor: Colors.primary,
        flex: 1,
      },

      container: {
        ...Style.container,
        ...Style.centered,
        flex: 1,
      },

      error: {
        ...Style.text,
        color: Colors.white,
        marginTop: 4,
      },
    });

    if (this.state.loading) {
      return null;
    }

    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <PrimaryButton
            title="Авторизоваться"
            onPress={() => this.handleFaceId()}
          />
          {this.state.errorMessage.trim() !== '' && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
