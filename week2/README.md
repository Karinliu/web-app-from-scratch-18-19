### Week 2 - Design and Refactor 🛠

## My app and the purpose of the app
The app shows you a list of all the Studio Ghibli films. The first thing you will see on the home page is a list of titles. When you go over the cards with your mouse, a short descriptions of the film will be shown.

If you click on a title you can find more information about the film.

<img width="1000" alt="screenshot 2019-02-07 23 00 09" src="https://user-images.githubusercontent.com/32538678/52446159-76e8c600-2b2d-11e9-8040-b8439e9603e4.png">

## Actor diagram
See below the functions that the application contains and what the actors are. The functions and the code will be explained later in the readme.
![actor_diagram-03](https://user-images.githubusercontent.com/32538678/52816073-b0c34a80-30a0-11e9-92b6-32298b8c012b.png)


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
Before I explain the code, I will first draw the interaction diagram how the user can use the application.
![data_found-03](https://user-images.githubusercontent.com/32538678/52822391-da38a200-30b1-11e9-839d-5e88e8780a48.png)

## How my app works
During the development of the app there are different ways in which you can write a function to render the API.

### My bug :(
Before I explain these methods, I have to say that the app contains a bug. In my app I tried to apply a template engine (will be explained later). But the problem is that the template engine does not work like how it should work.


### Methods for an API
When writing the JavaScript code, I have applied three ways for calling the API, for example:

##### XMLHttpRequest
Use `XMLHttpRequest`(XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing.

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/appxml.js) my example of an `XHR`.

For more information about `XHR` you can read here about using it:
[Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

##### Promise
A Promise is an object representing the eventual completion or failure of an asynchronous operation.

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/apppromise.js) my example of an `Promise`.

For more information about `Promise` you can read here about using it:
[Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

##### Fetch
Fetch provides a generic definition of Request and Response objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your own responses programmatically.

See [here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/master/week1/public/js/appxml.js) my example of an `Fetch`.

For more information about `Fetch` you can read here about using it:
[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)


## What did I use?
For getting the data from the `Ghibliapi` API, I have used promise for writing the code.

##### Routie
To retrieve pages I used [Routie](https://github.com/jgallen23/routie). Routie is a javascript hash routing library. 

[Here](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/public/js/app.js#L4-L26) in my Javascript file i have used `Routie`.

By using the following you can retrieve the home page (index.html).

```
routie('/', () => {
        render.createElements(data)
        console.log('data is home')
      })
```
[Reference routie index.html](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/public/js/app.js#L5-L12)

To retrieve the detail page, the code has to be written slightly differently like:
```
routie('detail', () => {
      render.createElements(data)
      window.location.hash = 'detail';
      })
```

The `window.location.hash` returns the anchor part of a URL.

[Reference detail page](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/public/js/app.js#L17-L21)

##### Template Transparency
By loading in the data from the API, I have used a template engine named [Transparency](https://github.com/leonidas/transparency/). Transparency is a client-side template engine which binds data to DOM.

For rendering data in the `html` file you have to add classes and id's in to your file. For [example](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/index.html#L12-L21) what I have:
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
After you added classes and id's into your file you can combine it with the data function in your Javascript file. Like [this](https://github.com/Karinliu/web-app-from-scratch-18-19/blob/48f01ae826c1499551d0b6158de3432de8fef301/week2/public/js/app.js#L66-L82):

```
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
```
By calling `.render()` the data will be loaded in into the template.

## Design patterns and best practices


## Feature wishlist / backlog
what I would like to use in my application is a template engine that can load all data from the API. Also would i like to add a filter function where the user can filter on movies.

### What do I miss in the API
What I find very unfortunate about the API is that it does not contains images or trailers. Personally I would  like to see images than only just text when I look up a movie. :)


#### See the project
To see the project you can download or clone this document with the following command: 

```
git clone https://github.com/Karinliu/web-app-from-scratch-18-19.git

cd web-app-from-scratch-18-19/week1
```

