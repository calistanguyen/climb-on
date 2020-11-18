import React from 'react';
import LogCard from './LogCard';
import StatsTable from './StatsTable';
import { getUser } from '../services/auth';
import ClimbsThisWeek from './ClimbsThisWeek';

const Dashboard = () => { //dashboard component that holds different card components –– LogCard component, ClimbsThisWeek component, and StatsTable component
    return (
        <div className="dashboard">
            <div className='greeting'> Hello, {getUser().firstName}!</div>
            <div className='row-one'>
                <LogCard />
                <ClimbsThisWeek />
            </div>
            <div className='row-two'>
                <StatsTable />
            </div>
        </div >
    );
}

export default Dashboard