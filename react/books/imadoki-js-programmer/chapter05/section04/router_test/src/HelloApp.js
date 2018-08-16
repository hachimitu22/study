import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const HelloApp = () => (
  <Router>
    <div style={{margin: 20}}>
      <Route exact path='/' component={Home} />
      <Route path='/ja' component={HelloJapanese} />
      <Route path='/en' component={HelloEnglish} />
      <Route path='/cn' component={HelloChinese} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h1>Hello App</h1>
    <p>言語を選択してください</p>
    <ul>
      <li><a href='/ja'>日本語</a></li>
      <li><a href='/en'>英語</a></li>
      <li><a href='/cn'>中国語</a></li>
    </ul>
  </div>
);

const HelloJapanese = () => (
  <div>
    <h1>こんにちは</h1>
    <p><a href='/'>戻る</a></p>
  </div>
);

const HelloEnglish = () => (
  <div>
    <h1>Hello</h1>
    <p><a href='/'>Back</a></p>
  </div>
);

const HelloChinese = () => (
  <div>
    <h1>ニーハオ</h1>
    <p><a href='/'>返回</a></p>
  </div>
);

export default HelloApp;
