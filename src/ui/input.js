
/**
 * @returns {HTMLElement}
 */
export function input() {
    const inputBox = document.createElement('input');

    inputBox.textContent = "Test input!";
    inputBox.style.border = "1px";

    const modal = document.createElement("div");
    modal.className = "game-start-modal";
    modal.style.position = "absolute";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";
    modal.style.background = "rgba(0, 0, 0, 0.9)";
    modal.style.color = "white";
    modal.style.padding = "40px";
    modal.style.borderRadius = "15px";
    modal.style.textAlign = "center";
    modal.style.border = "2px solid #ff4444";
    modal.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
    modal.style.maxWidth = "400px";
    modal.style.width = "90%";

    modal.appendChild(inputBox);

    return modal;
}
