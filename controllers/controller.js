import { initHTML, loadCartPage } from "./menu.js";
window.onload = async () => {
    await initHTML();
    document.getElementById("cart-page-btn").addEventListener("click", async () => {
        await loadCartPage()
    })
}
