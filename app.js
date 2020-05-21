  document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay =  document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width =10;
    let timerId;
    let score =0;

    console.log(squares);


    // The tetrominoes


    const lTetriminoes=[
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2+2],
      [width, width*2, width*2+1, width*2+2]
    ]

    const zTetrimonoes=[
      [0,10,11,21],
      [11,12,20,21],
      [0,10, 11, 21],
      [11,12,20,21]
    ]

    const tTertiminoes=[
      [1,10,11,12],
      [1,11,12,21],
      [10,11,12,21],
      [1,11,21,10]
    ]

    const oTetrimonoes=[
      [0,1,10,11],
      [0,1,10,11],
      [0,1,10,11],
      [0,1,10,11],
    ]

    const iTetriminoes=[
      [1,11,21,31],
      [10,11,12,13],
      [1,11,21,31],
      [10,11,12,13]
    ]


    const theTetrimonoes =[lTetriminoes, zTetrimonoes, tTertiminoes, oTetrimonoes, iTetriminoes];

    let currentPosition =2;
    let currentRotation =0;

    //select any tetriminoe randomly
    let random = Math.floor(Math.random() * theTetrimonoes.length);
    let current = theTetrimonoes[random][currentRotation];
    let nextRandom =0;

    // set time interval for tetrimino every second
    //timerId = setInterval(moveDown, 1000);


    //console.log(theTetrimonoes[0][0]);

    // draw Tetrimino

    function draw(){
      current.forEach(index =>{
        squares[currentPosition+index].classList.add('tetrimino')
      })
    }


    //undraw tetriminoe
    function undraw(){
      current.forEach(index =>{
        squares[currentPosition+index].classList.remove('tetrimino')
      })
    }

  // assign keycodes to functions
  function control(e){
      if(e.keyCode === 37){
        moveleft();
      }else if(e.keyCode === 38){
        rotate();
      }else if(e.keyCode === 39){
        moveRight();
      }else if(e.keyCode === 40){
        moveDown();
      }
  }

    document.addEventListener('keyup',control);

  //move down function for tetrimino
  function moveDown(){
      undraw();
      currentPosition += width;
      draw();
      freeze();
  }


    //freeze the tetrimino from falling
    function freeze(){
      if(current.some(index => squares[currentPosition+index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition+index].classList.add('taken'));
        // add a new fresh tetrimino
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrimonoes.length);
        current = theTetrimonoes[random][currentRotation];
        currentPosition=2;
        draw();
        displayNext();
        addScore();
        gameOver();
      }
    }

  //move tetrimino to left if there is no existing tetrimino/end of left side of grid
  function moveleft(){
      undraw();
      const isAtLeftEdge = current.some(index => (currentPosition+ index) % width === 0);
      if(!isAtLeftEdge) currentPosition -=1;

      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1;
      }
      draw();
    }

  //move tetrimino to right if there is no existing tetrimino/end of right side of grid
  function moveRight(){
      undraw();
      const isAtRightEdge = current.some(index => (currentPosition+ index) % width === width-1);
      if(!isAtRightEdge) currentPosition +=1;

      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1;
      }
      draw();
    }

  //rotate tetriminoe
  function rotate(){
    undraw();
    currentRotation ++;
    if(currentRotation === current.length){
      currentRotation =0;
    }
    current = theTetrimonoes[random][currentRotation];
    draw();
  }

  //up-next on mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth =4;
  let displayIndex=0;

  // tetrimino one unique shape to display on mini-grid
  const upNextTetriminoes =[
    [1,displayWidth+1,displayWidth*2+1,2],//lTetrimino
    [0,displayWidth,displayWidth+1,displayWidth*2+1],//zTetriminoes
    [1,displayWidth,displayWidth+1,displayWidth+2],//tTetrimino
    [0,1,displayWidth,displayWidth+1],//oTetrimino
    [1,displayWidth+1, displayWidth*2+1, displayWidth*3+1]//iTetrimino
  ]

// display next tetrimino on mini grid
  function displayNext(){
    displaySquares.forEach(square => {
      square.classList.remove('tetrimino');
    })
    upNextTetriminoes[nextRandom].forEach(index => {
      displaySquares[displayIndex+index].classList.add('tetrimino');
    })
  }

  //add logic to start/stop StartButton
  startButton.addEventListener('click', () => {
    if(timerId){
      clearInterval(timerId);
      timerId = null;
    }else{
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrimonoes.length);
      displayNext();
    }
  }
)


//add score
 function addScore(){
   for(let i=0; i<199; i+=width) {
     const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
     if(row.every(index => squares[index].classList.contains('taken'))){
       score +=10;
       scoreDisplay.innerHTML = score;
       row.forEach(index => {
         squares[index].classList.remove('taken')
         squares[index].classList.remove('tetrimino')
       });
       const squaresRemoved = squares.splice(i, width);
       squares = squaresRemoved.concat(squares);
       squares.forEach(cell=> grid.appendChild(cell));
     }

   }
 }

 //game over logic
  function gameOver(){
    if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
      scoreDisplay.innerHTML = 'END';
      clearInterval(timerId);
    }
  }

  }
  )
