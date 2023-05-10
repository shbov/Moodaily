import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getMonthByDate} from '../../Functions/getMonthByDate';
import {EmotionImage} from '../Custom/EmotionImage';
import {Colors, Style, StyleConstant} from '../../Styles/Style';

type Props = {
  item: any;
};

interface State {}

export class MonthItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = this.getStyles();
    return (
      <View style={styles.view} key={this.props.item.item.month}>
        <Text style={styles.title}>
          {getMonthByDate(this.props.item.item.month)}
        </Text>

        <View style={styles.emotions}>
          {this.props.item.item.emotions.map((e: any) => (
            <View key={e.emotion} style={styles.emotion}>
              <EmotionImage
                key={e.emotion}
                name={e.emotion}
                width={this.getWidth(e.percentage)}
              />
              <Text style={styles.label}>{e.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  private getStyles() {
    return StyleSheet.create({
      view: {
        ...Style.bigItem,
        ...Style.shadow,

        backgroundColor: Colors.backgroundAccent,
        borderRadius: Style.button.borderRadius,
      },

      title: {
        ...Style.text,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 28,
        color: Colors.dark,
        marginBottom: 12,
      },
      emotions: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
      },

      emotion: {
        gap: 8,
      },

      label: {
        ...Style.text,

        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,

        color: Colors.dark,
      },
    });
  }

  private getWidth(percentage: number) {
    const minWidth = StyleConstant.emotionSize;
    const maxWidth = StyleConstant.emotionSize * 1.5;

    return Math.floor(minWidth + ((maxWidth - minWidth) * percentage) / 100);
  }
}
