import React, { Component } from 'react';
import { colors } from '../utils/variables';

const btn = {};
const btnPrimary = {
  backgroundColor: colors.btn_primary_color,
};
class Button extends Component {
  render() {
    return <button style={{ ...btn, ...btnPrimary }}>{this.props.text}</button>;
  }
}

export default Button;
