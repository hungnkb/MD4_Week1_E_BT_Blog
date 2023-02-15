const express = require('express');
const app = express();
const PORT = 3000;
const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/data/uploads/')
    },
    filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})

let upload = multer({ storage: storage });

let bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('blog')
})
app.post('/blog-result', upload.single('file'), (req, res) => {
    console.log(req.file);
    let blog = {
        username: req.body.username,
        content: req.body.content,
        src: req.file.filename
    }


    res.render('blog-result', { blog })
})

app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
}) 