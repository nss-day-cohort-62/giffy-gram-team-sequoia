import { getUsers, sendMessage } from "../data/provider.js"
import { renderApp } from "../main.js"


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessageIcon") {
        // clickEvent.preventDefault();
        document.getElementById("newMessage").innerHTML = newMessage()
        console.log("click")
    }
})







/* SEND MESSAGE TO API */


document.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "sendMessage") {
            const newPostUser = parseInt(localStorage.getItem("gg_user"))
            const newPostRecipient = parseInt(document.querySelector("#recipient").value)
            const newMessage = document.querySelector("#messageSection").value
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            const newDate = year + "/" + month + "/" + day
            const readValue = false

            const dataToSendToAPI = {
                postUser: newPostUser,
                postRecipient: newPostRecipient,
                message: newMessage,
                date: newDate,
                read: readValue  
            }
            sendMessage(dataToSendToAPI)
    }
} 
)




/* CANCEL MESSAGE */



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelMessage") {
        renderApp()
    }
})



export const newMessage = () => {
    const users = getUsers()
    let html = `
    <div class="directMessage">
        <h2>Direct Message</h2>
        <div>
            <label>Recipient:</label>
            <select id="recipient" class="select--friends">
                <option value="0">Choose A Recipient...</option>
                ${
                    users.map(user => {
                        if (user.id !== parseInt(localStorage.getItem("gg_user"))) {
                            return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`
                        }
                    }).join("")
                }
            </select>
        </div>
        <label>Message:</label>
        <div>
            <textarea id="messageSection" class="message__section" placeholder="Message to user"></textarea>
        </div>
        <div>
            <button id="sendMessage">Save</button>
            <button id="cancelMessage">Cancel</button>
        </div>
    </div>
    `
    return html
}


