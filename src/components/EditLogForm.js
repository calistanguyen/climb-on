import React, { useState } from 'react';
import { getUser } from '../services/auth'
import { gql, request } from 'graphql-request'

const triesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const topLeadLevels = ["5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13"]
const boulderLevels = ["v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"]

async function mutation(userId, type, level, userNotes, tries, completed, date, imgLink) { //graph ql mutation to add to my database of climbs
    const mutation = gql`
    mutation createClimb($input: CreateClimbInput!){
        createClimb(input: $input){
          climb{
            userId, 
            imgLink, 
            type, 
            level, 
            userNotes, 
            tries, 
            completed, 
            date
          }
        }
      }
  `
    var isCompleted = completed == "true" ? true : false;
    const variables = {
        input: {
            climb: {
                userId: userId,
                type: type,
                level: level,
                userNotes: userNotes,
                tries: Number(tries),
                completed: isCompleted,
                date: date,
                imgLink: imgLink
            }
        }
    }

    await request('http://localhost:5000/graphql', mutation, variables).then((data) => {
    },
        error => {
            console.log(error)
        })
}

function setToday() {
    var today = new Date()
    var dd = today.getDate()

    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    return today
}
const today = setToday();

const EditLogForm = () => { //Componnet that holds the add log form
    const [topLead, setTopLead] = useState(false) //these two states keep track of what levels need to be displayed in my options. Boulder and TopRope/Lead have 2 different grading systems
    const [boulder, setBoulder] = useState(false)
    const [type, setType] = useState('')//i use states to hold the different values of the forms needed for my database
    const [level, setLevel] = useState('')
    const [tries, setTries] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [date, setDate] = useState(today)
    const [notes, setNotes] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    function setLevelTopLead() { //these states keep track of needing boulder levels or toprope/lead levels
        setTopLead(true)
        setBoulder(false)
    }
    function setLevelBoulder() {
        setBoulder(true)
        setTopLead(false)
    }

    const handleType = event => { //each of these handler functions take care of the state of each value
        setType(event.target.value);
    }
    const handleLevel = event => {
        setLevel(event.target.value);
    }
    const handleTries = event => {
        setTries(event.target.value)
    }
    const handleCompleted = event => {
        setCompleted(event.target.value)
    }

    const handleNotes = event => {
        setNotes(event.target.value)
    }

    const handleDate = event => {
        setDate(event.target.value)
    }

    const handleImage = event => {
        var file = document.querySelector('input[type=file]')['files'][0];
        const objectURL = URL.createObjectURL(file) //storing object url to save photo
        setImgUrl(objectURL)
    }



    const handleSubmit = event => {
        event.preventDefault();
        document.getElementById('edit-form').reset() //resetting form after new submission
    }


    return (
        <div className="edit-log">
            <div className="header" >Add to Log</div>
            <form method="post" id="edit-form"
                onSubmit={event => {
                    handleSubmit(event)
                    mutation(getUser().id, type, level, notes, tries, completed, date, imgUrl).then(auth => {
                    }).catch(err => {
                        console.log(err)
                    })
                }}>
                <div className="type">
                    <div className="type-label">Type: </div>
                    <input type="radio" id="type" name="type" value="Boulder" onClick={setLevelBoulder} onChange={handleType} />
                    <label htmlFor="boulder">Boulder</label>
                    <input type="radio" id="type" name="type" value="Top Rope" onClick={setLevelTopLead} onChange={handleType} />
                    <label htmlFor="top-rope">Top Rope</label>
                    <input type="radio" id="type" name="type" value="Lead" onClick={setLevelTopLead} onChange={handleType} />
                    <label htmlFor="lead">Lead</label>
                </div>

                <div className="level-and-tries">
                    <div className="level">
                        <div className="level-label">Level:</div>
                        <select id="level" name="level" onChange={handleLevel}>
                            <option />
                            {
                                topLead &&
                                topLeadLevels.map((item) =>
                                    <option value={item}>{item}</option>)
                            }
                            {
                                boulder &&
                                boulderLevels.map((item) =>
                                    <option value={item}>{item}</option>)
                            }
                        </select>
                    </div>

                    <div className="tries">
                        <div className="tries-label">Tries:</div>
                        <select id="tries" name="tries" onChange={handleTries}>
                            <option />
                            {triesArr.map((item) =>
                                <option value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="completed-and-date">
                    <div className="completed">
                        <div className="completed-label">Completed:</div>
                        <select id="tries" name="tries" onChange={handleCompleted}>
                            <option />
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="date">
                        <div className="date-label">Date: </div>
                        <input type="date" id="date" name="date" onChange={handleDate} />
                    </div>
                </div>
                <div className="image">
                    <div className="img-label">Image: </div>
                    <input type="file" name="file" id='img' onChange={handleImage} />
                </div>

                <div className="user-notes">
                    <div className="notes-label">Notes on the Climb:</div>
                    <textarea name="user_notes" rows="10" cols="30" defaultValue="Add notes about the climb here" onChange={handleNotes} />
                </div>

                <input type="submit" value="Submit" name="submit" />
            </form>
        </div>
    );
}

export default EditLogForm