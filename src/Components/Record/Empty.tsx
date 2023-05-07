import React from 'react';
import {BlockWithImageAndText} from '../Custom/BlockWithImageAndText';

class Empty extends React.Component {
  render() {
    return (
      <BlockWithImageAndText
        title={'Здесь будут ваши записи'}
        desc={'Создавайте и храните заметки о своём настроении'}
        source={require('../../../assets/images/empty-entity.png')}
      />
    );
  }
}

export default Empty;
