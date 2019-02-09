const request = new XMLHttpRequest();
const url = 'https://ghibliapi.herokuapp.com/films';
const main = document.querySelector('main');

request.open('GET', url, true);

//load in function fetchData
request.onload = (fetchData);

request.send();

//Fetch data from API into JavaScript file
function fetchData() {
  const data = JSON.parse(this.response);
    console.log(data)
    // makeElements(data)
    createElements(data)

 }
 // Create elements and append it.
 // function createElements(data){
 //   data.forEach(films => {
 //   // Log each film title
 //   // console.log(films.title);
 //   const section = document.createElement('section')   //create in html the element section <section> </section>
 //   const h1 = document.createElement('h1');           //create in the html the element <h1> </h>
 //   const p = document.createElement('p')             //create in the html the element <p> </p>
 //   const title = document.createTextNode(films.title);    //grap from the api all elements from title
 //   const description = document.createTextNode(films.description); //grap from the api all elements from description
 //   main.append(section);          //push the created section element into main. -> <main> <section> </section> </main>
 //   section.append(h1, p);         // push element h1 and p into section  -> <main> <section><h1></h> <p></p></section> </main
 //   h1.append(title);              // the created h1 element place the api title in -> <h> title from the api </h>
 //   p.append(description)          // the created p element place the api description in -> <p> description from the api</p>
 // });
 // }

// Or create elements and insert it in HTML
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

 //  Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
 // Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
