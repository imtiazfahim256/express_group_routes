const express =require('express')


const group_router = express.Router();

// Custom function to create nested route groups
function group(prefix, callback) {
    const nestedRouter = express.Router();
    callback(nestedRouter);
    group_router.use(prefix, nestedRouter);
  }
  
  // Custom function to create dynamically nested subgroups
  function subGroup(parentRouter, callback) {
    const nestedRouter = express.Router({ mergeParams: true });
    callback(nestedRouter);
    parentRouter.use(nestedRouter);
  }


module.exports = {
    group,
    subGroup,
    group_router
};