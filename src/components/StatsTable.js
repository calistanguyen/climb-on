import React, { useState } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var maxTop = 0;

function setMaxTop(obj) {
    console.log(obj)
    if (obj.allClimbs.nodes.length !== 0) {
        var max = obj.allClimbs.nodes[0].level.split('.')[1];
        var idx = 0;
        for (var i in obj.allClimbs.nodes) {
            var level = obj.allClimbs.nodes[i].level.split('.')[1];
            if (Number(level) > Number(max)) {
                console.log(Number(level), Number(max))
                console.log('greater than', level, max)
                max = level;
                idx = i;
            }
        }
        console.log("---max----", maxTop)
        maxTop = obj.allClimbs.nodes[idx].level
    }
}


function getMaxTop() {
    return maxTop;
}

async function topRopeQuery() {//pass in boulder, lead, and top rope as parameters so i dint have to do this 3 more times . 
    const query = gql`
      query {
        allClimbs(condition:{
          userId: ${getUser().id}, 
          type: "Top Rope",
          completed: true
        }) {
          nodes {
            type,
            date,
            level
          }
        }
      }`
    await request('http://localhost:5000/graphql', query).then((data) => {
        setMaxTop(data);
    },
        error => {
            console.log(error)
        })
    return true;
}

// async function boulderQuery() {
//     const query = gql`
//       query {
//         allClimbs(condition:{
//           userId: ${getUser().id}, 
//           type: "Boulder"
//         }) {
//           nodes {
//             type,
//             date
//           }
//         }
//       }`
//     await request('http://localhost:5000/graphql', query).then((data) => {
//         setNumClimbsOverall(data);
//         setNumClimbsWeek(data);
//     },
//         error => {
//             console.log(error)
//         })
//     return true;
// }

// async function leadQuery() {
//     const query = gql`
//       query {
//         allClimbs(condition:{
//           userId: ${getUser().id}, 
//           type: "Lead"
//         }) {
//           nodes {
//             type,
//             date
//           }
//         }
//       }`
//     await request('http://localhost:5000/graphql', query).then((data) => {
//         setNumClimbsOverall(data);
//         setNumClimbsWeek(data);
//     },
//         error => {
//             console.log(error)
//         })
//     return true;
// }

const StatsTable = () => {
    const [maxTop, setMaxTop] = useState("–––");
    topRopeQuery().then(auth => {
        if (getMaxTop() != 0) {
            setMaxTop(getMaxTop())
        }
    }).catch(err => {
        console.log(err);

    })
    return (
        <div className="stats-table">
            <div><span>Boulder Max:</span> v5</div>
            <hr />
            <div><span>Top Rope Max:</span> {maxTop} </div>
            <hr />
            <div><span>Lead Climb Max:</span> 5.10</div>
        </div>

    );
}
export default StatsTable; 