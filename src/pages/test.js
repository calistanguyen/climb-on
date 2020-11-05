import React from 'react'
import { StaticQuery, graphql } from "gatsby";

//FUCK YEAAHHHH



const Test = ({ data }) => {

    return (
        // <StaticQuery
        //     query={graphql`
        //     {postgres {
        //         allUsers {
        //             nodes{
        //                 firstName
        //                 lastName
        //             }
        //         }
        //     }}
        //     `}
        //     render={data => (
        //         <div>{Object.values(data.postgres.allUsers.nodes[0])}</div>
        //     )}
        // />
        // <div>{Object.values(data.postgres.allUsers.nodes[0].lastName)}</div>
        <div>hello</div>
    )

}

// export const query = graphql`
// {postgres {
//     allUsers {
//         nodes{
//             firstName
//             lastName
//         }
//     }
// }}`


export default Test; 