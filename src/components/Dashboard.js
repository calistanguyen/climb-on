import React from 'react';
import LogCard from './LogCard';
import { StaticQuery, graphql } from "gatsby"
import { getUser } from '../services/auth';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div>Hello, {getUser().firstName}!</div>
            <LogCard />
        </div>
    );
}

export default Dashboard