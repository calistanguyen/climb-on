import React, { useState } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'


var climbingItems = {}

function setClimbingItems(data) {
    climbingItems = data;
    // console.log('--climbing items---', climbingItems.allClimbs.nodes)
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
            date
          }
        }
      }`
    await request('http://localhost:5000/graphql', query).then((data) => {
        setClimbingItems(data)
        console.log(data)
    },
        error => {
            console.log(error)
        })
    return true;
}

const ViewLog = () => {
    const [ready, setReady] = useState(false)
    const [showCard, setShowCard] = useState(false);
    query().then(auth => {
        console.log(auth)
        console.log('--climbItems--', climbingItems.allClimbs.nodes)
        setReady(true)
        console.log('--ready--', ready)

    }).catch(err => {
        console.log(err);
    })
    function handleShowCard() {
        setShowCard(true);
    }
    return (
        <div className='view-log'>
            <div className='header'>Climbing Log </div>
            <div className='log-split'>
                <div className='left-split'>
                    {ready && climbingItems.allClimbs.nodes.map((item) =>
                        <>
                            <div className='climb-item' onClick={handleShowCard}>
                                <div className='item-header'>
                                    <div className='type'>{item.type}  –– </div>
                                    <div className='level'>{item.level}</div>
                                </div>
                                <div className='date'>{item.date}</div>
                            </div>
                            <hr />
                        </>
                    )}
                    {!ready && <div> No climbs logged</div>}
                </div>
                <div className='right-split'>
                    {showCard && <div>Card is shown</div>}
                </div>
            </div>
        </div>);
}

export default ViewLog