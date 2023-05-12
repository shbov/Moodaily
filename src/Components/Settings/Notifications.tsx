import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {getSettingsValueById, updateSetting} from '../../Actions/Settings';
import {Setting} from '../../Types/Setting';

type Props = {};

interface State {
  active: boolean;
  loading: boolean;
}

export const NOTIFY_KEY = 'notifications';

export class Notify extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: false,
      loading: true,
    };
  }

  async componentDidMount() {
    const value = await getSettingsValueById(NOTIFY_KEY);

    if (value) {
      this.setState({
        active: value.value === '1',
      });
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    const styles = this.getStyles();
    return (
      <View style={styles.item}>
        <Text>Ежедневные уведомления</Text>
        <Switch
          value={this.state.active}
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
      name: NOTIFY_KEY,
      value: active ? '1' : '0',
    };

    await updateSetting(setting);
    this.setState({
      active: active,
    });
  }
}
