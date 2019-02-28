## My app and the purpose of the app
The app shows you a list of all the Studio Ghibli films. The first thing you will see on the home page is a list of titles. When you go over the cards with your mouse, a short descriptions of the film will be shown.

If you click on a title you can find more information about the film.

<img width="1000" alt="screenshot 2019-02-07 23 00 09" src="https://user-images.githubusercontent.com/32538678/52446159-76e8c600-2b2d-11e9-8040-b8439e9603e4.png">

### See here under the link to the live preview
https://karinliu.github.io/web-app-from-scratch-18-19/week2/

## Actor diagram
See below the functions that the application contains and what the actors are. The functions and the code will be explained later in the readme.

<details><summary>Old actor diagram</summary>
<p>

![actor_diagram-03](https://user-images.githubusercontent.com/32538678/52816073-b0c34a80-30a0-11e9-92b6-32298b8c012b.png)

</p>
</details>
<details><summary>New actor diagram</summary>
<p>

![diagram-02](https://user-images.githubusercontent.com/32538678/53598240-7aa7bf80-3ba4-11e9-92e9-ae894bca59a3.png)


</p>
</details>


## API I have used
The API that I have used is `Ghibliapi` see [here](https://ghibliapi.herokuapp.com/films) the link. This API contains a list of all the films from Studio Ghibli.

### Rate limit of the API
The advantages of the api is that you can retrieve a lot of information for your app. For example:
* The director
* Producer
* Release date 
* Description
* Film title

The rate limits of this API is that you do not have trailers or images that can be retrieved. As a result text will only be  shown to the user

## Interaction diagram
Before I explain the code, I will first draw the interaction diagram how the user can use the application. Later in the readme de interactions will be explained.

<details><summary>Old interaction diagram</summary>
<p>

![data_found-03](https://user-images.githubusercontent.com/32538678/52822391-da38a200-30b1-11e9-839d-5e88e8780a48.png)

</p>
</details>
<details><summary>New interaction diagram</summary>
<p>

![diagram-01](https://user-images.githubusercontent.com/32538678/53598239-7aa7bf80-3ba4-11e9-8e64-4d4491f8d892.png)

</p>
</details>

## How my app works
During the development of the app there are different ways in which you can write a function to render the API.

### Methods for an API
When writing the JavaScript code, I have applied three ways for calling the API. To see this examples u can go to `week 1` and look into the Javascript map.

##### XMLHttpRequest
Use `XMLHttpRequest`(XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. For more information about `XHR` you can read here about using it:
[Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/appxml.js) my example of an `XHR`.

##### Promise
A Promise is an object representing the eventual completion or failure of an asynchronous operation. For more information about `Promise` you can read here about using it:
[Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/apppromise.js) my example of an `Promise`.

##### Fetch
Fetch provides a generic definition of Request and Response objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your own responses programmatically. For more information about `Fetch` you can read here about using it:
[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/appxml.js) my example of an `Fetch`.

## What did I use?
For getting the data from the `Ghibliapi` API, I have used promise for writing the code.

##### Routie
To retrieve pages I used [Routie](https://github.com/jgallen23/routie). Routie is a javascript hash routing library. 

[Here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/public/js/app.js#L4-L26) in my Javascript file i have used `Routie`.

By using the following you can retrieve the home page and the detail page.

```
routie({
        '': function() {
                sections.toggle(sections.showMain); 
                render.createElements(data); 
                console.log('Page is home');
        },
        'detail/:id': function() {
                sections.toggle(sections.showDetail);   
                render.createDetailElements(data);
                console.log('Page is detail');
        }
});
```

To see the exact code above you can find it here: [Example routie](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/c21b2223af990a7fe93ba4e23df832439113dff8/week2/public/js/app.js#L8-L22)

##### Template Transparency
By loading in the data from the API, I have used a template engine named [Transparency](https://github.com/leonidas/transparency/). Transparency is a client-side template engine which binds data to DOM.

For rendering data in the `html` file you have to add classes and id's in to your file. For [example](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/c21b2223af990a7fe93ba4e23df832439113dff8/week2/index.html#L31-L38) what I have:
```
<a href="#detail">
      <section class="template">
        <h1 class="title"></h1>
        <p class="description"></p>
        <p class="director"></p>
        <p class="producer"></p>
        <p class="releasedate"></p>
        <p class="ratescore"></p>
      </section>
</a>

```
After you added classes and id's into your file you can combine it with the data function in your Javascript file. Like [this](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/c21b2223af990a7fe93ba4e23df832439113dff8/week2/public/js/app.js#L137-L156):

```
const template = document.getElementById('main'); 
const saveDetailData = []; 
const currentUrl = document.URL; 
const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); 

const filmId = data.filter(films => {
        return films.id === id; 
});
filmId.map(filmId => { 
        const templateDetailElements = { 
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
```
By calling `.render()` the data will be loaded in into the template.

## Filter, map, reduce
In the example above u see that I used filter and reduce. But what are these functions for? Before I tell you what these two functions are , I will first tell you some about the code above.

This part of the code:

```
const currentUrl = document.URL; 
const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); 
```

The `const currentURL` will get the current url from document of your page. and this part `const id` Takes out the id from url.

So when de id is retrieved from the current url, I use `Filter` for filtering the `id` from the api JSON document. In filter I say: *if data id is same as id from url return true, if not then false*. And with `map` I say: when filter returned true, then get all the data from that array id. Simple right?


If you want to read more about the function `filter, map and reduce` I recommend you to read this article:[Reference filter, map and reduce](https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d).


## LocalStorage
Other function what I have added into this application is a `localstorage`. When my API make his first get request to parse data to my application, I [said](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/c21b2223af990a7fe93ba4e23df832439113dff8/week2/public/js/app.js#L107): 
```
window.localStorage.setItem('film', JSON.stringify(saveLocalData));
```

What this means is when my application made a request with the api, save the following data in localStorage with the name `film`.

#### So?
The reason why I save the data in localstorage. The reason why is because my application does not need to do a get request every time the user returns to the `homepage`.

So what did I do? I wrote a function that says: Go to `localstorage` with the label `film`. When there is data in localstorage parse it to a JSON file and store it back into localstorage. 

And with an `if/else` statement I said: If there is data in localstorage, yes? use that! if not, do a get request with the api!

See [below](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/c21b2223af990a7fe93ba4e23df832439113dff8/week2/public/js/app.js#L70-L89) the handle function:

```
handleData: function() {
            let getLocalstorageData = localStorage.getItem('film');
            getLocalstorageData = JSON.parse(getLocalstorageData);

            if (getLocalstorageData) { //If localData has data then use this data and do the following things:
                sections.toggle(sections.showLoader);
                router.routes(getLocalstorageData);     //Give localstorageData to route.routes.
                console.log('Data is from localstorage');

            } else { //If localstorage is empty, do a get request.
                sections.toggle(sections.showLoader);
                api.getData(api.overViewUrl) //End loader + show detail
                    .then(data => {
                        router.routes(data);
                    })
                    .catch(error => {
                        sections.toggle(sections.showError);
                    });
                console.log('Data is from API');
            }
}            
```

## Design patterns and best practices
By creating the application there were some requirement (best practices) what we can't do for writing Vanilla javascript. For example no global variables and use an IIFE.

Instead by using no global variables, I used `object literals` in my application. If u look into my code u can see that all my functions are placed inside a const variable.

See here my code: [Example object literals](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week2/public/js/app.js)

## Feature wishlist / backlog
The feature wishlist that I would like to use for in my application is to add a filter function where the user can filter on movies (for example on title or director). Another function that I would really like to build into my application is an sort function, so the user can sort on alphabet.

Personally, I also think that the application may be better styled.

### What do I miss in the API
What I find very unfortunate about the API is that it does not contains images or trailers. Personally I would  like to see images than only just text when I look up a movie. :)


#### See the project
To see the project you can download or clone this document with the following command: 

```
git clone https://github.com/Karinliu/web-app-from-scratch-18-19.git

cd web-app-from-scratch-18-19/week2
```

