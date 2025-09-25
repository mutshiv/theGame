/**
 * @param {boolean} isPlaying
 * @param {function} draw
 * @param {function} renderFood 
 *
 * @returns {HTMLElement}
 */
export function btnStart(isPlaying, draw, renderFood) {
    const btnStart = document.createElement('button')
    btnStart.textContent = 'Start theGame'
    btnStart.style.position = "absolute";
    btnStart.style.top = "10px";
    btnStart.style.left = "50%";
    btnStart.style.transform = "translateX(-50%)";
    btnStart.style.background = 'Green';
    btnStart.style.color = 'white';
    btnStart.style.border = 'none';
    btnStart.style.padding = '15px 30px';
    btnStart.style.fontSize = '1.1em';
    btnStart.style.borderRadius = '5px';
    btnStart.style.cursor = 'pointer';
    btnStart.style.marginTop = '20px';
    btnStart.style.transition = 'background 0.3s ease';

    btnStart.addEventListener('click', () => {
        if(!isPlaying) {
            draw();
            renderFood();
            isPlaying = true;
        }
    });

    return btnStart;
}
