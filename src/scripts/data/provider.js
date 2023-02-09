const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")



const applicationState = {
    users: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    },
    posts: []
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.users = data
            }
        )
}


export const getUsers = () => {
    return applicationState.users.map(user => ({...user}))
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.posts = data
            }
        )
}

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}

export const savePost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(post)
    }
    return fetch(`${apiURL}/posts`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent ("stateChanged"))
        })
       
}