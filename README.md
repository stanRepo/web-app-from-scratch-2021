# X Value

Link to live version: https://wafs2021.netlify.app/

The purpose of this repo is to create an SPA list of cryptocurrency. With overviews of different toplists. By volume (last 24h) or market cap. Also it should include a unique way of displaying the data. which makes it stand out from other 'crypto-list' websites.

# Index

- [Getting started](#getting-started)
- [Features](#features)
- [APIs used](#apis-used)
- [User & Interaction Diagram](#user-interaction-diagram)
- [Design patterns used](#design-patterns-used)
- [Checklist](#Checklist)
- [Templating Engine](#templating-engine)
- [Router](#Router)
- [References And Sources](#References-And-Sources)

# Getting-started

Clone the repository and host index.html on your (local) web server.

# Features

- [x] Retrieve basic data from all coins (Basic Data List)
- [x] Refine Basic Data List, Store Locally.
- [x] Retrieve data from cache / retrieve new data; depending on timestamp
- [x] Display market sentiment ( all +- added together)
- [x] Show coin price allignment with market sentiment ( right column)
- [x] Retrieve toplist by marketcap
- [x] Template toplist by marketcap
- [x] Homemade templating engine.
- [ ] Create Wallet feature
- [ ] Create add to Wallet functions
- [ ] Create Remove from wallet functions
- [ ] Template wallet

# API Used

![description cryptocompare API](/project/assets/CryptoCompareDescription.JPG)
Cryptocompare: https://min-api.cryptocompare.com/

For this course I used the Cryptocompare API. I used `fetch()` to do multiple requests.

The API sends back a string which contains an object.
If everything goes as planned it should look something like this:

![API Succesfully Retrieved](/project/assets/ApiSucces.JPG)

# Actor & Interaction Diagram

## Actor Diagram

![Actor Diagram](/project/assets/actorDiagram.JPG)

## Interaction Diagram

![Interaction Diagram](/project/assets/interactionDiagram.JPG)

# Design patterns used

- Javascript Modular Design Pattern (1)
- Javascript Singleton Pattern (4)

# Checklist

- [x] Interaction Diagram
- [x] Actor Diagram
- [x] Retrieve basic data from all coins (Basic Data List)
- [x] Refine Basic Data List, Store Locally.
- [x] Retrieve toplist by marketcap
- [x] Template toplist by marketcap
- [ ] Add feature that shows the highest buy-in position possible based on buy-in capital on hands.
      (something like: if I spend 10.000 on Xcoin I will be at the top 100 hodlers, which is the highest I can position myself ATM) [ FEATURE REMOVED In Current Patch]
- [ ] Create Wallet feature
- [ ] Create add to Wallet functions
- [ ] Create Remove from wallet functions
- [ ] Template wallet

# Templating Engine

I couldn't have made this template engine without this article from hackernoon.com (2)

Let me explain what happens under the hood:

1. I send the HTML element `(string)` and the data `(object)` to `render()`.
2. The function looks for `{{ }}` tags and uses the word inside as a reference for the value that needs to be inserted.
3. A `.replace` function is used to replace the word.
4. So if I know `data` and I need `data.name` to be rendered. I can just add {{name}} to my html.

Templating Engine Code Examples

```js
 render: (template, data) => {
    // Search for anything that is surrounded by the brackets, and replace it with the name inside data.
    // I.E. "{{data.FullName}}", "data = {FullName:"Bitcoin"}"
    return template.replace(/{{(.*?)}}/g, (match) => {
      return data[match.split(/{{|}}/).filter(Boolean)[0].trim()];
    });
  },
```

# Router

I needed to handle the routes so I've used the microlibrary `routie.js` (3).
Code Examples:

Here I check for the current route then I reference to code located in `this`

```js
routie({ "": this["/"], "/": this["/"], "details/:id": this["details/:id"] });
```

The following Code is used for the routes at the moment:

```js
"/" = () => {
  console.log("@home");
  const indexPage = new Index(this.render, endPoints);
  console.log(indexPage);
  this.currentPage = indexPage;
};
"details/:id" = (id) => {
  console.log("@details");
  const detailsPage = new Details(this.render, endPoints, id);
  this.currentPage = detailsPage;
};
"*" = () => {
  console.log("404");
};
```

# References And Sources

1. https://hackernoon.com/how-to-create-new-template-engine-using-javascript-8f26313p
2. https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
3. https://github.com/jgallen23/routie
4. https://www.dofactory.com/javascript/design-patterns/singleton

## Shoutouts

Special Thanks to the following people:

- [Jonah Meyers](https://github.com/theonejonahgold)
- [Nathan Neelis](https://github.com/NathanNeelis)
- [Jelmer Overeem](https://github.com/Jelmerovereem)
- [Solide Agency](https://github.com/solideagency)
- [Robin Frugte](https://github.com/RobinFrugte97)
- [Wouter van der Heijde](https://github.com/Mokerstier)
