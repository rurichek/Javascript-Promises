
// first question

$(function() {
  
    $("#fav-number-form").on("submit", function(evt) {
      evt.preventDefault();
      let number = $("#fav-number").val();

      let url = `http://numbersapi.com/${number}?json`;
      axios.get(url)
      .then(res => {
          console.log("FIRST PROMISE IS RESOLVED!")
          console.log(res.data.text)
          // return axios.get(res.data.text)
          $("#result").text(res.data.text);

      })
      .catch(err => console.log("REJECTED!!", err))
  
    //   let numberData = { number };
    //   const HTMLtoAppend = createNumberDataHTML(numberData);
  
    // //   moviesList.push(movieData);
  
    //   $("#result").append(HTMLtoAppend);
      $("#form-group").trigger("reset");
    })


})




// ###############################################################
// second question

$(function() {
  
    $("#fav-number-form-two").on("submit", function(evt) {
      evt.preventDefault();
      let numbers = $("#fav-number-two").val();

      let url2 = `http://numbersapi.com/${numbers}`;
      axios.get(url2)

          .then(res => {
            let output = ""

              for (let number in res.data) {
                  console.log(`Trivia for number ${number}!`);
                  console.log(res.data[number]);
                  output += `Trivia for number ${number}: ${res.data[number]}\n`

              }

              $("#result-two").text(output);
          })

      })
      .catch(err => console.log("REJECTED!!", err))
  
      $("#fav-number-form-two").trigger("reset");
    })

// let url2 = "http://numbersapi.com/1..3,10";
// axios.get(url2)
// //     .then(res => {
// //         console.log("FIRST NUMBER!")
// //         console.log(res.data)
// //         // return axios.get(res.data.text)
// //     })
// //     .then(res => {
// //         console.log("SECOND NUMBER!")
// //         console.log(res.data)
// //         // return axios.get(res.data.text)
// //     })
// //     .then(res => {
// //         console.log("THIRD NUMBER!")
// //         console.log(res.data)
// //         // return axios.get(res.data.text)
// //     })
// //     .catch(err => console.log("REJECTED!!", err))
//     .then(res => {
//         for (let number in res.data) {
//             console.log(`Trivia for number ${number}!`);
//             console.log(res.data[number]);
//         }
//     })


// ###############################################################
// third question
// $("#fav-number-form-three").on("submit", function(evt) {
//     evt.preventDefault();
//     let number = $("#fav-number-three").val();

//     function get(url) {
//         const request = new XMLHttpRequest();
//         return new Promise((resolve, reject) => {
//         request.onload = function () {
//             if (request.readyState !== 4) return;
    
//             // Check status code
//             if (request.status >= 200 && request.status < 300) {
//             resolve({
//                 data: JSON.parse(request.response),
//                 status: request.status,
//                 request: request,
//             })
//             } else {
//             reject({
//                 msg: 'Server Error',
//                 status: request.status,
//                 request: request
//             })
//             }
//         }
//         request.onerror = function handleError() {
//             reject({
//             msg: 'NETWORK ERROR!'
//             })
//         };
//         request.open('GET', url);
//         request.send();
//         })
//     }

//     let output = ""

//     get(`http://numbersapi.com/${number}?json`)
//     .then(res => {

//         console.log('third question'),
//         // console.log('first fact about 154'),
//         console.log(res.data.text)

//         output += `${res.data.text}`
//         console.log(`here is the ${output}`)

//         $("#result-three").text(output);


//     })
//     get(`http://numbersapi.com/${number}?json`)
//     .then(res => {
//         // console.log('third question'),
//         // console.log('second fact about 154'),
//         console.log(res.data.text)

//         output += `${res.data.text}`


//         $("#result-three").text(output);

//     })
//     get(`http://numbersapi.com/${number}?json`)
//     .then(res => {
//         // console.log('third question'),
//         // console.log('third fact about 154'),
//         console.log(res.data.text)

//         output += `${res.data.text}`


//         $("#result-three").text(output);

//     })
//     get(`http://numbersapi.com/${number}?json`)
//     .then(res => {
//         // console.log('third question'),
//         // console.log('fourth fact about 154'),
//         console.log(res.data.text)

//         output += `${res.data.text}`


//         $("#result-three").text(output);

//     })
//     .catch(err => console.log(err))

//     // $("#result-three").text(output);


// })

$("#fav-number-form-three").on("submit", function(evt) {
    evt.preventDefault();
    let number = $("#fav-number-three").val();

    let fourNumberPromises = [];

    for(let i=1; i < 5; i++){
        fourNumberPromises.push(
            axios.get(`http://numbersapi.com/${number}?json`)
        )
    }

    let output = ''

    Promise.all(fourNumberPromises)
        .then(numberArr => {
            for (res of numberArr) {
                console.log('########Over Here########')
                console.log(res.data.text)
                output += `${res.data.text}`

                $("#result-three").text(output);
            }
        })
        .catch(err => console.log(err));
})


// ****************************
// Part 2 Question 1
// ****************************

let shuffled_deck = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

axios
    .get(shuffled_deck)
    .then (d1 => {
        console.log('Question 1:')
        console.log(`Here is the deck_id ${d1.data.deck_id}`)
        let deck_id = d1.data.deck_id
        return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then (c1 => {
        c1.data.cards.forEach(card => {
            console.log('--still question 1')
            console.log(`Here is the picked card: ${card.value} of ${card.suit}`);
            console.log('--end of question 1')
        });
        
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
    

// ****************************
// Part 2 Question 2
// ****************************
let deck_id

axios.get(shuffled_deck)
    .then (d1 => {
        console.log('Question 2:')
        console.log(`Here is the deck_id ${d1.data.deck_id}`)
        deck_id = d1.data.deck_id
        return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then (c1 => {
        c1.data.cards.forEach(card => {
            console.log(`Here is the first picked card: ${card.value} of ${card.suit}`);
        });
        return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

    })
    .then (c2 => {
        c2.data.cards.forEach(card => {
            console.log(`Here is the second picked card: ${card.value} of ${card.suit}`);
        });
    })

    .catch(error => {
        console.error("An error occurred:", error);
    });


// ****************************
// Part 2 Question 3
// ****************************
$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
    });
  
    $btn.on('click', function() {
      $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
          $('<img>', { 
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
        if (data.remaining === 0) $btn.remove();
      });
    });
});




