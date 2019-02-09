// make variables
const url = 'https://ghibliapi.herokuapp.com/films';
const main = document.querySelector('main');

// set request for url api
const requestFilms = new Request(url, {
    method:'get',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
});

fetch(requestFilms).then(films => {
  // load data with json response.
    return films.json();
  }).then(data => {
    //render data in function createElement
    createElements(data);
  }).catch(err => {
    // when there is an error.
    // console.log(error);
  });

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

// Reference fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
