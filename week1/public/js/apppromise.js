'use strict';
(function(){

  // make variables
  const request = new XMLHttpRequest();
  const url = 'https://ghibliapi.herokuapp.com/films';
  const main = document.querySelector('main');

  // Creating a promise
  const loadData = new Promise(function(resolve, reject){

    request.open('GET', url, true)
    request.onload = () => {
      // if status is higher than 200 and status is lower than 400 perform function.
      if (request.status >= 200 && request.status < 400) {
        //Fetch data from API into JavaScript file
        const data = JSON.parse(request.responseText);
        // "resolve" the function createElements
        resolve(createElements(data));
      }
      // if not then performs this function
      else {
        // error
        reject(error);
      }
    };
    request.onerror = () => {
      // connextion error
      reject(error)
    };

    request.send();

  });

  // Create elements for rendering data
  function createElements(data){

    data.forEach(films => {
      const newElement =
      `
      <section>
         <h1>${films.title}</h1>
         <p>${films.description}</p>
      </section>
     `
     // to create a Template literal u have to start and end with using: ``
     // For inserting data in to the correct place we using placeholders. To create a placeholder u have to use dollar
     // signs and accolades example:  ${expression}
     main.insertAdjacentHTML( 'beforeend', newElement ) //'beforeend' -> push the created just inside the main element
     });
  }
})();

// Reference promise: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
