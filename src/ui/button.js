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

/**
* @param {boolean} isPlaying 
* @param {function} listenerEvent 
*
* @returns {HTMLElement}
*/
export function btnGeneric(isPlaying, listenerEvent) {
    const btnGeneric = document.createElement('button');

    btnGeneric.textContent = !isPlaying? 'Restart Game' : 'Resume play';
    btnGeneric.style.background = '#ff4444';
    btnGeneric.style.color = 'white';
    btnGeneric.style.border = 'none';
    btnGeneric.style.padding = '15px 30px';
    btnGeneric.style.fontSize = '1.1em';
    btnGeneric.style.borderRadius = '5px';
    btnGeneric.style.cursor = 'pointer';
    btnGeneric.style.marginTop = '20px';
    btnGeneric.style.transition = 'background 0.3s ease';

    btnGeneric.addEventListener('mouseenter', () => {
        btnGeneric.style.background = '#ff6666';
    });

    btnGeneric.addEventListener('mouseleave', () => {
        btnGeneric.style.background = '#ff4444';
    });

    btnGeneric.addEventListener('click', listenerEvent);

    return btnGeneric;
}
