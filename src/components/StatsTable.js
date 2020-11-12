import React, { useState } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var maxTop = 0;
var maxLead = 0;
var maxBoulder = "";

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

function setMaxLead(obj) {
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
        maxLead = obj.allClimbs.nodes[idx].level
    }
}

function setMaxBoulder(obj) {
    console.log("Hello")
    console.log(obj)
    if (obj.allClimbs.nodes.length !== 0) {
        var max = obj.allClimbs.nodes[0].level.split('v')[1];
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
        console.log("maxBoulder", maxBoulder)
        maxBoulder = obj.allClimbs.nodes[idx].level
    }

}


function getMaxTop() {
    return maxTop;
}

function getMaxLead() {
    return maxLead;
}

function getMaxBoulder() {
    return maxBoulder;
}

async function query(type) {//pass in boulder, lead, and top rope as parameters so i dint have to do this 3 more times . 
    const query = gql`
      query {
        allClimbs(condition:{
          userId: ${getUser().id}, 
          type: "${type}",
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
        if (type === "Top Rope") {
            setMaxTop(data);
        }
        if (type === "Boulder") {
            console.log("boulder data", data)
            setMaxBoulder(data);
        }
        if (type === "Lead") {
            setMaxLead(data);
        }
    },
        error => {
            console.log(error)
        })
    return true;
}


const StatsTable = () => {
    const [maxTop, setMaxTop] = useState("–––");
    const [maxLead, setMaxLead] = useState("–––");
    const [maxBoulder, setMaxBoulder] = useState("–––");
    query("Top Rope").then(auth => {
        if (getMaxTop() != 0) {
            setMaxTop(getMaxTop())
        }
    }).catch(err => {
        console.log(err);

    })

    query("Lead").then(auth => {
        if (getMaxLead() != 0) {
            setMaxLead(getMaxLead())
        }
    }).catch(err => {
        console.log(err)

    })

    query("Boulder").then(auth => {
        if (getMaxBoulder() != 0) {
            setMaxBoulder(getMaxBoulder())
        }
    }).catch(err => {
        console.log(err)

    })
    return (
        <div className="stats-table">
            <div><span>Boulder Max:</span> {maxBoulder}</div>
            <hr />
            <div><span>Top Rope Max:</span>  {maxTop} </div>
            <hr />
            <div><span>Lead Climb Max:</span>  {maxLead}</div>
        </div>

    );
}
export default StatsTable; 