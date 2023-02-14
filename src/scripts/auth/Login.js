import { getUsers, fetchUsers, clearTransient, saveNewUser} from "../data/provider.js"


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        fetchUsers()
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("gg_user", foundUser.id)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.name === "logoutButton"){
        clearTransient()
        localStorage.clear()
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
    
})



document.addEventListener("click", clickEvent => {
    if (clickEvent.target.name === "registerUser") {
        const newFirstName = document.querySelector("input[name='newFirstName']").value
        const newLastName = document.querySelector("input[name='newLastName']").value
        const newEmail = document.querySelector("input[name='newEmail']").value
        const newPassword = document.querySelector("input[name='newPassword']").value

        const dataToSendToAPI = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            password: newPassword
        }



        saveNewUser(dataToSendToAPI)
    }

})





export const LoginForm = () => {
    return `
        <div class="loginForm">
            <form>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            </div>

            <div class="loginForm">
            <form>
                <fieldset>
                    <label for="newFirstName">First Name:</label>
                    <input type="text" name="newFirstName" autofocus placeholder="First Name" />
                </fieldset>
                <fieldset>
                    <label for="newLastName">Last Name:</label>
                    <input type="text" name="newLastName" placeholder="Last Name" />
                </fieldset>
                <fieldset>
                    <label for="newEmail">Email:</label>
                    <input type="text" name="newEmail" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="newPassword">Password:</label>
                    <input type="password" name="newPassword" placeholder="Password" />
                </fieldset>
            </form>
            <button id="registerButton" name="registerUser">Register</button>
        </div>
    `
}
