var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
jsonParser = bodyparser.json();

var app = express();

let response = {
    error: false,
    code: 200,
    msg: ''
}

let items = [
    {
        name: 'PRS',
        description: 'SE Custom 24',
        img: "./assets/images/prs.jpg"
    },
    {
        name: 'Gibson',
        description: 'SG',
        img: "./assets/images/sg.jpg"
    },
    {
        name: 'Ibanez',
        description: 'RG550 Japón',
        img: "./assets/images/rg550.png"
    },
];

app.use(cors({
    origin: '*'
}));

app.get('/', function (req, res) {
    res.send("API GuitarShop.cl v1");
});

app.get('/guitars', function (req, res) {
    response = {
        error: false,
        code: 200,
        msg: items
    }

    res.send(response);
});

app.get('/guitar/:id', jsonParser, function (req, res) {
    let id = req.params.id;
    console.log("ID: ", id)

    response = {
        error: false,
        code: 200,
        msg: items[id]
    }

    res.send(response);
});

app.post('/guitar', jsonParser, function (req, res) {
    console.log(req.body);
    if (!req.body) {
        response = {
            error: true,
            code: 500,
            msg: 'Error creando la guitarra!'
        }
    } else {
        items.push(req.body);
        response = {
            error: false,
            code: 200,
            msg: items
        }
    }
    res.send(response);
});

app.put('/guitar/:id', jsonParser, function (req, res) {
    let id = req.params.id;

    items[id].name = req.body.name;
    items[id].description = req.body.description;
    items[id].img = req.body.img;

    response = {
        error: false,
        code: 200,
        msg: items[id]
    }
    res.send(response);
});

app.listen(3000, () => {
    console.log("Api funcionando en el puerto 3000");
})