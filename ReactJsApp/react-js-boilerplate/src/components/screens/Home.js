import React from "react"
import icon1 from '../../asset/icon1.gif'
import icon2 from '../../asset/icon2.gif'

const Home = props => {
    const {header} = props
    return <div>
        <h2>{header}</h2>
        <div className='inrow'>
            <img src={icon1} alt="loading..." className='homeIconWid'/>
            {/*<img src={icon2} alt="loading..." className='homeIconWid'/>*/}
        </div>
        {/*<HomeUIForm/>*/}
    </div>
}

export default Home
