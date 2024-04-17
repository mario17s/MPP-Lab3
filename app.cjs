//import express from 'express'
//import cors from 'cors'

const express = require('express');
const app = express(); 
const cors = require('cors');
app.use(express.json());
app.use(cors());
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employees',
    password: 'root',
    port: 5432 // PostgreSQL default port
  });
  
  // Test the connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database:', err);
    } else {
      console.log('Connected to PostgreSQL database');
    }
  });


let countriesList = [
    
  ];

let citiesList = [
    
]


app.listen(8081, () =>{ 
    console.log("Listening...");
}); 

app.get('/', (req, res) => {
    //if(countriesList.length === 0)
    pool.query('SELECT * FROM Countries', (err, result) => {
        if (err) {
        console.error('Error executing SELECT query:', err);
        } else {
        //console.log('Query result:', result.rows);
        countriesList = result.rows;
        res.status(200).send(countriesList);
        }
    });
})

app.get('/name', (req, res) => {
    //if(countriesList.length === 0)
    pool.query('SELECT * FROM Countries', (err, result) => {
        if (err) {
        console.error('Error executing SELECT query:', err);
        } else {
        console.log('Query result:', result.rows);
        countriesList = result.rows;
        for(let i = 0; i < countriesList.length; i++)
            for(let j = i + 1; j < countriesList.length; j++)
                if(countriesList[i].name > countriesList[j].name)
                {
                    let aux = countriesList[i];
                    countriesList[i] = countriesList[j];
                    countriesList[j] = aux;
                }
        console.log(countriesList);
        res.status(200).send(countriesList);
        }
    });
    
})

app.get('/c', (req, res) => {
    pool.query('SELECT * FROM Cities', (err, result) => {
        if (err) {
        console.error('Error executing SELECT query:', err);
        } else {
        //console.log('Query result:', result.rows);
        citiesList = result.rows;
        res.status(200).send(citiesList);
        }
    });
})

app.get('/:idd', (req, res) => {
    const {idd} = req.params;
    let idx = parseInt(idd);
    res.status(200).send(countriesList.filter(c => c.id == idx));
})

app.post('/add', (req, res) => {
    let country = req.body;
    console.log(req.body);

    pool.query('insert into Countries(id,name,continent,capital,population,checked) values($1, $2, $3, $4, $5, false)', 
        [country.id, country.name, country.continent, country.capital, country.population], (err, result) => {
        if (err) {
        console.error('Error executing INSERT query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(201).sendStatus(201);
        }
    });
})

app.post('/c/add', (req, res) => {
    let city = req.body;
    console.log(req.body);
    pool.query('insert into Cities(id,name,cid) values($1, $2, $3)', 
        [city.id, city.name, city.cid], (err, result) => {
        if (err) {
        console.error('Error executing INSERT query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(201).sendStatus(201);
        }
    });
})

app.delete(`/del/:idx`, (req, res) => {
    const {idx} = req.params;
    let idxx = parseInt(idx)
    /*console.log(req);
    countriesList = countriesList.filter(c => {return c.id != idxx})
    console.log(countriesList);*/
    pool.query('DELETE FROM Countries WHERE id = $1', 
        [idxx], (err, result) => {
        if (err) {
        console.error('Error executing Delete query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(204).sendStatus(204);
        }
    });
   
})

app.delete(`/c/del/:idx`, (req, res) => {
    const {idx} = req.params;
    let idxx = parseInt(idx)
    /*
    console.log(req);
    citiesList = citiesList.filter(c => {return c.id != idxx})
    console.log(citiesList);
    res.status(204).sendStatus(204);*/
    pool.query('DELETE FROM Cities WHERE id = $1', 
        [idxx], (err, result) => {
        if (err) {
        console.error('Error executing Delete query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(204).sendStatus(204);
        }
    });
})

app.put(`/upd/:idx`, (req, res) => {
    const {idx} = req.params;
    console.log(req);
    let idxx = parseInt(idx);
    let newobj = req.body;
    pool.query('update Countries set name = $1,continent = $2, capital = $3, population = $4, checked = $5 where id = $6', 
        [newobj.name, newobj.continent, newobj.capital, newobj.population, newobj.checked, idxx], (err, result) => {
        if (err) {
        console.error('Error executing UPDATE query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(200).sendStatus(200);
        }
    });
    /*
    countriesList = countriesList.map(c => {
        if(c.id === idxx) return newobj
        else return c;
    })
    res.status(200).sendStatus(200);*/
})

app.put(`/c/upd/:idx`, (req, res) => {
    const {idx} = req.params;
    console.log(req);
    let idxx = parseInt(idx);
    let newobj = req.body;
    /*
    citiesList = citiesList.map(c => {
        if(c.id === idxx) return newobj
        else return c;
    })
    res.status(200).sendStatus(200);*/
    pool.query('update Cities set name = $1 ,cid = $2 where id = $3', 
        [newobj.name, newobj.cid, idxx], (err, result) => {
        if (err) {
        console.error('Error executing UPDATE query:', err);
        } else {
        console.log('Query result:', result.rows);
        res.status(200).sendStatus(200);
        }
    });
})

module.exports = app;