import { request, gql } from 'graphql-request'


export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export var resolved = false

export function isResolved(x) {
  resolved = x;
}

export async function checkUser(username, password) {
  setUser({})
  const query = gql`
    query {
      allUsers(condition:{
        username: "${username}", 
        password: "${password}" 
      }) {
        nodes {
          firstName
          lastName
          userId
        }
      }
    }`
  await request('http://localhost:5000/graphql', query).then((data) => {
    if (data.allUsers.nodes[0] === undefined) {
      console.log('user doesnt exist')
      setUser({})
      isResolved(false)

    } else {
      console.log('user exists!')
      setUser({
        firstName: data.allUsers.nodes[0].firstName,
        lastName: data.allUsers.nodes[0].lastName, 
        id: data.allUsers.nodes[0].userId, 

      })
      isResolved(true)
    }
  },
    error => {
      isResolved(false)
      console.log(error)
    })
  return true;
}

export const handleLogin = ({ username, password }) => {
  if (getUser() !== {}) {
    return true;
  }
  return false
}
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
export const logout = callback => {
  setUser({})
  callback()
}
