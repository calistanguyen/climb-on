import React, { useState, useEffect } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var climbingData = [];

function getWeek() {
  var current = new Date;
  var first = current.getDate() - current.getDay();
  var last = first + 6;
  return { first: first, last: last }
}

function setClimbingData(obj) {
  console.log('---obj---', obj)
  obj.allClimbs.nodes.forEach(element => {
    var date = element.date.split('-');
    if (date[2] >= getWeek().first && date[2] <= getWeek().last) {
      var climb = { type: element.type, level: element.level, img: element.imgLink }
      console.log('---climb----', climb)
      if (climbingData.includes(climb) === false) climbingData.push(climb)
    }
  })
  console.log('--data entry --', climbingData);

}
function getClimbingData() {
  return climbingData;
}

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

const LogCard = () => {
  const [currIdx, setCurrIdx] = useState(0)
  const [data, setData] = useState([]);

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