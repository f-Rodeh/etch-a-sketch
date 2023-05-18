// access the container div
const container = document.querySelector('.grid-container');

// create a div that represents a pixel
const px = document.createElement('div');
px.classList.add('pixel')
//px.addEventListener('click', () => console.log('hey'))

generateGrid( 16 , 16 );

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
