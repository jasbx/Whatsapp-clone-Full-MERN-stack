const express = require('express');
const app = express();
const cors = require('cors');
const Pusher = require('pusher');
app.use(cors())

const Model = require('./models/WhatsUpModel')
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    next()
})



//URL GET DATA
app.get('/msg', async (req, res) => {
    try {
        const massege = await Model.find();
        res.json(massege)
    } catch (err) {
        res.send(err)
    }
})
//URL POST DATA
app.post('/new/msg', async (req, res) => {
    try {
        const massege = new Model(req.body)
        await massege.save()
        res.json(massege)
    } catch (err) {
        res.send(err)
    }

})



//delete
app.delete('/delete/msg/:id', (req, res) => {
    try {



        Model.findByIdAndDelete(req.params.id)
        res.status(200).send({
            'data': 'deleted'
        })

    } catch (error) {
        res.status(400).send({
            'data': error
        })
    }
})




//listen
const port = 3001;

app.listen(port, () => {
    console.log("server is running on port 3000");
})

//connect with mongo db

const mongoose = require('mongoose');
mongoose.connect("")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));



//connect with pusher
const pusher = new Pusher({
    appId: "1815426",
    key: "9ed9a6c45fccf50b1fb9",
    secret: "37907aa9e0ce8847dd96",
    cluster: "eu",
    useTLS: true
});


const db = mongoose.connection

db.on('open', () => {
    console.log('db is connection')
    const msgcollection = db.collection('masseges')
    const changeStream = msgcollection.watch()
    changeStream.on('change', (change) => {
        console.log(change)
        if (change.operationType === 'insert') {
            const massege = change.fullDocument;
            pusher.trigger('masseges', 'inserted', {
                'message': massege.message,
                'name': massege.name,
                'timestamps': massege.timestamps

            })
        } else {
            console.log('error triggering pusher')
        }
    })
});
//
