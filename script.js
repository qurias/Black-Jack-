const log = console.log

function randomBJcolor() {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  setInterval(() => {
  let color = '#';
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * hex.length)
        color += hex[random];
    }
    $('.random-color').css('color', color)
    $('.window-start_h1').css('textShadow', `3px 3px 10px ${color}`)
    $('.window-start_p').css('textShadow', `1px 1px 8px ${color}`) 
    $('.game-title').css('textShadow', `1px 1px 6px ${color}`) 
    $('.game-table').css('border', `4px solid ${color}`).css('box-shadow', `0px 0px 20px ${color}`)
  }, 1000);
}
randomBJcolor()

function hidePopUp() {
  $('.window-start_button').bind('click', () => {
    $('.pop-up-window-start').css('opacity', '0')
    setTimeout(() => {
        $('.pop-up-window-start').css('display', 'none');
        $('.game').css('display', 'flex');
    }, 1000);
  })
}

hidePopUp()

function game() {
 
  const SUIT = ['♥', '♦', '♣', '♠']
  const VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  class Card  {
    constructor(suit,value) {
      this.suit = suit
      this.value = value
    }

     get color() {
      return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }
  }

  class Deck {
    constructor(cards = сreateDeck()) {
      this.cards = cards
    }

    shuffleDeck() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }

  function сreateDeck() {
    return SUIT.flatMap(suit => {
      return VALUES.map(value => { 
        return new Card(suit, value)
      })
    })
  }

  let deck = new Deck()
  deck.shuffleDeck()

// PEOPLE SETTINGS //

  let limiting_card = 0

  $('.button__deal').bind('click', () => {
    if(limiting_card >= 3) {
      $('.off_add_card').attr('disabled', 'disabled');
    }
    let random_card = Math.floor(Math.random() * deck.cards.length)
    let cardDiv = document.createElement("div")
    $(cardDiv).addClass('player-one-card')
    $(cardDiv).html(deck.cards[random_card].value + deck.cards[random_card].suit)
    $('.player-one__cards').append(cardDiv)
    limiting_card++
    scorePeople(random_card)
  })

  function scorePeople(random_card) {
    let your_score = $('.your-score').html()
    if(deck.cards[random_card].value == 'A') {
      $('.your-score').html(+your_score + 11)
    }
    else if(deck.cards[random_card].value == 'K') {
      $('.your-score').html(+your_score + 4)
    }
    else if(deck.cards[random_card].value == 'Q') {
      $('.your-score').html(+your_score + 3)
    }
    else if(deck.cards[random_card].value == 'J') {
      $('.your-score').html(+your_score + 2)
    }
    else {
      $('.your-score').html(+your_score + +deck.cards[random_card].value)
    }
  }

// BOT SETTINGS //


  $('.button__stand').bind('click', () => {
    $('.off_add_card').attr('disabled', 'disabled');
    botgame()
  })

  function botgame() {
      let random_card = Math.floor(Math.random() * deck.cards.length)
      let cardDiv = document.createElement("div")
      $(cardDiv).addClass('player-two-card')
      $(cardDiv).html(deck.cards[random_card].value + deck.cards[random_card].suit)
      $('.player-two__cards').append(cardDiv)
      scoreBot(random_card)
  }

  function scoreBot(random_card) {
    let bot_score = $('.bot-score').html()
    if(deck.cards[random_card].value == 'A') {
      $('.bot-score').html(+bot_score + 11)
    }
    else if(deck.cards[random_card].value == 'K') {
      $('.bot-score').html(+bot_score + 4)
    }
    else if(deck.cards[random_card].value == 'Q') {
      $('.bot-score').html(+bot_score + 3)
    }
    else if(deck.cards[random_card].value == 'J') {
      $('.bot-score').html(+bot_score + 2)
    }
    else {
      $('.bot-score').html(+bot_score + +deck.cards[random_card].value)
    }
    logics()
  }
  
  function logics() {
    setTimeout(() => {
      if(bot_score = $('.bot-score').html() <= 12) {
      botgame()
      }
      else {
        result()
      }
    }, 1000);
  }

  function result() {
    if($('.bot-score').html() > $('.your-score').html() && $('.bot-score').html() > 21) {
      alert('Ты выиграл!')
    }
    if($('.your-score').html() > $('.bot-score').html() && $$('.your-score').html() > 21) {
      alert('Ты проиграл!')
    }
    // ($('.bot-score').html() > $('.your-score').html() && $('.bot-score').html() > 21) ? alert('Ты выиграл!') : 'йцу'
    // ($('.your-score').html() > $('.bot-score').html() && $('.your-score').html() > 21) ? alert('Ты Проигал!') : 'йцу'
    // ($('.bot-score').html() > $('.your-score').html() && $('.bot-score').html() > 21) ? alert('Ты выиграл!') : ''
  }

// BUTTONS SETTINGS //

  function buttons() {
      $('.button__plus').bind('click', () => {
        let value_bet = $('.js-bet').html()
        let value_moneys = $('.js-money').html()
        if (+value_bet == +value_moneys) {
          return
        }
        $('.js-bet').html(+value_bet + 5)
      })
      $('.button__minus').bind('click', () => {
        let value_bet = $('.js-bet').html()
        if(+value_bet == 5) {
          return
        }
        $('.js-bet').html(+value_bet - 5)
      })
      $('.button__deal').bind('click', () => {
        let value_bet = $('.js-bet').html()
        let value_moneys = $('.js-money').html()
        if (+value_moneys <= 0) {
          return
        }
        $('.js-money').html(+value_moneys - +value_bet )
      })
  }
  buttons()
}
game()

