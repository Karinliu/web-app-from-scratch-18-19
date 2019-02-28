'use strict';
(function() {

    const router = {
        init: function() {
            routie({
                '': function() {
                    router.overviewPage();
                },
                'detail/:id': function() {
                    router.detailPage();
                }
            });
        },
        overviewPage: function() {
            sections.toggle(sections.showLoader); //Start loader
            api.getData(api.overViewUrl)
                .then(data => {
                    sections.toggle(sections.showMain); //End loader + Show main
                    render.createElements(data); //Render createElements
                    console.log('data is home');
                })
                .catch(error => {
                    sections.toggle(sections.showError);
                });
        },
        detailPage: function() {
            sections.toggle(sections.showLoader); //Start loader
            api.getData(api.overViewUrl) //End loader + show detail
                .then(data => {
                    sections.toggle(sections.showDetail);
                    render.createDetailElements(data);
                    console.log('data is detail');
                })
                .catch(error => {
                    sections.toggle(sections.showError);
                });
        }
    };

    const sections = {
        showMain: document.getElementById("home"), // Get sections element Home and return.
        showDetail: document.getElementById("detail"), // Get sections element Detail and return.
        showLoader: document.getElementById("loader"), // Get sections element Loader and return.
        showError: document.getElementById("error"), // Get sections element Error and return.
        toggle: function(element) {
            sections.showMain.classList.add('hidden');      // Set hidden
            sections.showLoader.classList.add('hidden');    // Set hidden
            sections.showDetail.classList.add('hidden');    // Set hidden
            sections.showError.classList.add('hidden');     // Set hidden

            element.classList.toggle("hidden"); //When one of the sections is clicked, take off the class hidden.
        }
    };

    const api = {
        overViewUrl: 'https://ghibliapi.herokuapp.com/films/', //Get api and return.
        getData: function(overview) {
            return new Promise(function(resolve, reject) { //return Promise.

                const request = new XMLHttpRequest();
                request.open('GET', api.overViewUrl, true) //get request from url.

                request.onload = () => {
                    if (request.status >= 200 && request.status < 400) { // if status is higher than 200 and status is lower than 400 perform function.
                        const data = api.parseData(request); //Fetch data from API into JavaScript file.
                        resolve(data); // "resolve" the function createElements & createDetailElements.
                        localstorageData.localData(data); //Store data in localstorage.

                    } else { // If not then performs this function
                        reject(error); // error
                    }
                };
                request.onerror = () => {
                    reject(error) // Connextion error.
                };
                request.send();
            });
        },
        parseData: function(request) {
            return JSON.parse(request.responseText);
        }
    };


    const localstorageData = {
        handle: function() {
            let getLocalstorageData = localStorage.getItem('film');
            getLocalstorageData = JSON.parse(getLocalstorageData);

            if (getLocalstorageData) { //If localData has data then use this data and do the following things:
                sections.toggle(sections.showMain);
                render.createElements(getLocalstorageData);

            } else { //If localstorage is empty, do a get request.
                router.init()
            }
        },
        localData: function(data) {
            const saveLocalData = [];

            data.map(films => { // Map is used to get only an array that contains the title and descriptions of the data from each film.
                const localElements = { // create elements for the class and div's.
                    id: films.id,
                    title: films.title,
                    description: films.description,
                    director: films.director,
                    producer: films.producer,
                    release_date: films.release_date,
                    rt_score: films.rt_score
                };
                saveLocalData.push(localElements);
            })

            window.localStorage.setItem('film', JSON.stringify(saveLocalData)); //Set title and description in localStorage.
        }
    };

    const render = {
        // Trying transparency template
        createElements: function(data) {
            const template = document.getElementById('main');
            const saveData = [];

            data.map(films => { // Map is used to get only an array that contains the title and descriptions of the data from each film.
                    const templateElements = { // create elements for the class and div's.
                        title: films.title,
                        description: films.description,
                    };
                    saveData.push(templateElements);
                    // console.log(films.title);
                })
                // Transparency.render(template, saveData);

            const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
                link: {
                    href() {
                        return "#detail/" + this.id;
                    }
                }
            }
            Transparency.render(template, data, directives, saveData);
        },
        createDetailElements: function(data) {
            const template = document.getElementById('main'); //Get element main.
            const saveDetailData = []; //Save the detail elements in this array.
            const currentUrl = document.URL; //Get current url from document
            const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.

            const filmId = data.filter(films => {
                return films.id === id; //if data id is same as id from url return true.
            });
            filmId.map(filmId => { //when true return this data
                const templateDetailElements = { // create elements for the class and div's.
                    title: filmId.title,
                    description: filmId.description,
                    director: 'Director: ' + filmId.director,
                    producer: 'Producer: ' + filmId.producer,
                    release_date: 'Releasedata: ' + filmId.release_date,
                    rt_score: 'Average ratescore: ' + filmId.rt_score
                };
                saveDetailData.push(templateDetailElements);
            })
            Transparency.render(template, saveDetailData);
        }
    }
    router.init();
})();

// Reference filter, map and reduce: https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
// Reference routie: https://github.com/jgallen23/routie/blob/master/test/routie.test.js
// Reference transparency template: https://github.com/leonidas/transparency/
// Reference promise: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML