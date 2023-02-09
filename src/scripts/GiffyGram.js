import { Footer } from "./nav/Footer.js"
import { Feed } from "./feed/PostList.js"


export const GiffyGram = () => {

    // Show main main UI
    return `<header class="navigation">
    <div class="navigation__icon">
        <img src="./images/pb.png">
    </div>
    <h1 class="navigation__name">Giffygram</h1>
    <div class="navigation__message">
        <img id="directMessageIcon" src="./images/fountain-pen.svg" alt="pen icon">
        <button class="notification__count">0</button>
    </div>
    <div class="navigation__logout">
        <button name="logoutButton" class="navigation__logout">Logout</button>

    </div>
    </header>

    <article>
        ${Feed()}

    </article>

    <footer>
        ${Footer()}
    </footer>
    `
}
