import React, { useState } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var climbingData = []; //array that stores the climbs for the week

function getWeek() { //returns the first and last day of current week
  var current = new Date;
  var first = current.getDate() - current.getDay();
  var last = first + 6;
  return { first: first, last: last }
}

function setClimbingData(obj) { //takes data from query to fill up climbing data array. 
  console.log('---obj---', obj)
  obj.allClimbs.nodes.forEach(element => {
    var date = element.date.split('-');
    if (date[2] >= getWeek().first && date[2] <= getWeek().last) {
      var climb = { type: element.type, level: element.level, img: element.imgLink }
      if (climbingData.includes(climb) === false) climbingData.push(climb)
    }
  })

}
function getClimbingData() {
  return climbingData;
}

//my query that grabs the data needed for the log card
async function query() {
  const q = gql`
      query {
        allClimbs(condition:{
          userId: ${getUser().id}, 
        }) {
          nodes {
            date, 
            type, 
            level,
            imgLink
          }
        }
      }`
  await request('http://localhost:5000/graphql', q).then((data) => {
    console.log('----data----', data);
    setClimbingData(data);
  },
    error => {
      console.log(error)
    })
  return true;

}

const LogCard = () => { //this component shows the climbs recorded for this week. 
  const [currIdx, setCurrIdx] = useState(0) //using an array, I am able to keep track of the climbs recorded for the week and traverse through it for the card
  const [data, setData] = useState([]);


  //the next and previous function traverse through the array of climbs
  function next() {
    currIdx < climbingData.length ? setCurrIdx(currIdx + 1) : setCurrIdx(0)
  }

  function previous() {
    currIdx >= 0 ? setCurrIdx(currIdx - 1) : setCurrIdx(climbingData.length - 1)
  }

  query().then(auth => {
    console.log(auth)
    setData(getClimbingData);
    console.log('--this week data ----', data);

  }).catch(err => {
    console.log(err);
  })

  return (
    <div className='log-card'>
      <img src={require("../imgs/climb.jpg")} alt=" route picture" className='log-card-pic' />
      <div className="log-card-container">
        <div className="header">  {data[currIdx] !== undefined && data[currIdx].type}  –– {data[currIdx] !== undefined && data[currIdx].level}  </div>
        <div className="buttons">
          <div className="prev" onClick={previous}>previous</div>
          <div className="next" onClick={next}>next</div>
        </div>
      </div>
    </div>
  );

}

export default LogCard; 