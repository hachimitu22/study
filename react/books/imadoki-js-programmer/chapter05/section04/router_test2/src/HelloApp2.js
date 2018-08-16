import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const HelloApp2 = () => (
  <Router>
    <div style={{margin: 20}}>
      <HelloHeader />
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/ja' component={HelloJapanese} />
        <Route path='/en' component={HelloEnglish} />
        <Route path='/cn' component={HelloChinese} />
      </div>
      <HelloFooter />
    </div>
  </Router>
);

const HelloHeader = () => (
  <div>
    <h3 style={styleHeader}>HelloApp v2</h3>
    <p>
      [<a href='/ja'>日本語</a>]
      [<a href='/en'>英語</a>]
      [<a href='/cn'>中国語</a>]
    </p>
  </div>
);

const HelloFooter = () => (
  <div style={styleHeader}>
    挨拶をいろいろな言語で表示するアプリです。
  </div>
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

const styleHeader = {
  backgroundColor: 'orange',
  color: 'white',
  padding: 8
};

export default HelloApp2;
