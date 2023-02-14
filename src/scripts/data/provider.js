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
    userFavorites: [],
    messages: [],
    transient: {}
}

export const setYearFilter = (year) => {
    applicationState.transient.selectedYear = year
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setUserFilter = (id) => {
    applicationState.transient.selectedUserId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setUserFavFilter = (userId) => {
    applicationState.transient.userFavId = userId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMsgDisplayStateTrue = () => {
    applicationState.transient.msgDisplayState = true
}

// export const setMsgDisplayStateFalse = () => {
//     applicationState.transient.msgDisplayState = false
// }


export const clearTransient = () => {
    applicationState.transient = {}
    document.dispatchEvent(new CustomEvent("stateChanged"))

}

export const getTransient = () => {
    return applicationState.transient
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






export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.messages = data
            }
        )
}

export const getMessages = () => {
    return applicationState.messages.map(msg => ({...msg}))
}

export const sendMessage = (msg) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(msg)
    }
    return fetch(`${apiURL}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent ("stateChanged"))
        })
       
}

export const changeReadStatus = (msgId, newMsg) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMsg)
    }

    return fetch(`${apiURL}/messages/${msgId}`, fetchOptions)
    .then(response => response.json())
    .then (() => {
        document.dispatchEvent(new CustomEvent ("stateChanged"))
    })

}