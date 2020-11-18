import React, { useState } from 'react';
import { getUser } from '../services/auth'
import { gql, request } from 'graphql-request'

const triesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const topLeadLevels = ["5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13"]
const boulderLevels = ["v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"]

async function mutation(userId, type, level, userNotes, tries, completed, date) {
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
    const variables = {
        input: {
            climb: {
                userId: userId,
                type: type,
                level: level,
                userNotes: userNotes,
                tries: Number(tries),
                completed: Boolean(completed),
                date: date
            }
        }
    }

    await request('http://localhost:5000/graphql', mutation, variables).then((data) => {
        console.log('added to data base')
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
const EditLogForm = () => {
    const [topLead, setTopLead] = useState(false)
    const [boulder, setBoulder] = useState(false)
    const [type, setType] = useState('')
    const [level, setLevel] = useState('')
    const [tries, setTries] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')
    function setLevelTopLead() {
        setTopLead(true)
        setBoulder(false)
    }
    function setLevelBoulder() {
        setBoulder(true)
        setTopLead(false)
    }

    const handleType = event => {
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

    const handleSubmit = event => {
        event.preventDefault();
        console.log('---type---', type)
        console.log('---level---', level)
        console.log('---tries---', tries)
        console.log('---completed---', completed)
        console.log('---date---', date)
        console.log('---notes---', notes)
    }


    return (
        <div className="edit-log">
            <div className="header" >Add to Log</div>
            <form amethod="post"
                onSubmit={event => {
                    handleSubmit(event)
                    mutation(getUser().id, type, level, notes, tries, completed, date).then(auth => {
                        console.log('added climb')
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
                        <input type="date" id="date" name="date" defaultValue={today} onChange={handleDate} />
                    </div>
                </div>

                <div className="user-notes">
                    <div className="notes-label">Notes on the Climb:</div>
                    <textarea name="user_notes" rows="10" cols="30" defaultValue="Add notes about the climb here" onChange={handleNotes} />
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default EditLogForm