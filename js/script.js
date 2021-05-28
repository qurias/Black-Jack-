const log = console.log;

function randomBJcolor() {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  setInterval(() => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * hex.length);
      color += hex[random];
    }
    $('.random-color').css('color', color);
    $('.window-start_h1').css('textShadow', `3px 3px 10px ${color}`);
    $('.window-start_p').css('textShadow', `1px 1px 8px ${color}`);
    $('.game-title').css('textShadow', `1px 1px 6px ${color}`);
    $('.game-table')
      .css('border', `4px solid ${color}`)
      .css('box-shadow', `0px 0px 20px ${color}`);
  }, 1000);
}
randomBJcolor();

function hideStartWindow() {
  $('.window-start_button').bind('click', () => {
    $('.pop-up-window-start').css('opacity', '0');
    setTimeout(() => {
      $('.pop-up-window-start').css('display', 'none');
      $('.game').css('display', 'flex');
    }, 1000);
  });
}

hideStartWindow();

function game() {
  popUpHide();

  const SUIT = ['♥', '♦', '♣', '♠'];
  const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  class Card {
    constructor(suit, value) {
      this.suit = suit;
      this.value = value;
    }
  }

  class Deck {
    constructor(cards = сreateDeck()) {
      this.cards = cards;
    }

    shuffleDeck() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }

  function сreateDeck() {
    return SUIT.flatMap((suit) => {
      return VALUES.map((value) => {
        return new Card(suit, value);
      });
    });
  }

  let deck = new Deck();
  deck.shuffleDeck();
  console.log(deck)

  // PEOPLE SETTINGS //
  let limiting_card = 0;
  function addCardHTMLpeople() {
    if(limiting_card <= 0) {
      $('.off_button_hit').removeAttr('disabled');
    }
    else if (limiting_card > 7) {
      $('.off_button_hit').attr('disabled', 'disabled');
    }
    let random_card = Math.floor(Math.random() * deck.cards.length);
    let cardDiv = document.createElement('div');
    let cardP = document.createElement('p');
    $(cardDiv).addClass('player-one-card');
    if (
      deck.cards[random_card].suit == '♥' ||
      deck.cards[random_card].suit == '♦'
    ) {
      $(cardP).css('color', 'red');
    }
    $(cardP).html(deck.cards[random_card].value + deck.cards[random_card].suit);
    $(cardDiv).html(cardP);
    $('.player-one__cards').append(cardDiv);
    limiting_card++;
    scorePeople(random_card);
  }

  function scorePeople(random_card) {
    let your_score = $('.your-score').html();
    if (deck.cards[random_card].value == 'A') {
      $('.your-score').html(+your_score + 11);
    } else if (
      deck.cards[random_card].value == 'K' ||
      deck.cards[random_card].value == 'Q' ||
      deck.cards[random_card].value == 'J'
    ) {
      $('.your-score').html(+your_score + 10);
    } else {
      $('.your-score').html(+your_score + +deck.cards[random_card].value);
    }
    deck.cards.splice(random_card, 1);
    if ($('.your-score').html() > 21) {
      result();
    }
  }

  // BOT SETTINGS //

  function addCardHTMLbot() {
    let random_card = Math.floor(Math.random() * deck.cards.length);
    let cardDiv = document.createElement('div');
    let cardP = document.createElement('p');
    $(cardDiv).addClass('player-two-card');
    if (
      deck.cards[random_card].suit == '♥' ||
      deck.cards[random_card].suit == '♦'
    ) {
      $(cardP).css('color', 'red');
    }
    $(cardP).html(deck.cards[random_card].value + deck.cards[random_card].suit);
    $(cardDiv).html(cardP);
    $('.player-two__cards').append(cardDiv);
    scoreBot(random_card);
  }

  let i = 0; 

  function scoreBot(random_card) {
    let bot_score = $('.bot-score').html();
    if (deck.cards[random_card].value == 'A') {
      $('.bot-score').html(+bot_score + 11);
    } else if (
      deck.cards[random_card].value == 'K' ||
      deck.cards[random_card].value == 'Q' ||
      deck.cards[random_card].value == 'J'
    ) {
      $('.bot-score').html(+bot_score + 10);
    } else {
      $('.bot-score').html(+bot_score + +deck.cards[random_card].value);
    }
    deck.cards.splice(random_card, 1);
    if (i == 0) {
      i++;
    }
    else if (i == 1) {
      logics();
    }
  }

  function logics() {
    setTimeout(() => {
      let bet_score = $('.bot-score').html();
      let people_score = $('.your-score').html();
      if (
        +bet_score < +people_score 
      ) {
        addCardHTMLbot();
      } else {
        result();
      }
    }, 1000);
  }

  function result() {
    let result_people = $('.your-score').html();
    let result_bot = $('.bot-score').html();
    if (+result_people < +result_bot && +result_bot <= 21) {
      $('.a-popup__text').append(
        `<p class="a-popup__p random-color">BOT WIN!</p>`
      );
    } 
    else if (+result_people > +result_bot && +result_people <= 21) {
      $('.a-popup__text').append(
        `<p class="a-popup__p random-color">YOU WIN!</p>`
      );
    } 
    else if (+result_people == +result_bot) {
      $('.a-popup__text').append(
        `<p class="a-popup__p random-color">DRAW!</p>`
      );
    } 
    else if (+result_people > 21 && +result_bot <= 21) {
      $('.a-popup__text').append(
        `<p class="a-popup__p random-color">BOT WIN!</p>`
      );
    } 
    else if (+result_people <= 21 && +result_bot > 21) {
      $('.a-popup__text').append(
        `<p class="a-popup__p random-color">YOU WIN!</p>`
      );
    } 
    else {
      $('.a-popup__text').append(
      `<p class="a-popup__p random-color">DRAW!</p>`
      );
    }
    сalculateMoney();
    popUpShow();
  }

  // CALCULATE MONEY //

  function сalculateMoney() {
    let popupText = $('.a-popup__p').html();
    if (popupText == `YOU WIN!`) {
      let your_bet = $('.js-bet').html();
      let your_money = $('.js-money').html();
      $('.js-money').html(+your_money + +your_bet);
    } else if (popupText == `BOT WIN!`) {
      let your_bet = $('.js-bet').html();
      let your_money = $('.js-money').html();
      $('.js-money').html(+your_money - +your_bet);
    } 
  }

  // BUTTONS SETTINGS //

  function buttons() {
    $('.button__plus').bind('click', () => {
      let value_bet = $('.js-bet').html();
      let value_moneys = $('.js-money').html();
      if (+value_bet == +value_moneys) {
        return;
      }
      $('.js-bet').html(+value_bet + 5);
    });
    $('.button__minus').bind('click', () => {
      let value_bet = $('.js-bet').html();
      if (+value_bet == 5) {
        return;
      }
      $('.js-bet').html(+value_bet - 5);
    });
    $('.button__deal').bind('click', () => {
      $('.off_button_plus').attr('disabled', 'disabled');
      $('.off_button_minus').attr('disabled', 'disabled');
      let value_moneys = $('.js-money').html();
      if (+value_moneys <= 0) {
        return;
      }
      $('.off_button_deal').attr('disabled', 'disabled');
      $('.off_button_hit').removeAttr('disabled');
      $('.off_button_stand').removeAttr('disabled');
      addCardHTMLpeople()
      addCardHTMLbot();
    });
    $('.button__stand').bind('click', () => {
      $('.off_button_hit').attr('disabled', 'disabled');
      $('.off_button_stand').attr('disabled', 'disabled');
        addCardHTMLbot();
    });
    $('.button__hit').bind('click', () => {
      addCardHTMLpeople();
    });
  }
  buttons();

  //POPUP/

  function popUpHide() {
    $('.a-popup').hide();
  }

  function popUpShow() {
    $('.a-popup').show();
  }

  $('.a-popup__button').bind('click', () => {
    clearGame();
    popUpHide();
  });

// CLEAR GAME //
  function clearGame() {
    let your_money = $('.js-money').html();
    let your_bet = $('.js-bet').html();
    if(+your_money < +your_bet) {
      $('.js-bet').html(+your_money);
    }
    console.log(deck)
    deck = new Deck();
    deck.shuffleDeck();
    console.log(deck);
    $('.player-one-card').remove();
    $('.player-two-card').remove();
    $('.your-score').html(0);
    $('.bot-score').html(0);
    $('.a-popup__text').html(``);
    $('.off_button_deal').removeAttr('disabled');
    $('.off_button_plus').removeAttr('disabled');
    $('.off_button_minus').removeAttr('disabled');
    i = 0
    limiting_card = 0
    let stop_game = $('.js-money').html();
    if (+stop_game == 0) {
      stopGame();
    }
  }

  function stopGame() {
    $('.off_button_deal').attr('disabled', 'disabled');
    $('.off_button_plus').attr('disabled', 'disabled');
    $('.off_button_minus').attr('disabled', 'disabled');
    $('.off_button_stand').attr('disabled', 'disabled');
    $('.off_button_hit').attr('disabled', 'disabled');
  }
}
game();
