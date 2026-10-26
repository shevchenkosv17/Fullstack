import React, { Component } from 'react';

class ClassComponent extends Component {
  render() {
    const { text } = this.props;
    return (
      <div>
        <p>Класовий компонент: {text}</p>
      </div>
    );
  }
}

export default ClassComponent;
