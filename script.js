function randomBJcolor() {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  setInterval(() => {
  let color = '#';
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * hex.length)
        color += hex[random];
    }
    $('.window-start_h1').css('color', color)
    $('.window-start_p').css('color', color) 
    $('.window-start_h1').css('textShadow', `3px 3px 10px ${color}`)
    $('.window-start_p').css('textShadow', `1px 1px 8px ${color}`) 
  }, 1000);
}
randomBJcolor()

function hidePopUp() {
  $('.window-start_button').bind('click', () => {
    $('.pop-up-window-start').css('opacity', '0')
    setTimeout(() => {
      $('.pop-up-window-start').css('display', 'none')
    }, 1000);
  })
}

hidePopUp()
