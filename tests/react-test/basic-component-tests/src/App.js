import './App.css';
import './style.css';
import SelectBox from "./component/selectBox";
import InputTag from "./component/inputTag";
import TreeExample1 from "./component/treeExample1";
import TreeExample2 from "./component/treeExample2";

function App() {
    const data = [
        {value: 'one', label: 'one', color: 'red'},
        {value: 'two', label: 'two', color: 'green'},
        {value: 'three', label: 'three', color: 'blue'},
        {value: 'four', label: 'four', color: 'silver'},
        {value: 'five', label: 'five', color: 'black'},
    ]
    const handleChange = (selected) => {
        let isSingle = selected.length === undefined
        console.log(isSingle ? selected : selected.map(x => x.value))
    }
    const handleTagsCallBack=values=>{
        console.log('tags', values)
    }
    return <div>
        <SelectBox multi={true} data={data} change={handleChange}/>
        <InputTag defaultTags={['devendra']} getValues={handleTagsCallBack}/>
        <TreeExample1/>
        <TreeExample2/>
    </div>
}

export default App;
