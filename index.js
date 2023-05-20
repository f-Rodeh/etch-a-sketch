const buttons       = document.querySelector('.buttons');
const center        = document.querySelector('.center');
const newGridButton = document.querySelector('.new-grid-button');
const clearButton   = document.querySelector('.clear-button');
const gridInfo      = document.querySelector('.grid-info');
const checkRandomColor = document.querySelector('.check-random-color');
const px            = document.createElement('div');
px.classList.add('pixel')

generateGrid( 16 , 32 );

newGridButton.addEventListener('click', () => {
  let columns = prompt('Specify the width of the new grid', 32);
  let rows = Math.floor( columns / 2 );
  if ( columns && columns < 101 ) {
    deleteGrid();
    generateGrid( rows, columns )
  }
})

function randomColor() {
  let hue = Math.random() * 360;
    hue = Math.floor(hue);
  let saturation = Math.random() * 100;
    saturation = Math.floor(saturation);
  let light = Math.random() * 100;
    light = Math.floor(light);
  return {
    px: `hsl(${hue},${saturation}%,${light}%)`,
    border: `hsl(${hue},${saturation}%,${light -10}%)`
  }
}

clearButton.addEventListener('click', (e) => {
  clearButton.classList.add('clicked')
  resetGrid();
});

clearButton.addEventListener('transitionend', (e) => {
  clearButton.classList.remove('clicked')
});

function paintPixel( target ){  
  let borderColor = 'hsl(207, 22%, 10%)';
  let pxColor = 'hsl(210, 30%, 5%)';

  if(checkRandomColor.checked){
    let color = randomColor();
    pxColor = color.px;
    borderColor = color.border;
  } else {
    borderColor = 'hsl(207, 22%, 10%)';
    pxColor = 'hsl(210, 30%, 5%)';
  }

  target.style.borderColor = borderColor;
  target.style.backgroundColor = pxColor;
}

function generateGrid( numberOfRows, numberOfColumns ) {
  const canvas = document.createElement('div');
    canvas.classList.add('canvas');
    center.insertBefore(canvas, buttons);

  const column = document.createElement('div');
    column.classList.add('column');

   gridInfo.textContent = 'Current grid: ' 
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
    item.style.backgroundColor = 'hsl(30, 30%, 96%)';
    item.style.borderColor = 'hsl(30, 30%, 93%)';
  })
}