window.addEventListener('keydown', function (e) {
    if (e.repeat) return //prevents repeat when hold keydown
    playSound(e)
}, false);

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    if (!audio) return // stops function
    addAnimation(e)
    audio.currentTime = 0 // rewinds to start
    audio.play()
}

function addAnimation(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    key.classList.add('playing')
    lowerKey(key)
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // only listens to transform
    this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function lowerKey(key) {
    keyPos = parseInt(key.dataset.low)
    if (keyPos < 100) {
        keyPos += 10
    } else {
        keyPos = 0
    }
    key.dataset.low = `${keyPos}`
    key.style.marginTop = `${keyPos}px`
}