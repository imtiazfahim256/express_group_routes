const express = require("express");

const group_router = express.Router();

const namedRoutes = {};
// Custom function to create nested route groups with middleware support
function group(prefix, callback, middleware = [],name = null) {
  const nestedRouter = express.Router();
  // Apply middleware if provided
  if (Array.isArray(middleware) && middleware.length > 0) {
    nestedRouter.use(middleware);
  }
  callback(nestedRouter);

  namedRoutes[name || prefix] = prefix;
  group_router.use(prefix, nestedRouter);
}

// Custom function to create dynamically nested subgroups with middleware support
function subGroup(parentRouter, prefix, callback, middleware = [],name = null) {
  const nestedRouter = express.Router({ mergeParams: true });
  // Apply middleware if provided
  if (Array.isArray(middleware) && middleware.length > 0) {
    nestedRouter.use(middleware);
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
