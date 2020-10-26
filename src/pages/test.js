import React from 'react'
import { StaticQuery, graphql } from "gatsby";

//FUCK YEAAHHHH
const Test = () => {

    return (
        <StaticQuery
            query={graphql`
            {postgres {
                allUsers {
                    nodes{
                        firstName
                        lastName
                    }
                }
            }}
            `}
            render={data => (
                <div>{Object.values(data.postgres.allUsers.nodes[0])}</div>
            )}
        />
    )

}


export default Test; 