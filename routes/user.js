const express = require('express');

const router = express.Router();

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
let editnoteid = null;


router.get('/', (req, res) => {
    let day = date.getDate();
    knex.select().table('table1').orderBy('id', 'ase').then((rows) => {
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

router.get('/edit/:noteId', (req, res) => {
      editnoteid = req.params.noteId;
     knex.select('note').table('table1').where('id', editnoteid).then((rows) => {
    console.log(rows[0].note);
    res.render('edit', {ListTitle: "hi", targetnote: rows[0].note})
});
});

router.post('/edit', (req, res) => {
    console.log(req.body.nameItem);
    console.log(editnoteid)
    knex('table1').where('id', editnoteid).update('note', req.body.nameItem).then(() => {console.log("data update");
    res.redirect('/');})
})

router.post('/', (req, res) => {
    let day = date.getDate();
    let note =[ {'name': 'User', 'note': `${req.body.nameItem}`}]
    knex('table1').insert(note).then(() => {console.log("data inserted");
    res.redirect('/');})
    .catch((err) => { console.log(err); throw err })
    
})

router.post('/delete/:id', (req, res) => {
    let day = date.getDate();
    console.log(req.params.id);
    knex('table1')
  .where('id', req.params.id)
  .del().then(() => {console.log("data deleted");
  res.redirect('/');})
  .catch((err) => { console.log(err); throw err })
  
})

module.exports = router;