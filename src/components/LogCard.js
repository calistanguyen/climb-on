import React from 'react'

const LogCard = () => {

    return (
        <div className='log-card'>
            <img src={require("../imgs/climb.jpg")} alt=" route picture" className='log-card-pic' />
            <div className="log-card-container">
                <div className="header">Climbing Type –– level</div>
                <div className="buttons">
                    <div className="prev">previous</div>
                    <div className="next">next</div>
                </div>
            </div>
        </div>
    );

}

export default LogCard; 