import { getPosts, getUsers, getUserFavorites, fetchPosts, setYearFilter, setUserFilter, clearTransient, getTransient, setUserFavFilter } from "../data/provider.js";




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
                if (clickEvent.target.value === "0") {
                    setYearFilter(null)
                } else {

                    setYearFilter(clickEvent.target.value)
                }
                
            }
        
        }
    )


document.addEventListener(
    "change",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("userSelection")) {
            setUserFilter(parseInt(clickEvent.target.value))
            
    
        }
    
    }
)

document.addEventListener(
    "change",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.type === "checkbox") {
            setUserFavFilter(parseInt(clickEvent.target.value))
        }
    
    }
)

document.addEventListener(
    "change",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "checked") {
            setUserFavFilter(null)
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




export const isYearSelected = (year) => {
    const transient = getTransient()
    if (parseInt(transient.selectedYear) === year) {
        return `selected`
    } else {
        return ""
    }
} 

export const isUserSelected = (user) => {
    const transient = getTransient()
    if (parseInt(transient.selectedUserId) === user.id) {
        return `selected`
    } else {
        return ""
    }
} 


export const isUserFavSelected = () => {
    const transient = getTransient()
    if (transient.userFavId) {
        return `checked id="checked"`
    } else {
        return `id='unchecked'`
    }
}






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
                        return `<option ${isYearSelected(year)} class="yearSelection" value="${year}">${year}</option>`
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
                    return `<option ${isUserSelected(user)} class="userSelection" value="${user.id}">${user.firstName} ${user.lastName}</option>`
                }).join("")
            }
            </select>
    </div>
    <div class="footer__item">
        Show only favorites
            <input ${isUserFavSelected()} type="checkbox"  value="${localStorage.getItem("gg_user")}">
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