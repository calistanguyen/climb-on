import React from 'react'
import temp from '../imgs/temp.jpg'

const LogCard = () => {

    return (
        <div className='log-card'>
            <img src={require("../imgs/climb.jpg")} alt=" route picture" className='log-card-pic' />
            <div class="log-card-container">
                <div class="header">Climbing Type –– level</div>
                <div className="buttons">
                    <div className="prev">previous</div>
                    <div className="next">next</div>
                </div>
            </div>
        </div>
    );

}

export default LogCard; 