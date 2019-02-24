'use strict';
(function() {

    const router = {
        // overview: function() {
        //   api.getData(api.overViewUrl)
        //     .then(data => {
        //       routie('/', () => {
        //         render.createElements(data)
        //         console.log('data is home')
        //       })
        //     });
        //   routie('/')
        // },
        // detail: function(id) {
        //   api.getData(api.overViewUrl + `${id}`)
        //     .then(data => {
        //       routie('/detail:id', (id) => {
        //         // render.createDetailElements(data)
        //         console.log('data is home')
        //         window.location.hash = '/:id';
        //       })
        //     });  
        // }
        overview: function() {
            routie({
                '': function() {
                    api.getData(api.overViewUrl)
                        .then(data => {
                            sections.showMain();
                            render.createElements(data)
                            console.log('data is home')
                        });
                },
                'detail/:id': function(id) {
                    api.getData(api.overViewUrl + `${id}`)
                        .then(data => {
                            console.log('data is detail')
                            console.log(api.overViewUrl + `${id}`)
                            sections.showDetail();
                            sections.toggle("#detail")
                                // window.location.hash = `detail/${id}`;
                            render.createDetailElements(data)
                        });
                }
            })
        }
    };

    const sections = {
        // Hide detail the sections
        showMain: function() {
            const home = document.getElementById("home");
            const detail = document.getElementById("detail");

            home.classList.remove("hidden")
            detail.classList.add("hidden")
        },
        // Hide main section
        showDetail: function() {
            const home = document.getElementById("home");
            const detail = document.getElementById("detail");

            home.classList.add("hidden")
            detail.classList.remove("hidden")
        },
        toggle: function(route) {
            const sections = document.querySelectorAll("section"); // select all sections from html
            const currentSection = document.querySelector(route); // The current section element what is clicked.
            sections.forEach(function(el) {
                el.classList.add("hidden")
                currentSection.classList.remove("hidden")
            })
        }
    }

    const api = {
        overViewUrl: 'https://ghibliapi.herokuapp.com/films/', //Get api
        getData: function(overview) {
            return new Promise(function(resolve, reject) { //return Promise

                const request = new XMLHttpRequest();
                request.open('GET', api.overViewUrl, true) //get request from url

                request.onload = () => {
                    if (request.status >= 200 && request.status < 400) { // if status is higher than 200 and status is lower than 400 perform function.
                        const data = api.parseData(request); //Fetch data from API into JavaScript file
                        resolve(data); // "resolve" the function createElements
                        // console.log(data)
                    } else { // if not then performs this function
                        reject(error); // error
                    }
                };
                request.onerror = () => {
                    reject(error) // connextion error
                };
                request.send();
            });
        },
        parseData: function(request) {
            return JSON.parse(request.responseText);
        }
    }

    const render = {
        // Trying transparency template
        createElements: function(data) {
            const template = document.getElementById('main');
            const saveData = [];

            data.map(films => {  // Map is used to get only an array that contains the title and descriptions of the data from each film.
                const templateElements = { // create elements for the class and div's.
                    title: films.title,
                    description: films.description,
                };
                saveData.push(templateElements)
                    // console.log(films.title);
            })
            Transparency.render(template, saveData);

            // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
            const directives = {
                link: {
                    href: function(params) {
                        return "#detail/" + this.id;
                    }
                }
            }
            Transparency.render(template, data, directives);
        },
        createDetailElements: function(data) {
            const template = document.getElementById('main');
            // make DOM empty and reset it to the first state
            // while (template.firstChild) {
            //     template.removeChild(template.firstChild);
            // };
            const saveDetailData = [];              //Save the detail elements in this array.
            const currentUrl = document.URL;        //Get current url from document
            const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);       //Take out the id from url.
            
            // console.log(data.id)
            const filmId = data.filter(films => {
                // console.log(films.id === id);
                // console.log('current id is'+id)
              return films.id === id;           //if data id is same as id from url return true.
            });
            filmId.map(filmId => {          //when true return this data
                const templateDetailElements = { // create elements for the class and div's.
                    title: filmId.title,
                    description: filmId.description,
                    director: filmId.director,
                    producer: filmId.producer,
                    releasedate: filmId.releasedate,
                    ratescore: filmId.ratescore
                };
                saveDetailData.push(templateDetailElements)                    
                    // console.log(saveData)
            })
            Transparency.render(template, saveDetailData);
        }
    };
    router.overview();
})();

// Reference routie: https://github.com/jgallen23/routie/blob/master/test/routie.test.js
// Reference transparency template: https://github.com/leonidas/transparency/
// Reference promise: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML