'use strict';
//in es6 support for implicit return as arrow function doesnt need {} or return for single statements
//this is statless component, Functional Components (Arrow Function from ES6)
const Cat = props => <div> this is my cat of name <b>{props.name} - {props.color}</b></div>;
// React Higher-Order Component: function takes a compoent and returns new component used to "component logic reuse". eg redux connect is HOC or pure function
//dont mutate original component in HOC rather enhance it using composition
// eg. const EnhancedComponent = enhance(WrappedComponent);
// //basic react classes would go here
//this is stateful component, class bases used state

function EnhanceComponent(ComponentToEnhance) {
    ComponentToEnhance.prototype.componentWillReceiveProps = function(nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
    };
    //this is an example of decorative design pattern and composite design pattern
    return class extends React.Component {
        render() {
            const extraProp = {msg:'This is an injected prop!',age:40};
            return (
                <div>
                    <ComponentToEnhance {...this.props} extraProp={extraProp} />
                </div>
            );
        }
    }
}

class ReactDiv1Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false, name: 'names goes here'};
        this.displayName=this.displayName.bind(this); //binding is needed so as this is undefined error doesnt come
    }

    displayName() {
        this.setState({name: this.props.name});
    }
    //with every setupdate the entire virtualdom vdom component rerenders
    // this.setState({ value: this.state.value + 1 }); //wrong way to update states as its async and can be called multiple times and stacks error
    // this.setState(prevState => ({ value: prevState.value + 1 })); //this is the right way
    // this.setState(({ value }) => ({ value: value + 1 })); //alternatively //this is destructuring syntax
    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }
        let disp=(this.props.cat=='true'?'block':'none');
        return (
            <div>
                <h1  style={{display:disp}}>First Container</h1>
                <h2 className="bg-danger text-white">{this.state.name}</h2>
                <div style={{display:disp}}><Cat name='tommy' color='brown'></Cat></div>
                <button className="btn bg-primary text-white"onClick={() => this.displayName()}>Click {this.state.name.split(' ')[0]}</button>
            </div>
        );
    }
}

class ReactDiv2Component extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        let icomp=<ReactDiv1Component name='Kumar Gaurav' cat="false"/>;
        let icomp1=EnhanceComponent(ReactDiv1Component);
        return (
            <div>
                <h1>Second Container</h1>
                <h2>old age is {this.props.age}</h2>
                {icomp}
                <icomp1 name='testing by dp' age='34'/>
        </div>
        );
    }
}

class ReactDiv3Component extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (<div><h1>Third Container</h1></div>)
    }
}


// ReactDOM.render(e(ReactDiv1Component), document.querySelector('#reactDiv1'));
ReactDOM.render(<ReactDiv1Component name="Devendra Prasad" cat="true"/>, document.getElementById('reactDiv1'));
let icomp1=<ReactDiv2Component age='20'/>;
ReactDOM.render(icomp1, document.getElementById('reactDiv2'));
ReactDOM.render(<ReactDiv3Component/>, document.getElementById('reactDiv3'));
