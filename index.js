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

clearButton.addEventListener('click', resetGrid);

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

  const row = document.createElement('div');
    row.classList.add('row');

  label.textContent = 'Current grid: ' 
    + numberOfColumns + ' x ' + numberOfRows;

  // append pixels to the row
  for (let i = 0; i < numberOfColumns; i++) {
    const newPx = px.cloneNode(true)
    row.append(newPx);
  }

  // append the rows to the canvas
  for (let i = 0; i < numberOfRows; i++) {
    const newRow = row.cloneNode(true)
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
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => clearRow(row));
}

function clearRow(row){
  const pixels = row.childNodes
  const totalTimeMs = 1400; 
  const intervalTime = totalTimeMs / pixels.length;
  
  let i = 0;
  let interval = setInterval(() => {
    let pixel = pixels[i];
    if (i === pixels.length-1){
      clearInterval(interval)
    }
    pixel.classList.remove('painted');
    i++
  }, intervalTime)
}