import { changeReadStatus, getMessages, getUsers, setMsgDisplayStateTrue } from "../data/provider.js";




document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "messageCount") {
        // clickEvent.preventDefault();
        // document.getElementById("directMessage").innerHTML = DirectMessage()
        setMsgDisplayStateTrue()
        document.dispatchEvent(new CustomEvent("stateChanged"))
        console.log("click")
    }
})

const msgsRead = (msgId) => {
    const messages = getMessages()
    for (const message of messages) {
        if(message.id === msgId) {
            const readMsg = message
            readMsg.read = true
            changeReadStatus(message.id, readMsg)
        }
        
    }
}


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("markRead")) {
        const [,msgId] = clickEvent.target.id.split("--")
        msgsRead(parseInt(msgId))
        console.log("click")
    }
})



/*
export const DirectMessage = () => {
    const messages = getMessages()
    const users = getUsers()
    let html = ""
    const userMessages = messages.filter(msg => msg.postRecipient === parseInt(localStorage.getItem("gg_user")))
    const sortedUserMessages = userMessages.sort((a, b) => b.id - a.id)
    html +=
    `
    <article>
    <ul>
    
    ${
        sortedUserMessages.map(userMsg => {
            if(userMsg.read === false) {
                return `<li id="msg--${userMsg.id}" class="unreadMsg">
                <div class="message__author">From ${userMsg.postUser}</div>
                <div>${userMsg.message}</div>
                <div>${userMsg.date}</div>
                <button id="markRead--${userMsg.id}">Mark Read</button>
                </li>`
            } else {
                return `<li id="msg--${userMsg.id}" class="readMsg">
                <div class="message__author">From ${userMsg.postUser}</div>
                <div>${userMsg.message}</div>
                <div>${userMsg.date}</div>
                </li>`
            }
        }).join("")
    }
    </ul>
    </article>
    `
    return html
}
*/


export const matchSender = (userMsg) => {
    const users = getUsers()
    for (const user of users) {
        if (userMsg.postUser === user.id) {
            return `${user.firstName} ${user.lastName}`
        }

    }
}