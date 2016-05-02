## JavaScript ES2015 스터디 전에...

### JavaScript is eating the world
- [Javascript is eating the world](https://arc.applause.com/2015/11/06/javascript-is-eating-the-world/)
- [Javascript 2016](http://d2.naver.com/helloworld/3618177)
- [FE Trends 2016](https://sculove.github.io/slides/2016_FETrend/)
- [Always bet on JS](https://brendaneich.com/files/2011/09/CapitolJS.021.png)

## 기본 환경 세팅
### 1. 프로젝트 생성

##### 준비
- node, npm 전역 설치
- mkdir es2015-boilerplate
- npm init

##### IDE(통합개발환경) 오픈

##### 트랜스파일러 설치
- babel 설치
```
npm install --save-dev babel-core babel-loader babel-preset-es2015
```

##### babelrc 파일 또는 package.json에 추가
```
"babel": {
  "presets": ["es2015"]
}
```

### 2. 테스트환경 구성
##### 일단 유닛 테스팅 가능하도록 설정
```
npm install --save-dev mocha chai
```

##### package.json 에 테스트 실행 스크립트 추가
```
"test": "mocha --compilers js:babel-register \"test/**/*@(.js)\"",
"test:watch": "npm run test -- --watch"
```

##### 간단한 테스트 작성
- test/array_spec.js
```
import {expect} from 'chai';

describe('Array', () => {
    it(‘forEach method should iterate array\'s element', () => {
        const array = [1, 2, 3];
        let result = 0;
        array.forEach((element, index) => {
            result += element;
        });
        expect(result).to.equal(6);
    });
});
```

##### npm run test 실행, 잘되는 것 확인

##### npm run test:watch 를 실행한 후 새로운 테스트 작성
```
it('map method should return new array', () => {
    const array = [1, 2, 3, 4];
    const newArray = array.map((element) => {
        return element * 2;
    });
    expect(newArray.length).to.equal(4);
    expect(newArray[3]).to.equal(8);
});
```

### 3. 브라우저에서 구동되도록 설정
##### dist/index.html 작성
```
<!DOCTYPE html>
<html>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

##### src/index.js 작성
```
console.log(‘Hello World’);
```

##### 모듈 로더 설정
- webpack 설치
```
npm install --save-dev webpack webpack-dev-server
```

- webpack.config.js 설정
```
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
};
```

##### entry 아래에 모듈관련 설정 추가
```
module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
    }]
},
resolve: {
    extensions: ['', '.js']
},
```

##### entry 에 webpack dev server 관련 설정 추가
```
entry : [
  ...
  'webpack-dev-server/client?http://localhost:8080'
],
```

##### npm script 추가
```
entry : [
  ...
  "webpack-dev-server": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js"
],
```

##### http://localhost:8080 에 가서 콘솔 확인

##### 다음처럼 작성해보고, 브라우저에서 잘 동작하는지 확인
- common/util.js
```
export function getDescriptionTag() {
    return '<div>Hello Saturday Morning</div>';
}
```

- src/index.js
```
import {getDescriptionTag} from './common/util';

const description = getDescriptionTag();
console.log(description);

document.querySelector('#app').innerHTML = description;
```

##### 끝

### 여기서부터는 react 활용시 설정

##### react hot loader 는 react component 에서만 가능

##### react 설치
```
npm install --save react react-dom
```

##### react-hot-loader 설치
```
npm install --save-dev react-hot-loader
```

##### webpack.config.js 설정
```
var webpack = require('webpack');

entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
],

module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
    }]
},

devServer: {
    contentBase: './dist',
    hot: true
},

plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```
