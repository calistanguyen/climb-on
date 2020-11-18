import React, { useState } from 'react';
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var numClimbsOverall = 0;
var numClimbsWeek = 0;

function setNumClimbsWeek(obj) { //function that filters climbs done for the current week and counts them
    var current = new Date;
    var first = current.getDate() - current.getDay();
    var last = first + 6;
    var num = 0;
    for (var i in obj.allClimbs.nodes) {
        var date = obj.allClimbs.nodes[i].date.split('-');
        if (date[2] >= first && date[2] <= last) {
            num += 1;
        }
    }
    numClimbsWeek = num;
}

function setNumClimbsOverall(obj) { //counts the number of climbs done overall
    var num = 0;
    for (var prop in obj.allClimbs.nodes) {
        num += 1;
    }
    numClimbsOverall = num
}

function getNumClimbsOverall() {
    return numClimbsOverall;
}

function getNumClimbsWeek() {
    return numClimbsWeek;
}

async function query() { //query to grab climbing data from database
    const query = gql`
      query {
        allClimbs(condition:{
          userId: ${getUser().id}, 
        }) {
          nodes {
            type,
            date
          }
        }
      }`
    await request('http://localhost:5000/graphql', query).then((data) => {
        setNumClimbsOverall(data);
        setNumClimbsWeek(data);
    },
        error => {
            console.log(error)
        })
    return true;
}

const ClimbsThisWeek = () => {
    const [overall, setOverall] = useState(0);
    const [week, setWeek] = useState(0);
    query().then(auth => {
        setOverall(getNumClimbsOverall());
        setWeek(getNumClimbsWeek());
    }).catch(err => {
        console.log(err);

    })
    return (
        <div className='climbs-this-week'>
            <div className="ctw-card">
                <div className="week">
                    <div className="number"> {week}</div>
                    <div className="label">climbs this week</div>
                </div>
                <hr />
                <div className="overall">
                    <div className="number"> {overall}</div>
                    <div className="label">climbs overall</div>
                </div>
            </div>
        </div>
    );

}

export default ClimbsThisWeek; 