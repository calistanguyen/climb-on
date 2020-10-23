import React from 'react'
import temp from '../imgs/temp.jpg'

const LogCard = () => {

    return (
        <div className='log-card'>
            <img src={require("../imgs/temp.jpg")} alt=" route picture" styleName='log-card-pic' />
            <div class="log-card-container">
                <div>Hello world!</div>
            </div>
        </div>
    );

}

export default LogCard; 