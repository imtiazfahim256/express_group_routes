
# express-groups-router

An Express router for creating nested route groups easily.

## Installation

```bash
npm install express-groups-router
```

## Usage

```javascript
const express = require('express');
const { group, subGroup, group_router } = require('express-groups-router');

const app = express();

// Use the group_router in your main Express app
app.use(group_router);

// Example middleware
function exampleMiddleware(req, res, next) {
  console.log('Middleware executed');
  next();
}

group('/admin', (admin) => {
  //-> /admin/
    admin.get('/', exampleMiddleware,(req, res) => {
        res.render('Admin_section/dashboard');
    });
  //-> /admin/addexam
    admin.get('/addexam', (req, res) => {
        res.render('Admin_section/academic/examadd');
    });
    
    admin.get('/manageexam', (req, res) => {
        res.render('Admin_section/academic/exammanage');
    });
    
    admin.get('/addteacher', (req, res) => {
        res.render('Admin_section/academic/addteacher');
    });
    
    admin.get('/managestudent', (req, res) => {
        res.render('Admin_section/academic/managestudent');
    });

    subGroup(admin, '/student', (sub_student) => {
        // -> /admin/student/:studentId
        sub_student.get('/:studentId', exampleMiddleware,(req, res) => {
            const studentId = req.params.studentId;
            res.send(`Get student with ID: ${studentId}`);
        });
    });
});

// Start the Express app
app.listen(3939, () => {
  console.log('Example app listening on port 3939!');
});
```

