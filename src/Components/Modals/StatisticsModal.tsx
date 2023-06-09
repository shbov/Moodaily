import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Colors, Style} from '../../Styles/Style';

type YearItem = {
  label: string;
  key: number;
};

type Props = {
  visible: boolean;
  onExit: (year?: number) => void;
  years: YearItem[];
};

interface State {
  year: number;
}

export class StatisticsModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      year: StatisticsModal.getMaxYear(props.years),
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        onRequestClose={() => this.save()}
        transparent={true}>
        <View style={styles.modal}>
          <View style={styles.pickerContainer}>
            <Text style={styles.choose}>Выберите год</Text>
            <Picker
              selectedValue={this.state.year}
              onValueChange={value =>
                this.setState({
                  year: value,
                })
              }>
              {this.props.years.map(item => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.label}
                    key={item.key}
                  />
                );
              })}
            </Picker>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => this.save()} style={styles.btn}>
                <Text style={styles.ready}>Готово</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  public static getMaxYear(years: any[]) {
    return Math.max(...years.map(item => Number(item.label)));
  }

  private getStyles() {
    return StyleSheet.create({
      modal: {
        ...Style.centered,

        backgroundColor: 'rgba(16, 24, 40, 0.5)',
        flex: 1,
      },

      pickerContainer: {
        backgroundColor: Colors.white,
        borderRadius: Style.button.borderRadius,
        padding: Style.container.paddingHorizontal,
        width:
          Dimensions.get('window').width -
          2 * Style.container.paddingHorizontal,
      },

      choose: {
        ...Style.text,

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.dark,
      },

      ready: {
        ...Style.text,

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,

        color: Colors.primary,
        alignSelf: 'flex-end',
      },

      btn: {
        paddingHorizontal: Style.container.paddingHorizontal / 2,
        marginHorizontal: -Style.container.paddingHorizontal / 2,
        paddingVertical: 8,
        marginVertical: -8,
      },
    });
  }

  private save() {
    const isYearFound = this.props.years
      .map(item => Number(item.label))
      .includes(Number(this.state.year));

    if (isYearFound) {
      this.props.onExit(this.state.year);
    } else {
      this.props.onExit();
    }
  }
}
