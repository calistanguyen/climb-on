import React, { useState, useEffect } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'


var climbingItems = {}

function setClimbingItems(data) {
    climbingItems = data;
}

async function query() { //query to grab climbing data from database
    const query = gql`
    query {
        allClimbs(condition:{
          userId: ${getUser().id}, 
        }, 
        orderBy:DATE_DESC) {
          nodes {
            type,
            level,
            date,
            completed, 
            tries,
            userNotes,
            imgLink
          }
        }
      }`
    await request('http://localhost:5000/graphql', query).then((data) => {
        setClimbingItems(data)
    },
        error => {
            console.log(error)
        })
    return true;
}

const ViewLog = () => {
    const [ready, setReady] = useState(false) //state to keep track of when query is finished
    const [showCard, setShowCard] = useState(false); //state to handle when to show current climb displayed
    const [currentClimb, setCurrentClimb] = useState({}) //current climb being displayed
    useEffect(() => {
        query().then(auth => {
            console.log(auth)
            setReady(true)

        }).catch(err => {
            console.log(err);
        })
    }, []);
    function handleShowCard(climbItem) {
        setShowCard(true);
        setCurrentClimb(climbItem)
    }
    return (
        <div className='view-log'>
            <div className='header'>Climbing Log </div>
            <div className='log-split'>
                <div className='left-split'>
                    {ready && climbingItems.allClimbs.nodes.length !== 0 && climbingItems.allClimbs.nodes.map((item) =>
                        <>
                            <div className='climb-item' onClick={() => handleShowCard(item)}>
                                <div className='item-header'>
                                    <div className='type'>{item.type}  –– </div>
                                    <div className='level' id='level'>{item.level}</div>
                                </div>
                                <div className='date'>{item.date}</div>
                            </div>
                            <hr />
                        </>
                    )}
                    {ready && climbingItems.allClimbs.nodes.length === 0 &&
                        <>
                            <div> No climbs have been logged yet. </div>
                        </>
                    }
                    {!ready && <div> No climbs logged</div>}
                </div>
                <div className='right-split'>
                    {showCard &&
                        <div className='current-climb'>
                            <div className='type'> {currentClimb.type} </div>
                            <img src={currentClimb.imgLink} alt=" route picture" className='picture' />
                            <div className='stats'>
                                <div>{currentClimb.level} </div>
                                <div>Completed: {currentClimb.completed ? 'Yes' : 'No'}</div>
                                <div>Tries: {currentClimb.tries} </div>
                                <div className='notes'> {currentClimb.userNotes}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>);
}

export default ViewLog