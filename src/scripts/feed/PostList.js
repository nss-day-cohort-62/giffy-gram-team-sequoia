import { renderApp } from "../main.js"
import { getPosts } from "../data/provider.js";



document.addEventListener("click", clickEvent => {
    
    if (clickEvent.target.id === "haveAGif") {
        clickEvent.preventDefault();
        document.getElementById("createPost").innerHTML = newPost()
        // document.getElementById("haveAGif").insertAdjacentElement(text, newPost())
        // document.getElementById("haveAGif").class = "newPost"
        // console.log("this works")
        
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelPost") {
        renderApp()
    }
})

const newPost = () => {
    let html = `
    <div class="newPost">
        <div class="newPost__description" >
            <input type="text" placeholder="title">
        </div>
        <div class="newPost__input">   
            <input type="text" placeholder="URL of gif">
        </div>
        <div class="newPost__input">
            <textarea placeholder="Story behind your gif..."></textarea>
        </div>
        <button>Save</button>
        <button id="cancelPost">Cancel</button>
            
        
    </div>
    `
    return html
}


const postList = () => {
    const posts = getPosts()
    let html = `<ul>`
    for (const post of posts) {
        html += `<li>
        <h4>${post.title}</h4>
        <a href="${post.url}"></a>
        <div>${post.story}</div>
        <div>this was posted by ${post.userId} on ${post.date}</div>
        </li>
        `
    }
    console.log(posts)
    html += "</ul>"
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












