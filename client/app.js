


import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import axios from 'axios';
import { highlight, languages } from 'prismjs/components/prism-core';
import IframeComponent from './IframeComponent';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './style/main.scss';


const code = `
import React, { Component } from 'react';
import './style/main.scss';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0
    };
  };

  changeCount = diff => this.setState({ count: this.state.count + diff });

  render = () => (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h1>Express + HMR</h1>
      <h2>{this.state.count}</h2>
      <button onClick={() => this.changeCount(1)}>Up</button>
      <button onClick={() => this.changeCount(-1)}>Deeeyoown</button>
    </div>
  );
};
`

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      code
    };
  };


  onChange = (code) => {
    this.setState({ code });
    axios.post('http://localhost:4000/api', {
      code
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render = () => (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h1>My Editor</h1>
      <div className="my-container">
      <Editor
        value={this.state.code}
        onValueChange={this.onChange}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          flexGrow: 1
        }}
      />
      <IframeComponent src="http://localhost:4000" height="100%" width="600px"/>
      </div>
    </div>
  );
};


