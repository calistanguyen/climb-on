import React, { useState } from 'react';

const tries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const topLeadLevels = ["5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13"]
const boulderLevels = ["v0", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9"]

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
    const [topLead, setTopLead] = useState(false);
    const [boulder, setBoulder] = useState(false);

    function setLevelTopLead() {
        setTopLead(true)
        setBoulder(false)
    }
    function setLevelBoulder() {
        setBoulder(true)
        setTopLead(false)
    }
    return (
        <div className="edit-log">
            <div className="header" >Add to Log</div>
            <form>
                <div className="type">
                    <div className="type-label">Type: </div>
                    <input type="radio" id="boulder" name="type" value="Boulder" onClick={setLevelBoulder} />
                    <label htmlFor="boulder">Boulder</label>
                    <input type="radio" id="top-rope" name="type" value="Top Rope" onClick={setLevelTopLead} />
                    <label htmlFor="top-rope">Top Rope</label>
                    <input type="radio" id="lead" name="type" value="Lead" onClick={setLevelTopLead} />
                    <label htmlFor="lead">Lead</label>
                </div>

                <div className="level-and-tries">
                    <div className="level">

                        <div className="level-label">Level:</div>
                        <select id="level" name="level">
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
                        <select id="tries" name="tries">
                            {tries.map((item) =>
                                <option value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="completed-and-date">
                    <div className="completed">
                        <div className="completed-label">Completed:</div>
                        <select id="tries" name="tries">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="date">
                        <div className="date-label">Date: </div>
                        <input type="date" id="date" name="date" defaultValue={today} />
                    </div>
                </div>

                <div className="user-notes">
                    <div className="notes-label">Notes on the Climb:</div>
                    <textarea name="user_notes" rows="10" cols="30" defaultValue="Add notes about the climb here" />
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default EditLogForm