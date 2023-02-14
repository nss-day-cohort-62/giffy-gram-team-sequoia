import { renderApp } from "../main.js"
import { getPosts, getUsers, savePost, getUserFavorites, saveUserFavorite, deletePost, deleteUserFavorite, getTransient } from "../data/provider.js";



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "haveAGif") {
        clickEvent.preventDefault();
        document.getElementById("createPost").innerHTML = newPost()

        
    }
}) 

document.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "savePost") {
            const newTitle = document.querySelector("#newPostTitle").value
            const newURL = document.querySelector("#newPostURL").value
            const newStory = document.querySelector("#newPostStory").value
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            const newDate = year + "/" + month + "/" + day
            console.log(newDate)
            
            const postUser = parseInt(localStorage.getItem("gg_user"))
            
            const dataToSendToAPI = {
                title: newTitle,
                url: newURL,
                story: newStory,
                userId: postUser,
                date: newDate
            }
            savePost(dataToSendToAPI)
    }
} 
)



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelPost") {
        renderApp()
    }
})

const newPost = () => {
    let html = `
    <div class="newPost">
        <div class="newPost__input" >
            <input id="newPostTitle" type="text" placeholder="title">
        </div>
        <div class="newPost__input">   
            <input id="newPostURL" type="text" placeholder="URL of gif">
        </div>
        <div class="newPost__input">
            <textarea id="newPostStory" placeholder="Story behind your gif..."></textarea>
        </div>
        <div>
            <button id="savePost">Save</button>
            <button id="cancelPost">Cancel</button>
        </div>
    </div>
    `
    
    return html
    
}





document.addEventListener(
    "click",
    clickEvent => {
         const itemClicked = clickEvent.target
         if (itemClicked.id.startsWith("notFavorite")) {
            const [,favPostId] = itemClicked.id.split("--")
         


            const favPostUser = parseInt(localStorage.getItem("gg_user"))
            
            const dataToSendToAPI = {
                postId: parseInt(favPostId),
                userId: favPostUser
            }
            saveUserFavorite(dataToSendToAPI)
            document.dispatchEvent(new CustomEvent("stateChanged"))
    }
    }
)


document.addEventListener(
    "click",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("favorite")) {
            const [,matchedFavoriteId] = itemClicked.id.split("--")
            deleteUserFavorite(parseInt(matchedFavoriteId))
            document.dispatchEvent(new CustomEvent("stateChanged"))
            
    }
} 
)






document.addEventListener(
    "click",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("trash")) {
            const [,postId] = itemClicked.id.split("--")
            deletePost(parseInt(postId))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }

)





const isFavorited = (post) => { 
    const userFavorites = getUserFavorites()
    const matchedFavorite = userFavorites.find(userFav => (userFav.postId === post.id) && (userFav.userId === parseInt(localStorage.getItem("gg_user"))))
    let html = ""
    if (matchedFavorite) {
        html += `<img class="post__reactions" id="favorite--${matchedFavorite.id}" value="${matchedFavorite.id}" src="./images/favorite-star-yellow.svg">`
    } else {
        html += `<img class="post__reactions" id="notFavorite--${post.id}" value="${post.id}" src="./images/favorite-star-blank.svg">`
    }
    return html
}




const deleteOption = (post) => {
    const matchedUser = parseInt(localStorage.getItem("gg_user"))
    let html = ""
    if (post.userId === matchedUser) {
        html += `
        <img id="trash--${post.id}" class="post__reactions" src="./images/block.svg">
        `
    }
    return html
}




const FullFilter = () => {
    const posts = getPosts()
    let sortedPosts = posts.sort((a, b) => b.id - a.id)
    const transient = getTransient()
    if (transient.selectedYear) {
        sortedPosts = sortedPosts.filter(post => {
            const postDate = new Date(post.date)
            const postYear = postDate.getFullYear()
            return postYear === parseInt(transient.selectedYear)
        })
    }
    if (transient.selectedUserId) {
        sortedPosts = sortedPosts.filter(post => post.userId === transient.selectedUserId)
    }
    if (transient.userFavId) {
        const userFavorites = getUserFavorites()
        let filteredFavPosts = []
        for (const userFav of userFavorites) {
            if (transient.userFavId === userFav.userId) {
                filteredFavPosts.push(userFav)
            }
        }
        
        sortedPosts = sortedPosts.filter(post => {
            for (const filteredFav of filteredFavPosts) {
                if (post.id === filteredFav.postId) {
                    return true
                }
            }
            return false
        })
        
    }
    return sortedPosts
}




const postList = () => {
    const users = getUsers()

    const printedFilteredPosts = FullFilter()
    let html = ``
    for (const post of printedFilteredPosts) {
        const matchedUser = users.find(user => user.id === post.userId)  
        const d = new Date(post.date);
        const formattedDate = d.toLocaleDateString();

        html += `
        <section class="post">
            <h4>${post.title}</h4>
            <img class="post__image" src="${post.url}">
            <div class="post__tagline">${post.story}</div>
            <div class-"post__remark">this was posted by ${matchedUser.firstName} on ${formattedDate}</div>
            <section class="post__actions">
                ${isFavorited(post)}
                ${deleteOption(post)}
            </section>
        </section>
        `
    }
    return html
}






export const Feed = () => {
    let html = ""
    html += `
    <article>
        <div id="newMessage">
        </div>
        <div id="createPost">
            <section class="miniMode" id="haveAGif">
                
                    have a gif to post?
                
            </section>
        </div>
        <section name="posts">
            ${postList()}
        </section>
    </article>
    `
    return html
}













