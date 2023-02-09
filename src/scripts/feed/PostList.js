import { renderApp } from "../main.js"
import { getPosts, getUsers, savePost} from "../data/provider.js";



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
            const newDate = new Date().toLocaleDateString()
            
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


const postList = () => {
    const posts = getPosts()
    const users = getUsers()

    let html = ``
    for (const post of posts) {
        const matchedUser = users.find(user => user.id === post.userId)    
        html += `
        <section class="post">
            <h4>${post.title}</h4>
            <img class="post__image" src="${post.url}">
            <div class="post__tagline">${post.story}</div>
            <div class-"post__remark">this was posted by ${matchedUser.firstName} on ${post.date}</div>
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












