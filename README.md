# Web App From Scratch 2021

Link to live version: https://wafs2021.netlify.app/

The purpose of this repo is to create a watchlist for cryptocurrency. With overviews of different toplists. By volume (last 24h) or market cap.

# Index

- [Getting started](#getting-started)
- [Features](#features)
- [APIs used](#apis-used)
- [User & Interaction Diagram](#user-interaction-diagram)
- [Design patterns used](#design-patterns-used)
- [Checklist](#Checklist)
- [Templating Engine](#templating-engine)
- [References And Sources](#References-And-Sources)

# Getting-started

clone the repository and host index.html on your web server.

# Features

- [x] Retrieve basic data from all coins (Basic Data List)
- [x] Refine Basic Data List, Store Locally.
- [x] Retrieve toplist by marketcap
- [x] Template toplist by marketcap
- [x] Homemade templating engine.
- [ ] Create Wallet feature
- [ ] Create add to Wallet functions
- [ ] Create Remove from wallet functions
- [ ] Template wallet

# API Used

![description cryptocompare API](https://github.com/stanRepo/web-app-from-scratch-2021/blob/master/project/assets/CryptoCompareDescription.jpg)
Cryptocompare: https://min-api.cryptocompare.com/

For this course I used the Cryptocompare API. I used `fetch()` to do multiple requests.

The API sends back a string which contains an object.
If everything goes as planned it should look something like this:

![API Succesfully Retrieved](https://github.com/stanRepo/web-app-from-scratch-2021/blob/master/project/assets/ApiSucces.jpg)

# Actor & Interaction Diagram

## Actor Diagram

![Actor Diagram](https://github.com/stanRepo/web-app-from-scratch-2021/blob/master/project/assets/actorDiagram.jpg)

## Interaction Diagram

![Interaction Diagram](https://github.com/stanRepo/web-app-from-scratch-2021/blob/master/project/assets/interactionDiagram.jpg)

# Design patterns used

- Javascript Modular Design Pattern (1)

# Checklist

- [ ] Update wiki
- [x] Interaction Diagram
- [x] Actor Diagram
- [x] Retrieve basic data from all coins (Basic Data List)
- [x] Refine Basic Data List, Store Locally.
- [x] Retrieve toplist by marketcap
- [x] Template toplist by marketcap
- [ ] Create Wallet feature
- [ ] Create add to Wallet functions
- [ ] Create Remove from wallet functions
- [ ] Template wallet

# Templating Engine

I couldn't have made this template engine without this article from hackernoon.com (2)

Let me explain what happens here:

1. I send the HTML element `(string)` and the data `(object)` to `render()`.
2. The function looks for `{{ }}` tags and uses the word inside as a reference for the value that needs to be inserted.
3. A `.replace` function used to replace the word.
4. So if I know `data` and I need `data.name` to be rendered. I can just add {{name}} to my html.
   Templating Engine Code Examples

```js

```

# References And Sources

1. https://hackernoon.com/how-to-create-new-template-engine-using-javascript-8f26313p
2. https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
