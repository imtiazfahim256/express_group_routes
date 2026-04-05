const express = require("express");

const group_router = express.Router();

const namedRoutes = {};
// Custom function to create nested route groups with middleware support
function group(prefix, callback, middleware = [], name = null) {
  const nestedRouter = express.Router();
  
  // Normalize middleware to an array
  const middlewares = Array.isArray(middleware) ? middleware : (middleware ? [middleware] : []);

  // Apply middleware if provided using spread syntax
  if (middlewares.length > 0) {
    nestedRouter.use(...middlewares);
  }
  
  callback(nestedRouter);

  namedRoutes[name || prefix] = prefix;
  group_router.use(prefix, nestedRouter);
}

// Custom function to create dynamically nested subgroups with middleware support
function subGroup(parentRouter, prefix, callback, middleware = [], name = null) {
  const nestedRouter = express.Router({ mergeParams: true });
  
  // Normalize middleware to an array
  const middlewares = Array.isArray(middleware) ? middleware : (middleware ? [middleware] : []);

  // Apply middleware if provided using spread syntax
  if (middlewares.length > 0) {
    nestedRouter.use(...middlewares);
  }
  
  callback(nestedRouter);
  namedRoutes[name || prefix] = prefix;
  parentRouter.use(prefix, nestedRouter);
}
function route_name(name) {
  return namedRoutes[name] || null;
}


module.exports = {
  group,
  subGroup,
  group_router,
  route_name
};
