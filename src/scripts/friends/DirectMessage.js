import { getMessages, getUsers } from "../data/provider.js";


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "messageCount") {
        // clickEvent.preventDefault();
        document.getElementById("directMessage").innerHTML = DirectMessage()
        // document.dispatchEvent(new CustomEvent("stateChanged"))
        console.log("click")
    }
})




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
            return `<li>
            <div>From ${userMsg.postUser}</div>
            <div>${userMsg.message}</div>
            <div>${userMsg.date}</div>
            </li>`
        }).join("")
    }
    </ul>
    </article>
    `
    return html
}