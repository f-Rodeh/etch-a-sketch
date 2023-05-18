const buttons = document.querySelector('.buttons');
const body = document.querySelector('body');
const newGridButton = document.querySelector('.new-grid-button');
const clearButton = document.querySelector('.clear-button');
const px = document.createElement('div');
px.classList.add('pixel')

newGridButton.addEventListener('click', () => {
  let size = prompt('Define the size of the new grid', 16);
  if ( size && size < 101 ) {
    deleteGrid();
    generateGrid( size, size )
  }
})

clearButton.addEventListener('click', resetGrid);

generateGrid( 16 , 16 );

function paintPixel( target ){
  if ( target.classList.contains('painted') ){
    return;
  } 

  target.classList.add('painted')
}

function generateGrid( numberOfRows, numberOfColumns ) {
  const container = document.createElement('div');
  container.classList.add('grid-container');
  body.insertBefore(container, buttons);

  // create a row div that contains numberOfColumns pixels
  const row = document.createElement('div');
  row.classList.add('row')
  for (let i = 0; i < numberOfColumns; i++) {
    console.log('appending px to row')
    const newPx = px.cloneNode(true)
    row.append(newPx);
  }

  // append the row div inside the container numberOfRows times
  for (let i = 0; i < numberOfRows; i++) {
    console.log('appending row to container');
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
  const painted = document.querySelectorAll('.painted');
  painted.forEach( pixel => {
    pixel.classList.remove('painted');
  })
}