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
    posts: [],
    userFavorites: []
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
            document.dispatchEvent(new CustomEvent ("stateChanged"))
        })
       
}



export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}






export const fetchUserFavorites = () => {
    return fetch(`${apiURL}/userFavorites`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.userFavorites = data
            }
        )
}




export const saveUserFavorite = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(post)
    }
    return fetch(`${apiURL}/userFavorites`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent ("stateChanged"))
        })
       
}

export const getUserFavorites = () => {
    return applicationState.userFavorites.map(post => ({...post}))
}


export const deleteUserFavorite = (id) => {
    return fetch(`${apiURL}/userFavorites/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

