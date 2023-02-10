import { getPosts, getUsers, getUserFavorites, fetchPosts, setYearFilter, setUserFilter, clearTransient, getTransient } from "../data/provider.js";










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




// let selectedYear = 0;

// export const filterPostYears = () => {
//     const posts = getPosts()
//     const sortedPosts = posts.sort((a, b) => b.id - a.id)
//     let filteredArr = []
//     if (selectedYear = 0) {
//         filteredArr = sortedPosts
//     } else {
//         for (const post of sortedPosts) {
//             const postDate = new Date(post.date)
//             const postYear = postDate.getFullYear()
//             if (parseInt(selectedYear) === parseInt(postYear)) {
//                 filteredArr.push(post)
//             }
//         }
//     }
//     return filteredArr
// }


// let userFilterState = false
// let userFavoriteState = false




export const filterByYear = (post) => {
    let filteredPost = null
    const postDate = new Date(post.date)
    const postYear = postDate.getFullYear()
    const [,year] = document.querySelector(".yearSelection").value

    if (postYear === year) {
        filteredPost = post
    }
    return filteredPost
}
























document.addEventListener(
        "change",
        clickEvent => {
            const itemClicked = clickEvent.target
            if (itemClicked.id.startsWith("yearSelection")) {
                // const [,year] = itemClicked.id.split("--")
                setYearFilter(clickEvent.target.value)
                
            }
        
        }
    )


document.addEventListener(
    "change",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("userSelection")) {
            // const [,userId] = itemClicked.id.split("--")
            setUserFilter(parseInt(clickEvent.target.value))
            
    
        }
    
    }
)

document.addEventListener(
    "click",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "clearFilters") {
            clearTransient()
            
    
        }
    
    }
)

document.addEventListener(
    "click",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "checkTransientState") {
            const transient = getTransient()
            console.log(transient)
            
    
        }
    
    }
)





export const Footer = () => {
    const yearArr = filterByYears()
    const uniqueYears = [...new Set(yearArr)]
    const userArr = filterByUsers()
    let html = `
    <div class="footer">
    <div class="footer__item">
        Posts since
            <select class="yearSelection" id="yearSelection">
            <option value="0">Select A Year</option>
            ${
                uniqueYears.map(year => {
                        return `<option class="yearSelection" value="${year}">${year}</option>`
                }).join("")
            }
            </select>
    </div>
    <div class="footer__item">
        Posts by user
            <select class="userSelection"  id="userSelection">
            <option value="0">Select A User</option>
            ${
                userArr.map(user => {
                    return `<option class="userSelection" value="${user.id}">${user.firstName} ${user.lastName}</option>`
                }).join("")
            }
            </select>
    </div>
    <div class="footer__item">
        Show only favorites
            <input type="checkbox">
            </input>
    </div>
    <div class="footer__item">
        <button id="clearFilters">Clear Filters</button>
    </div>
    <div class="footer__item">
        <button id="checkTransientState">Check</button>
    </div>
    `

    return html
}