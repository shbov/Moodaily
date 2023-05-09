import React from 'react';
import {BlockWithImageAndText} from '../Custom/BlockWithImageAndText';

interface State {}

type Props = {
  label: string;
  desc: string;
};

class Empty extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BlockWithImageAndText
        title={this.props.label}
        desc={this.props.desc}
        source={require('../../../assets/images/empty-entity.png')}
      />
    );
  }
}

export default Empty;
