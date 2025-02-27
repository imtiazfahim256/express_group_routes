# Express Nested Group Router with Middleware Support

This module provides a custom implementation of nested route groups for Express.js, inspired by Laravel's routing functionality. It supports adding middleware to route groups or sub-groups, simplifying and organizing route management.

## Features

- **Named Routes**: Assign names to routes for easy reference.
- **Nested Route Groups**: Group related routes together for better organization.
- **Middleware Support**: Apply middleware to entire groups or sub-groups.
- **Flexible Sub-Groups**: Dynamically nest sub-groups within groups.

## Installation

Clone or download this repository, and include the file in your project. No external dependencies are required apart from `express`.

## Usage

### Import the Module

```javascript
const { group, subGroup, group_router, route_name } = require('express-group-router');
```

### Example Routes

```javascript
const express = require('express');
const app = express();

// Import controllers and middleware
const Air_ticket = require('./controllers/Air_ticket');
const Role_Permission = require('./middleware/Role_Permission');

// Define route groups
group('/air-ticket', (Air_Ticket) => {
    subGroup(Air_Ticket, '/get/airport', (sub) => {
        sub.put('/', Role_Permission.Check_permission(['MANAGE_ROLES']), Air_ticket.get_airport);
    });

    subGroup(Air_Ticket, '/get/airline', (sub) => {
        sub.put('/', Air_ticket.get_airlines);
    });

    subGroup(Air_Ticket, '/search/ticket', (sub) => {
        sub.post('/', Air_ticket.search_ticket_post);
        sub.post('/flex', Air_ticket.flexpost);
        sub.post('/fareRules', Air_ticket.fareRulesPost);
        sub.post('/filters', Air_ticket.search_filter_post);
        sub.get('/status/:requestId', Air_ticket.check_request_progress);
    });
}, [Role_Permission.Check_permission(['MANAGE_AIR_TICKETS'])], 'air-ticket');

// Use the router in your app
app.use(group_router);

// Example: Access a named route
const route = route_name('air-ticket');
console.log(`Route for air-ticket: ${route}`);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### API

#### `group(prefix, callback, middleware = [], name = null)`

- **prefix**: The base URL prefix for the group (e.g., `/air-ticket`).
- **callback**: A function defining the routes inside the group.
- **middleware**: (Optional) Array of middleware to apply to the group.
- **name**: (Optional) A name for the group, useful for named routes.

#### `subGroup(parentRouter, prefix, callback, middleware = [], name = null)`

- **parentRouter**: The router to nest the subgroup under.
- **prefix**: The base URL prefix for the subgroup (e.g., `/get/airport`).
- **callback**: A function defining the routes inside the subgroup.
- **middleware**: (Optional) Array of middleware to apply to the subgroup.
- **name**: (Optional) A name for the subgroup, useful for named routes.

#### `route_name(name)`

- **name**: The name of the route to retrieve.
- **Returns**: The route prefix associated with the given name, or `null` if not found.

## License

This module is free to use and modify as needed.
