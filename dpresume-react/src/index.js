import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import BaseResumeApp from './components/BaseResumeApp'
import BaseResumeAppTabbed from './components/BaseResumeAppTabbed'
import BaseResumeAppNaive from './components/BaseResumeAppNaive'

export default class Tabs extends React.Component {
    constructor(props){
        super(props)
        this.tabsElem=React.createRef()
        this.tabs=['tab1','tab2','tab3']
        this.tabClass="btn btn-primary font-weight-bold text-white"
        this.tabClassActive="btn btn-dark font-weight-bold text-dark bg-white"
        this.state={
            curTab:this.tabs[2]
        }
    }

    componentDidMount() {
        this.handleTabClick(this.state.curTab)
    }

    handleTabClick=(id)=>{
        for(let i=0;i<this.tabs.length;i++){
            document.getElementById(this.tabs[i]).style.display = 'none'
        }
        document.getElementById(id).style.display='block'
        this.setState({curTab:id})
    }

    render() {
        return (
            <div>
                <div id="bottomPane" ref={this.tabsElem} className="bg-dark fixed-bottom" style={{padding:'2px',width:'100%'}}>
                    <span className={(this.state.curTab===this.tabs[0]?this.tabClassActive:this.tabClass)} onClick={()=>this.handleTabClick(this.tabs[0])}>Tabbed</span>
                    <span className={(this.state.curTab===this.tabs[1]?this.tabClassActive:this.tabClass)} onClick={()=>this.handleTabClick(this.tabs[1])}>Split</span>
                    <span className={(this.state.curTab===this.tabs[2]?this.tabClassActive:this.tabClass)} onClick={()=>this.handleTabClick(this.tabs[2])}>Naive</span>
                </div>

                <div className="container">
                    <div id="tabs"  className="">
                        <div id="tab1"  style={{display:'none'}}><BaseResumeAppTabbed isActive={(this.state.curTab===this.tabs[0]?true:false)}/></div>
                        <div id="tab2" style={{display:'none'}}><BaseResumeApp isActive={(this.state.curTab===this.tabs[1]?true:false)}/></div>
                        <div id="tab3" style={{display:'none'}}><BaseResumeAppNaive isActive={(this.state.curTab===this.tabs[2]?true:false)}/></div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Tabs/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

