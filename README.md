
# Express Nested Group Router with Middleware Support

This module provides a custom implementation of nested route groups for Express.js, inspired by Laravel's routing functionality. It supports adding middleware to route groups or sub-groups to simplify and organize route management.

## Features

- **Nested Route Groups**: Group related routes together for better organization.
- **Middleware Support**: Apply middleware to entire groups or sub-groups.
- **Flexible Sub-Groups**: Dynamically nest sub-groups within groups.

## Installation

Clone or download this repository, and include the file in your project. No external dependencies are required apart from `express`.

## Usage

### Import the Module

```javascript
const { group, subGroup, group_router } = require('express-group-router');

## Example Routes



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
}, [Role_Permission.Check_permission(['MANAGE_AIR_TICKETS'])]);

// Use the router in your app
app.use(group_router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```

