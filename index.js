const express = require("express");

const group_router = express.Router();

// Custom function to create nested route groups with middleware support
function group(prefix, callback, middleware = []) {
  const nestedRouter = express.Router();
  // Apply middleware if provided
  if (Array.isArray(middleware) && middleware.length > 0) {
    nestedRouter.use(middleware);
  }
  callback(nestedRouter);
  group_router.use(prefix, nestedRouter);
}

// Custom function to create dynamically nested subgroups with middleware support
function subGroup(parentRouter, prefix, callback, middleware = []) {
  const nestedRouter = express.Router({ mergeParams: true });
  // Apply middleware if provided
  if (Array.isArray(middleware) && middleware.length > 0) {
    nestedRouter.use(middleware);
  }
  callback(nestedRouter);
  parentRouter.use(prefix, nestedRouter);
}

module.exports = {
  group,
  subGroup,
  group_router,
};
