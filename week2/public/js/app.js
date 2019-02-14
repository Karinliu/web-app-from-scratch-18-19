'use strict';
(function(){

  const router = {
    overview: function () {
      api.getData(api.overViewUrl)
      .then(data => { routie('/', () => {
        render.createElements(data)
        console.log('data is home')
      })
    });
    routie('/')

  },
    detail: function () {
    api.getData(api.overViewUrl)
    .then(data => { routie('detail', () => {
      render.createElements(data)
      console.log('data is detail')
      window.location.hash = 'detail';
      })
    });
    // window.routie('detail')
    window.location.hash = 'detail';
    }
  };

  const api = {
    overViewUrl: 'https://ghibliapi.herokuapp.com/films',   //Get api
    getData: function(overview){
      return new Promise(function(resolve, reject) {  //return Promise
        const request = new XMLHttpRequest();
        request.open('GET', api.overViewUrl, true)      //get request from url
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {    // if status is higher than 200 and status is lower than 400 perform function.
            const data = api.parseData(request);    //Fetch data from API into JavaScript file
            console.log(data)
            resolve(data);    // "resolve" the function createElements
          }
          else {  // if not then performs this function
            reject(error);    // error
          }
        };
        request.onerror = () => {
          reject(error)   // connextion error
        };
        request.send();
      });
    },
    // fetchData: function(){
    //   return new Promise(function(resolve, reject){
    //   fetch(api.overViewUrl).then(films => {
    //     // load data with json response.
    //       return data.json();
    //     }).catch(err => {
    //       // when there is an error.
    //       // console.log(error);
    //     });
    // });
    // },
    parseData: function(request){
      return JSON.parse(request.responseText);
    }
  }

  const render = {   // Rendering data
    createElements: function(data){
      const template = document.querySelector('.template');
      data.forEach(films => {
        const templateElements = {   // create elements for the class and div's.
          title: films.title,
          description:  films.description,
          director: films.director,
          producer: films.producer,
          releasedate: films.releasedate,
          ratescore: films.ratescore
        };
        console.log(films.title)
        Transparency.render(template, templateElements);
     });
    }
  }
  router.overview() + router.detail();
  })();

// Reference transparency template: https://github.com/leonidas/transparency/
// Reference promise: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Reference templates: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
// Reference adjacentHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
