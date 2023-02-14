import { Footer } from "./nav/Footer.js"
import { Feed } from "./feed/PostList.js"
import { newMessage } from "./message/MessageForm.js"
import { DirectMessage } from "./friends/DirectMessage.js"
import { renderApp } from "./main.js"


export const GiffyGram = () => {

    // Show main main UI
    return `<header class="navigation">
    <div class="navigation__icon">
        <img src="./images/pb.png">
    </div>
    <h1 id="navName" class="navigation__name">Giffygram</h1>
    <div class="navigation__message">
        <img id="directMessageIcon" src="./images/fountain-pen.svg" alt="pen icon" />
        <button id="messageCount" class="notification__count">0</button>
    </div>
    <div class="navigation__logout">
        <button name="logoutButton" class="navigation__logout">Logout</button>

    </div>
    </header>

    <div class="giffygram__feed" id="directMessage">
    <article>
        ${Feed()}

    </article>

    <footer>
        ${Footer()}
    </footer>
    </div>

    `
}


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "navName"){
        renderApp()
    }
    
})
