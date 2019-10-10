import React, { Component } from 'react'
import './index.less'

export default class AllView extends Component {
  componentWillMount() {
    // console.log(Script)
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://aframe.io/releases/0.8.0/aframe.min.js';
    document.head.appendChild(script);
  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{'height': '200px', 'width': '200px'}}>
      <a-scene>
      <a-sky src="https://f12.baidu.com/it/u=2020341049,3982319633&fm=72" rotation="0 -100 0"></a-sky>
    </a-scene>
      </div>
    )
  }
}
