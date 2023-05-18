// access the container div
const container = document.querySelector('.grid-container');

generateGrid( 16 , 16 );

function generateGrid( numberOfRows, numberOfColumns ) {

  // create a div that represents a pixel
  const px = document.createElement('div');

  // create a row div that contains numberOfColumns pixels
  const row = document.createElement('div');
  for (let i = 0; i < numberOfColumns; i++) {
    console.log('appending px to row')
    row.appendChild(px)
  }

  // append the row div inside the container numberOfRows times
  for (let i = 0; i < numberOfRows; i++) {
    console.log('appending row to container');
    container.appendChild(row);
  }
}
