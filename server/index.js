import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import Single from './models/Single.js';
import Group from './models/Group.js';
import Preset from './models/Preset.js';
import Session from './models/Session.js';
import Active from './models/Active.js';

import path from 'path';

const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.get('/api/test', (req, res) => {
    res.send('Dies war ein HTTP Request');
});

/* INSERT ROUTES*/
app.post('/api/singles/create', async (req, res) => {
    console.log(req.body);
    const data = await Single.create(req.body);
    res.send(data);
});

app.post('/api/groups/create', async (req, res) => {
    console.log(req.body);
    const data = await Group.create(req.body);
    res.send(data);
});

app.post('/api/sessions/create', async (req, res) => {
    console.log(req.body);
    const data = await Session.create(req.body);
    res.send(data);
});

app.post('/api/presets/create', async (req, res) => {
    console.log(req.body);
    const data = await Preset.create(req.body);
    res.send(data);
});

app.post('/api/actives/create', async (req, res) => {
    console.log(req.body);
    const data = await Active.create(req.body);
    res.send(data);
});

/* SELECT ALL ROUTES */
app.get('/api/singles/find', async function (req, res) {
    const all = await Single.find();
    res.send(all);
});

app.get('/api/groups/find', async function (req, res) {
    const all = await Group.find();
    res.send(all);
});

app.get('/api/sessions/find', async function (req, res) {
    const all = await Session.find();
    res.send(all);
});

app.get('/api/presets/find', async function (req, res) {
    const all = await Preset.find();
    res.send(all);
});

app.get('/api/actives/find', async function (req, res) {
    const latest = await Active.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
    res.send(latest);
});

/* INTERACT ROUTES */
app.get('/api/singles/find/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Single.findOne({ id: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/singles/find-by-session/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Single.find({ sessionId: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/groups/find/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Group.findOne({ id: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/groups/find-by-session/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Group.find({ sessionId: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/sessions/find/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Session.findOne({ _id: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/presets/find/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Preset.findOne({ _id: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/actives/find/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Active.findOne({ _id: fetchid });
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.put('/api/singles/update/:id', async function (req, res) {
    console.log(req.body);
    try {
        var filter = { _id: req.params.id };
        var update = req.body;
        var result = await Single.findOneAndUpdate(filter, update);
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

app.get('/api/presets/delete/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Preset.deleteOne({ _id: fetchid });
        console.log('Preset deleted');
        res.send(result);
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});
app.get('/api/sessions/delete/:id', async function (req, res) {
    try {
        var fetchid = req.params.id;
        var result = await Session.deleteOne({ _id: fetchid });
        console.log('Session deleted');
        res.send(result);
    } catch (err) {
        result = err.message;
        console.error('Error Message:', result);
    }
    res.send(result);
});

// // Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname + 'public'), { maxAge: '1y', etag: false }));
}

// Handle SPA
// app.get('*', (req, res) => res.sendFile(path.join(__dirname + 'public/index.html')));

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log('Connected to backend'));
    })
    .catch((error) => console.log(`${error} did not connect`));
