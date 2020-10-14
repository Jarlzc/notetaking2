const express = require('express');

const router = express.Router();
const fs = require('fs');
const {
    raw
} = require('body-parser');

const date = require("../util/date");

const options = {
    client: 'postgresql',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'pwd',
        database: 'notes'
    }
  }
  const knex = require('knex')(options);

let notes = [];
const noteids = [];


router.get('/', (req, res) => {
    let day = date.getDate();
    knex.select().table('table1').then((rows) => {
        console.log(rows)
        for (row of rows) {
            console.log(`${row['id']} ${row['name']} ${row['note']}`);
        
        }
        res.render('list', {
            ListTitle: day,
            itemsarray: rows
        })
    
    });
    
});

router.post('/', (req, res) => {
    let day = date.getDate();
    let note =[ {'name': 'User', 'note': `${req.body.nameItem}`}]
    knex('table1').insert(note).then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    res.redirect('/');
})

router.post('/delete/:id', (req, res) => {
    let day = date.getDate();
    console.log(req.params.id);
    knex('table1')
  .where('id', req.params.id)
  .del().then(() => console.log("data deleted"))
  .catch((err) => { console.log(err); throw err })
  res.redirect('/');
    
})

module.exports = router;