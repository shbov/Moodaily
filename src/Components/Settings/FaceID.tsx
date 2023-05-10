import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {getSettingsValueById, updateSetting} from '../../Actions/Settings';
import {Setting} from '../../Types/Setting';
import * as LocalAuthentication from 'expo-local-authentication';

type Props = {};

interface State {
  active: boolean;
  loading: boolean;
  isFaceIDAvailable: boolean;
}

export const FACE_ID_KEY = 'face_id';

export class FaceID extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
      loading: true,
      isFaceIDAvailable: false,
    };
  }

  async componentDidMount() {
    const value = await getSettingsValueById(FACE_ID_KEY);

    if (value) {
      this.setState({
        active: value.value === '1',
      });
    }

    this.setState({
      loading: false,
      isFaceIDAvailable: await LocalAuthentication.isEnrolledAsync(),
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const styles = this.getStyles();
    return (
      <View style={styles.item}>
        <Text>Авторизация по Face ID</Text>
        <Switch
          value={this.state.active}
          disabled={!this.state.isFaceIDAvailable}
          onChange={async () => this.onChange()}
        />
      </View>
    );
  }

  getStyles() {
    return StyleSheet.create({
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    });
  }

  async onChange() {
    const active = !this.state.active;
    const setting: Setting = {
      name: FACE_ID_KEY,
      value: active ? '1' : '0',
    };

    await updateSetting(setting);
    this.setState({
      active: active,
    });
  }
}
