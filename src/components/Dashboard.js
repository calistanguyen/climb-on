import React from 'react';
import LogCard from './LogCard';
import StatsTable from './StatsTable';
import { StaticQuery, graphql } from "gatsby"
import { getUser } from '../services/auth';
import ClimbsThisWeek from './ClimbsThisWeek';

const Dashboard = () => {
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