import React, { useState } from 'react'
import { getUser } from '../services/auth'
import { request, gql } from 'graphql-request'

var maxTop = 0;
var maxLead = 0;
var maxBoulder = "";

function setMaxTop(obj) { //my set functions go through the object returned by my query and finds the max completed level of that climbing type
    if (obj.allClimbs.nodes.length !== 0) {
        var max = obj.allClimbs.nodes[0].level.split('.')[1];
        var idx = 0;
        for (var i in obj.allClimbs.nodes) {
            var level = obj.allClimbs.nodes[i].level.split('.')[1];
            if (Number(level) > Number(max)) {
                max = level;
                idx = i;
            }
        }
        maxTop = obj.allClimbs.nodes[idx].level
    }
    else {
        maxTop = 0
    }
}

function setMaxLead(obj) {
    if (obj.allClimbs.nodes.length !== 0) {
        var max = obj.allClimbs.nodes[0].level.split('.')[1];
        var idx = 0;
        for (var i in obj.allClimbs.nodes) {
            var level = obj.allClimbs.nodes[i].level.split('.')[1];
            if (Number(level) > Number(max)) {
                max = level;
                idx = i;
            }
        }
        maxLead = obj.allClimbs.nodes[idx].level
    }
    else {
        maxLead = 0
    }
}

function setMaxBoulder(obj) {
    if (obj.allClimbs.nodes.length !== 0) {
        var max = obj.allClimbs.nodes[0].level.split('v')[1];
        var idx = 0;
        for (var i in obj.allClimbs.nodes) {
            var level = obj.allClimbs.nodes[i].level.split('.')[1];
            if (Number(level) > Number(max)) {
                max = level;
                idx = i;
            }
        }
        maxBoulder = obj.allClimbs.nodes[idx].level
    }
    else {
        maxBoulder = ""
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

async function query(type) {//pass in boulder, lead, and top rope as parameters so i dont have to do this 3 more times –– this query grabs climbing data types, dates, and levels.  A max is determiend if its the highest completed climb in that climbing type
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
        if (type === "Top Rope") { //depending on the type, we set the max for it
            setMaxTop(data);
        }
        if (type === "Boulder") {
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
    const [maxTop, setMaxTop] = useState("–––"); //I use state to keep track of the maxes. A line is used as default state if there are no maxes 
    const [maxLead, setMaxLead] = useState("–––");
    const [maxBoulder, setMaxBoulder] = useState("–––");

    query("Top Rope").then(auth => {//I call query 3x to find max Top Rope, Lead, and Boulder
        if (getMaxTop() != 0) {
            setMaxTop(getMaxTop())
        }
        else {
            setMaxTop("–––")
        }
    }).catch(err => {
        console.log(err);

    })

    query("Lead").then(auth => {
        if (getMaxLead() != 0) {
            setMaxLead(getMaxLead())
        }
        else {
            setMaxLead("–––")
        }
    }).catch(err => {
        console.log(err)

    })

    query("Boulder").then(auth => {
        if (getMaxBoulder() != "") {
            setMaxBoulder(getMaxBoulder())
            console.log('---user----', getUser());
        }
        else {
            setMaxBoulder("–––")
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