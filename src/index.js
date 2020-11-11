const express = require('express');
const app = express(); // Trả về đối tượng để xây dựng Website
const morgan = require('morgan'); // HTTP logger middleware request for nodejs
const exphbs = require('express-handlebars');
const path = require('path'); // Của node js
const port = 3000;

const route = require('./routes/index');

//TODO Use
// app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
// Thay cho body-parser
app.use(express.urlencoded());
app.use(express.json());

//TODO Set
app.engine(
    '.hbs',
    exphbs({
        extname: '.hbs', // Đổi tên đuôi file
    }),
);
// D: \Document\ExpressJS\F8_blog\src -> D:\Document\ExpressJS\F8_blog\src\resources
app.set('views', path.join(__dirname, 'resources', 'views')); // Đặt lại đường dẫn
app.set('view engine', 'hbs');

//TODO Routing
route(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});