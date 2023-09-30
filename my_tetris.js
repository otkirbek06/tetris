function one(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
  
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }
  function two() {
    const twoseq = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  
    while (twoseq.length) {
      const runnn = one(0, twoseq.length - 1);
      const tetrisname = twoseq.splice(runnn, 1)[0];
      tetrominotwoseq.push(tetrisname);
    }
  }
  
  function three() {
    if (tetrominotwoseq.length === 0) {
      two();
    }
  
    const tetrisname = tetrominotwoseq.pop();
    const tetriesmat = tetrominos[tetrisname];
  
    const colums = tetrisfield[0].length / 2 - Math.ceil(tetriesmat[0].length / 2);
  
    const qator = tetrisname === 'I' ? -1 : -2;
  
    return {
      tetrisname: tetrisname,      
      tetriesmat: tetriesmat,  
      qator: qator,        
      colums: colums        
    };
  }
  
  function aylana(tetriesmat) {
    const nima = tetriesmat.length - 1;
    const result = tetriesmat.map((qator, i) =>
    qator.map((val, j) => tetriesmat[nima - j][i])
    );
  
    return result;
  }
  
  function isValidMove(tetriesmat, cellRow, cellCol) {
    for (let qator = 0; qator < tetriesmat.length; qator++) {
      for (let colums = 0; colums < tetriesmat[qator].length; colums++) {
        if (tetriesmat[qator][colums] && (
            cellCol + colums < 0 ||
            cellCol + colums >= tetrisfield[0].length ||
            cellRow + qator >= tetrisfield.length ||
            tetrisfield[cellRow + qator][cellCol + colums])
          ) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function placeTetromino() {
    for (let qator = 0; qator < tetromino.tetriesmat.length; qator++) {
      for (let colums = 0; colums < tetromino.tetriesmat[qator].length; colums++) {
        if (tetromino.tetriesmat[qator][colums]) {
  
          if (tetromino.qator + qator < 0) {
            return showGameOver();
          }
  
          tetrisfield[tetromino.qator + qator][tetromino.colums + colums] = tetromino.tetrisname;
        }
      }
    }
  
    for (let qator = tetrisfield.length - 1; qator >= 0; ) {
      if (tetrisfield[qator].every(cell => !!cell)) {
  
        for (let r = qator; r >= 0; r--) {
          for (let c = 0; c < tetrisfield[r].length; c++) {
            tetrisfield[r][c] = tetrisfield[r-1][c];
          }
        }
      }
      else {
        qator--;
      }
    }
  
    tetromino = three();
  }
  
  function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
  
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
  }
  
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  const grid = 32;
  const tetrominotwoseq = [];
  
  const tetrisfield = [];
  
  for (let qator = -2; qator < 20; qator++) {
    tetrisfield[qator] = [];
  
    for (let colums = 0; colums < 10; colums++) {
      tetrisfield[qator][colums] = 0;
    }
  }
  
  const tetrominos = {
    'I': [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'S': [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };
  
  const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
  };
  
  let count = 0;
  let tetromino = three();
  let rAF = null;  
  let gameOver = false;
  
  function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
  
    for (let qator = 0; qator < 20; qator++) {
      for (let colums = 0; colums < 10; colums++) {
        if (tetrisfield[qator][colums]) {
          const tetrisname = tetrisfield[qator][colums];
          context.fillStyle = colors[tetrisname];
  
          context.fillRect(colums * grid, qator * grid, grid-1, grid-1);
        }
      }
    }
  
    if (tetromino) {
  
      if (++count > 35) {
        tetromino.qator++;
        count = 0;
  
        if (!isValidMove(tetromino.tetriesmat, tetromino.qator, tetromino.colums)) {
          tetromino.qator--;
          placeTetromino();
        }
      }
  
      context.fillStyle = colors[tetromino.tetrisname];
  
      for (let qator = 0; qator < tetromino.tetriesmat.length; qator++) {
        for (let colums = 0; colums < tetromino.tetriesmat[qator].length; colums++) {
          if (tetromino.tetriesmat[qator][colums]) {
  
            context.fillRect((tetromino.colums + colums) * grid, (tetromino.qator + qator) * grid, grid-1, grid-1);
          }
        }
      }
    }
  }
  
  document.addEventListener('keydown', function(e) {
    if (gameOver) return;
  
    if (e.which === 37 || e.which === 39) {
      const colums = e.which === 37
        ? tetromino.colums - 1
        : tetromino.colums + 1;
  
      if (isValidMove(tetromino.tetriesmat, tetromino.qator, colums)) {
        tetromino.colums = colums;
      }
    }
  
    if (e.which === 38) {
      const tetriesmat = aylana(tetromino.tetriesmat);
      if (isValidMove(tetriesmat, tetromino.qator, tetromino.colums)) {
        tetromino.tetriesmat = tetriesmat;
      }
    }
  
    if(e.which === 40) {
      const qator = tetromino.qator + 1;
  
      if (!isValidMove(tetromino.tetriesmat, qator, tetromino.colums)) {
        tetromino.qator = qator - 1;
  
        placeTetromino();
        return;
      }
  
      tetromino.qator = qator;
    }
  });
  
  rAF = requestAnimationFrame(loop);