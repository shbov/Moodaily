import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors, Style, StyleConstant} from '../Styles/Style';
import {Emotion, EmotionType} from '../Types/Emotion';
import {EmotionImage} from '../Components/Custom/EmotionImage';

type Props = NativeStackScreenProps<any> & {
  visible: boolean;
  onExit: (year: number) => void;
};

interface State {}

export class AllEmotions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = this.getStyles();

    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.values(Emotion).map((emotion: EmotionType) => {
            return (
              <View key={emotion.name} style={styles.emotion}>
                <EmotionImage
                  key={emotion.name}
                  name={emotion.name}
                  width={56}
                />
                <Text style={styles.label}>{emotion.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  getStyles() {
    return StyleSheet.create({
      container: {
        ...Style.container,
        paddingBottom: StyleConstant.paddingVertical,
        flex: 1,
        gap: 4,
      },

      emotion: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      },

      label: {
        ...Style.text,

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.dark,
      },
    });
  }
}
