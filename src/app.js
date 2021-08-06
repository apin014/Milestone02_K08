const express = require('express')
const app = express();

app.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.use((req, res) => {
    res.status(404).redirect('/');
})