const buttons = document.querySelector('.buttons');
const body = document.querySelector('.center');
const newGridButton = document.querySelector('.new-grid-button');
const clearButton = document.querySelector('.clear-button');
const px = document.createElement('div');
const label = document.querySelector('.label');
px.classList.add('pixel')

newGridButton.addEventListener('click', () => {
  let columns = prompt('Define the size of the new grid', 32);
  let rows = Math.floor( columns / 2 );
  if ( columns && columns < 101 ) {
    deleteGrid();
    generateGrid( rows, columns )
  }
})

clearButton.addEventListener('click', resetGrid);

generateGrid( 16 , 32 );

function paintPixel( target ){
  if ( target.classList.contains('painted') ){
    return;
  } 

  target.classList.add('painted')
}

function generateGrid( numberOfRows, numberOfColumns ) {
  label.textContent = 'Current grid: ' 
    + numberOfColumns + ' x ' + numberOfRows;
  const container = document.createElement('div');
  container.classList.add('grid-container');
  body.insertBefore(container, buttons);

  // create a row div that contains numberOfColumns pixels
  const row = document.createElement('div');
  row.classList.add('row')
  for (let i = 0; i < numberOfColumns; i++) {
    const newPx = px.cloneNode(true)
    row.append(newPx);
  }

  // append the row div inside the container numberOfRows times
  for (let i = 0; i < numberOfRows; i++) {
    const newRow = row.cloneNode(true)
    container.appendChild(newRow);
  }

  addPixelListeners();
}

function deleteGrid() {
  document.querySelector('.grid-container').remove();
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