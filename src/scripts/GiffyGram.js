import { Footer } from "./nav/Footer.js"
import { Feed } from "./feed/PostList.js"
import { newMessage } from "./message/MessageForm.js"
// import { DirectMessage } from "./friends/DirectMessage.js"
import { renderApp } from "./main.js"
import { getUsers, getMessages, getTransient, clearTransient } from "./data/provider.js"
import { matchSender } from "./friends/DirectMessage.js"

const inboxCount = () => {
    const users = getUsers()
    const messages = getMessages()
    let count = 0
    for (const msg of messages) {
        if (msg.postRecipient === parseInt(localStorage.getItem("gg_user")) && msg.read === false) {
            count ++
        }
    }
    return count
}




export const GiffyGram = () => {
    const transient = getTransient()
    const messages = getMessages()
    const users = getUsers()
    let html = ""
    const userMessages = messages.filter(msg => msg.postRecipient === parseInt(localStorage.getItem("gg_user")))
    const sortedUserMessages = userMessages.sort((a, b) => b.id - a.id)
    if (transient.msgDisplayState === true) {
        return `<header class="navigation">
        <div class="navigation__icon">
            <img src="./images/pb.png">
        </div>
        <h1 id="navName" class="navigation__name">Giffygram</h1>
        <div class="navigation__message">
            <img id="directMessageIcon" src="./images/fountain-pen.svg" alt="pen icon" />
            <button id="messageCount" class="notification__count">${inboxCount()}</button>
        </div>
        <div class="navigation__logout">
            <button name="logoutButton" class="navigation__logout">Logout</button>
    
        </div>
        </header>
        <div class="giffygram__feed" id="directMessage">
            <article>
            <ul id="messageInboxList">
            
            ${
                sortedUserMessages.map(userMsg => {
                    if(userMsg.read === false) {
                        return `<li id="msg--${userMsg.id}" class="unreadMsg">
                        <div class="message__author">From ${matchSender(userMsg)}</div>
                        <div>${userMsg.message}</div>
                        <div>${userMsg.date}</div>
                        <button class="markAsReadButton" id="markRead--${userMsg.id}">Mark Read</button>
                        </li>`
                    } else {
                        return `<li id="msg--${userMsg.id}" class="readMsg">
                        <div class="message__author">From ${matchSender(userMsg)}</div>
                        <div>${userMsg.message}</div>
                        <div>${userMsg.date}</div>
                        </li>`
                    }
                }).join("")
            }
            </ul>
            </article>
    
        </div>
    
        <footer>
            ${Footer()}
        </footer>
        
    
        `
        
        
    } else {

        // Show main main UI
        return `<header class="navigation">
        <div class="navigation__icon">
            <img src="./images/pb.png">
        </div>
        <h1 id="navName" class="navigation__name">Giffygram</h1>
        <div class="navigation__message">
            <img id="directMessageIcon" src="./images/fountain-pen.svg" alt="pen icon" />
            <button id="messageCount" class="notification__count">${inboxCount()}</button>
        </div>
        <div class="navigation__logout">
            <button name="logoutButton" class="navigation__logout">Logout</button>
    
        </div>
        </header>
        <div class="giffygram__feed" id="directMessage">
        <article>
            ${Feed()}
    
        </article>
        </div>
    
        <footer>
            ${Footer()}
        </footer>
    
        `
    }
}




document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "navName"){
        clearTransient()
        renderApp()
    }
    
})



