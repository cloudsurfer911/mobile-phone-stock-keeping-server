/**
 * Author: Sujith Subramanian
 * Purpose: API for managing devices on a device farm
 * Secondary purpose: Used for performance testing
 * Note :   No database is used, all operations are in memory
 * Automator: Sujith
 */


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = 5050;

let devices = []; //device  data  from POST calls is populated in this list
let brands = [];  // brand data 
let categories = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.post('/devices', (req, res) => {
    const device = req.body;
    console.log(device);
    devices.push(device);
    res.send(`Device ${device.model} is added to the database`);
});

app.get('/devices', (req, res) => {
    const model = req.query.model;
    if (model) {
        res.json(devices.filter(d => d.model && d.model.includes(model)));
    } else {
        res.json(devices);
    }
});

app.delete('/devices/:id', (req, res) => {
    const id = req.params.id; 
    devices = devices.filter(d => d.id !== req.params.id);
    res.send(`Device id ${id} was deleted from the database`);



});

app.post('/brands', (req, res) => {
    const brand = req.body;
    console.log(brand);
    brands.push(brand);
    res.send('Brand is added to the database');
});

app.get('/brands', (req, res) => {
    res.json(brands);
});

app.delete('/brands/:id', (req, res) => {
    brands = brands.filter(b => b.id !== req.params.id);
    res.send('Brand was deleted from the database');
});


// category of device like phone, tablet etc
app.post('/categories', (req, res) => {
    const category = req.body;
    console.log(category);
    categories.push(category);
    res.send('Category is added to the database');
});

app.get('/categories', (req, res) => {
    res.json(categories);
});

app.delete('/categories/:id', (req, res) => {
    categories = categories.filter(c => c.id !== req.params.id);
    res.send('Category was deleted from the database');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
