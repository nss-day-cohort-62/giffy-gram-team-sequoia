import { renderApp } from "../main.js"
import { getPosts, getUsers, savePost, getUserFavorites, saveUserFavorite, deletePost, deleteUserFavorite, getTransient } from "../data/provider.js";



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "haveAGif") {
        clickEvent.preventDefault();
        document.getElementById("createPost").innerHTML = newPost()
        // document.getElementById("haveAGif").insertAdjacentElement(text, newPost())
        // document.getElementById("haveAGif").class = "newPost"
        // console.log("this works")
        
    }
}) 

document.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "savePost") {
            const newTitle = document.querySelector("#newPostTitle").value
            const newURL = document.querySelector("#newPostURL").value
            const newStory = document.querySelector("#newPostStory").value
            // const newDate = new Date()
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
        <div class="newPost__description" >
            <input id="newPostTitle" type="text" placeholder="title">
        </div>
        <div class="newPost__input">   
            <input id="newPostURL" type="text" placeholder="URL of gif">
        </div>
        <div class="newPost__input">
            <textarea id="newPostStory" placeholder="Story behind your gif..."></textarea>
        </div>
            <button id="savePost">Save</button>
            <button id="cancelPost">Cancel</button>
    </div>
    `
    
    return html
    
}





















// document.addEventListener(
//     "click",
//     clickEvent => {
//         if (clickEvent.target.id === "notFavorite") {
//             const favPostId = parseInt(clickEvent.target.value)
//             const favPostUser = parseInt(localStorage.getItem("gg_user"))
            
//             const dataToSendToAPI = {
//                 postId: favPostId,
//                 userId: favPostUser
//             }
//             saveUserFavorite(dataToSendToAPI)
//             document.dispatchEvent(new CustomEvent("stateChanged"))
//     }
// } 
// )

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
    const matchedFavorite = userFavorites.find(userFav => userFav.postId === post.id)
    let html = ""
    if (matchedFavorite && matchedFavorite.userId === parseInt(localStorage.getItem("gg_user"))) {
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















const postList = () => {
    const posts = getPosts()
    const users = getUsers()
    const sortedPosts = posts.sort((a, b) => b.id - a.id)
    let filteredPosts = []
    let printedFilteredPosts = []
    const transient = getTransient()
//
    if (transient.selectedYear) {
        for (const post of sortedPosts) {
            const postDate = new Date(post.date)
            const postYear = postDate.getFullYear()
            if(postYear === parseInt(transient.selectedYear)) {
                filteredPosts.push(post)
            }
        }
    }

    if (transient.selectedUserId) {
        for (const post of sortedPosts) {
            if(post.userId === parseInt(transient.selectedUserId)) {
                filteredPosts.push(post)
            }
        }
    }
    if (filteredPosts != []) {
        printedFilteredPosts = [...new Set(filteredPosts)]
    }
    if ((transient.selectedYear === null) && (transient.selectedUserId === null)) {
        printedFilteredPosts = sortedPosts.map(post => ({...post}))
    }



    console.log(printedFilteredPosts)

//
    let html = ``
    for (const post of printedFilteredPosts) {
        const matchedUser = users.find(user => user.id === post.userId)  
        // const newDate = parseInt(post.date)
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
    <article class="giffygram__feed">
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












