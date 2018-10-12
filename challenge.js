const changeCounter = (n) => {
  const counter = document.querySelector('#counter')
  counter.innerText = parseInt(counter.innerText) + n
}

let runCounter = null

function pauseCounter() {
  clearInterval(runCounter)
}

const resumeCounter = () => {
  runCounter = this.setInterval(changeCounter, 1000, 1)
}

resumeCounter()

let minusButton, plusButton, loveButton, pauseButton, submitButton
let buttons = document.querySelectorAll('button')
for (const button of buttons) {
  if (button.innerText === '➖') {
    minusButton = button
  } else if (button.innerText === '➕') {
    plusButton = button
  } else if (button.innerText === '❤️') {
    loveButton = button
  } else if (button.innerText === 'pause') {
    pauseButton = button
  } else if (button.innerText === 'submit') {
    submitButton = button
  }
}

const buttonsToBeDisabled = [minusButton, plusButton, loveButton, submitButton]

minusButton.addEventListener('click', () => {
  changeCounter(-1)
})

plusButton.addEventListener('click', () => {
  changeCounter(1)
})

function createLikeElement(likesList, counterNum) {
  let like = document.createElement('li')
  like.appendChild(document.createTextNode(`${counterNum} was liked 1 times`))
  likesList.appendChild(like)
}

function createOrUpdateLikes(counterNum) {
  const likesList = document.querySelector('.likes')
  // either we'll find an existing like in the for loop...
  for (const like of Array.from(likesList.children)) {
    if (like.innerText.split(' ')[0] === counterNum) {
      const times = parseInt(like.innerText.split(' ')[3])
      like.innerText = `${counterNum} was liked ${times + 1} times`
      return
    }
  }
  // ...or we'll create a new like after the loop.
  createLikeElement(likesList, counterNum)
}

loveButton.addEventListener('click', function() {
  const counter = document.querySelector('#counter')
  const counterNum = counter.innerText
  createOrUpdateLikes(counterNum)
})

pauseButton.addEventListener('click', function() {
  if (this.innerText === 'pause') {
    this.innerText = 'resume'
    // disable all other buttons
    for (const button of buttonsToBeDisabled) {
      button.setAttribute('disabled', 'disabled')
    }
    // stop the counter
    pauseCounter()
  } else {
    this.innerText = 'pause'
    // enable all the other buttons
    for (const button of buttonsToBeDisabled) {
      button.removeAttribute('disabled')
    }
    // resume the counter
    resumeCounter()
  }
})

submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  const commentsList = document.querySelector('.comments')
  // get the text from the textbox (the use wrote this)
  const input = document.querySelector('input')
  // make a p tag & set its text to the comment text
  const commentText = input.value
  const p = document.createElement('p')
  p.appendChild(document.createTextNode(commentText))
  // append the p tag to the div
  commentsList.appendChild(p)
  // ...and finally, clear the input box
  input.value = ''
})
