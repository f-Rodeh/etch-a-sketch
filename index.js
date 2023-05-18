// access the container div
const container = document.querySelector('.grid-container');

// create a div that represents a pixel
const px = document.createElement('div');
px.classList.add('pixel')

generateGrid( 16 , 16 );

// listen to mouse enter event on the pixels
const pixels = document.querySelectorAll('.pixel');
pixels.forEach(( pixel ) => {
  pixel.addEventListener( 'mouseenter', function (e) {
    console.log( e.target.classList );
    paintPixel( e.target );
  })
})


function paintPixel( target ){
  if ( target.classList.contains('painted') ){
    return;
  } 

  target.classList.add('painted')
  console.log('paint');
}

function generateGrid( numberOfRows, numberOfColumns ) {

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
}
