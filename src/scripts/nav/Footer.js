import { getPosts, getUsers, getUserFavorites, fetchPosts } from "../data/provider.js";










const filterByYears = () => {
    const posts = getPosts()
    let newArr = []
    for (const post of posts) {
        const postDate = new Date(post.date)
        const postYear = postDate.getFullYear()
        newArr.push(postYear)
    }
    return newArr
}






const filterByUsers = () => {
    const users = getUsers()
    let newArr = []
    for (const user of users) {
        newArr.push(user)
    }
    return newArr
}































export const Footer = () => {
    const yearArr = filterByYears()
    const uniqueYears = [...new Set(yearArr)]
    const userArr = filterByUsers()
    let html = `
    <div class="footer">
    <div class="footer__item">
        Posts since
            <select>
            <option value="0">Select A Year</option>
            ${
                uniqueYears.map(year => {
                    return `<option id="year--${year}" value="${year}">${year}</option>`
                }).join("")
            }
            </select>
    </div>
    <div class="footer__item">
        Posts by user
            <select>
            <option value="0">Select A User</option>
            ${
                userArr.map(user => {
                    return `<option id="user--${user.id}" value="${user.id}">${user.firstName} ${user.lastName}</option>`
                }).join("")
            }
            </select>
    </div>
    <div class="footer__item">
        Show only favorites
            <input type="checkbox">
            </input>
    </div>
    `

    return html
}