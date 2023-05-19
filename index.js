const buttons       = document.querySelector('.buttons');
const center        = document.querySelector('.center');
const newGridButton = document.querySelector('.new-grid-button');
const clearButton   = document.querySelector('.clear-button');
const label         = document.querySelector('.label');
const px            = document.createElement('div');
px.classList.add('pixel')

generateGrid( 16 , 32 );

newGridButton.addEventListener('click', () => {
  let columns = prompt('Define the size of the new grid', 32);
  let rows = Math.floor( columns / 2 );
  if ( columns && columns < 101 ) {
    deleteGrid();
    generateGrid( rows, columns )
  }
})

clearButton.addEventListener('click', (e) => {
  clearButton.classList.add('clicked')
  resetGrid();
});

clearButton.addEventListener('transitionend', (e) => {
  clearButton.classList.remove('clicked')
});




function paintPixel( target ){
  if ( target.classList.contains('painted') ){
    return;
  } 
  target.classList.add('painted')
}

function generateGrid( numberOfRows, numberOfColumns ) {
  const canvas = document.createElement('div');
    canvas.classList.add('canvas');
    center.insertBefore(canvas, buttons);

  const column = document.createElement('div');
    column.classList.add('column');

  label.textContent = 'Current grid: ' 
    + numberOfColumns + ' x ' + numberOfRows;

  // append pixels to the column
  for (let i = 0; i < numberOfRows; i++) {
    const newPx = px.cloneNode(true)
    column.append(newPx);
  }

  // append the columns to the canvas
  for (let i = 0; i < numberOfColumns; i++) {
    const newRow = column.cloneNode(true)
    canvas.appendChild(newRow);
  }

  addPixelListeners();
}

function deleteGrid() {
  document.querySelector('.canvas').remove();
}

function addPixelListeners() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseenter', function (e) {
      paintPixel(e.target);
    })
  })
}

function resetGrid() {
  const columns = document.querySelectorAll('.column');
  const totalTimeMs = 1400; 
  const intervalTime = totalTimeMs / columns.length;
  
  let i = 0;
  let interval = setInterval(() => {
    let column = columns[i];
    if (i === columns.length-1){
      clearInterval(interval)
    }
    unpaint(column.childNodes)
    i++
  }, intervalTime)
}

function unpaint(list){
  list.forEach(item => {
    item.classList.remove('painted');
  })
}