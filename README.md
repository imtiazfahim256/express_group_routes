
# express-group-router

An Express router for creating nested route groups easily.

## Installation

```bash
npm install express-group-router
```

## Usage

```javascript
const express = require('express');
const { group, subGroup, group_router } = require('express-group-router');

const app = express();

// Use the group_router in your main Express app
app.use(group_router);

// Example middleware
function exampleMiddleware(req, res, next) {
  console.log('Middleware executed');
  next();
}

// Create a group with a base path
group('/blogs', (blogs) => {
  // -> /blogs
  blogs.get('/', exampleMiddleware, (req, res) => {
    res.send('Get all blogs');
  });

  // Create a subgroup with dynamic path
  subGroup(blogs, (blog) => {
    // -> /blogs/:blogId
    blog.get('/:blogId', exampleMiddleware, (req, res) => {
      const blogId = req.params.blogId;
      res.send(`Get blog with ID: ${blogId}`);
    });

    // -> /blogs/:blogId
    blog.post('/:blogId', (req, res) => {
      const blogId = req.params.blogId;
      res.send(`Create new blog with ID: ${blogId}`);
    });

    // -> /blogs/:blogId/comments
    blog.get('/:blogId/comments', (req, res) => {
      const blogId = req.params.blogId;
      res.send(`Get comments for blog with ID: ${blogId}`);
    });

    // -> /blogs/:blogId/likes
    blog.get('/:blogId/likes', (req, res) => {
      const blogId = req.params.blogId;
      res.send(`Get likes for blog with ID: ${blogId}`);
    });
  });
});

// Start the Express app
app.listen(3939, () => {
  console.log('Example app listening on port 3939!');
});
```

