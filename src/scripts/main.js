import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchUsers, fetchPosts, fetchUserFavorites } from "./data/provider.js"


const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    fetchUsers()
    .then(() => fetchPosts() )
    .then(() => fetchUserFavorites() )
    .then(
        () => {
            const user = parseInt(localStorage.getItem("gg_user"))
            
            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
    })
}

renderApp()

document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderApp()
})


