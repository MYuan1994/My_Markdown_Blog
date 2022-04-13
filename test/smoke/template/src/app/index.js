'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import './server.less';
import logo from '../imgs/bg.jpg';
import add from 'zmy-view'

class App extends React.Component{

    constructor(){
        super(...arguments);
        this.state={
            'Text':null
        }
    }

    dialog() {
        import('./text.js').then((text)=>{
            this.setState({
                Text:text.default
            })
        })
        // z_dialog("大风起兮云飞扬");
    }
    render() {
        const {Text}=this.state;
        const result=add("333339999999","111")
        return <div className="app">
                    <h1 className="title">ZMY</h1>
                    <img src={logo}></img>
            <span>{Text ? <Text /> : null}</span>
            {result}
            <input value={result}></input>
                    <button onClick={this.dialog.bind(this)}>弹窗</button>
                    <button onClick={notice}>通知</button>
                    <button onClick={getData}>获取</button>
                </div>
    }
}


function notice() {
    z_notice();
}
function getData() {
    let res = z_getData();
    info = res;
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)