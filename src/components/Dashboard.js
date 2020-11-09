import React from 'react';
import LogCard from './LogCard';
import { StaticQuery, graphql } from "gatsby"
import { getUser } from '../services/auth';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className='greeting'> Hello, {getUser().firstName}!</div>
            <div className='row-one'>
                <LogCard />
            </div>
        </div >
    );
}

export default Dashboard