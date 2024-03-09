const express = require("express");

const routes = {
  users: require("./routes/user"),
  authors: require("./routes/author"),
  holds: require("./routes/hold"),
  books: require("./routes/book"),
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

app.get("/", (req, res) => {
  res.send("Hello World...!");
});

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    app.get(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getAll)
    );
  }
  if (routeController.getBooksInUse) {
    app.get(
      `/api/booksInUse/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getBooksInUse)
    );
  }
  if (routeController.getAllAvailable) {
    app.get(
      `/api/available/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getAllAvailable)
    );
  }
  if (routeController.getById) {
    app.get(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById)
    );
  }
  if (routeController.create) {
    app.post(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create)
    );
  }
  if (routeController.update) {
    app.put(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.update)
    );
  }
}

module.exports = app;
