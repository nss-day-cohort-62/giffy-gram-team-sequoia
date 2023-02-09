

export const Footer = () => {
    let html = `
    <div class="footer">
    <div class="footer__item">
        Posts since
            <select>
            </select>
    </div>
    <div class="footer__item">
        Posts by user
            <select>
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