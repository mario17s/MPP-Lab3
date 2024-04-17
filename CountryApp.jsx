import { useEffect, useState } from 'react';
import CountryList from "./CountryList"
import Form from './Form';
import Button from '@mui/material/Button';
import axios from 'axios';
let needsort = false;
export default function CountryApp(){
    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
            let varr = needsort ? "name" : "";
          fetch(`http://localhost:8081/${varr}`)
            .then(res => {return res.json()})
            .then(data => setCountries(data))
            .catch(err => {
                console.log(err.message);
                })
    }, [countries]);
  
    const [editCountry, setEditCountry] = useState({
        id: 0,
        name: "",
        continent: "",
        capital: "",
        population: 0,
        checked: false
    })

    const deleteCountry = (index) =>
    {
        axios.delete(`http://localhost:8081/del/${index}`)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }
    const editCountryAction = (id, name, continent, capital, population, checked) => {
        console.log(id)
        setEditCountry({
            id: id,
            name: name,
            continent: continent,
            capital: capital,
            population: population,
            checked: checked
        })
    }
    const addCountry = (objj) => {
        console.log(objj);
        axios.post('http://localhost:8081/add',  {...objj})
        .then(res => {alert(res.status);})
        .catch(err => {console.log(err);})
    };
  
    const updateCountry = (objj) => {
        axios.put(`http://localhost:8081/upd/${objj.id}`, objj)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }

    const exportJSON = () => {
        const JSONData = JSON.stringify(countries);
        const blob = new Blob([JSONData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const checkCountry = (id, checkk) => {
        axios.get(`http://localhost:8081/${id}`)
        .then(res => {alert(res.data[0].id)})
        .catch(err => console.log(err))
        setCountries(old => {
            return old.map(c => {
                if(c.id === id)
                    return {...c, checked: checkk};
                else
                    return c;
            })
        })
    }

    const handleSort = () => {
        needsort = true;
        setCountries([]);
    }

    const deleteSelected = () => {
        setCountries(old => old.filter(c => c.checked === false));
    }
    
    return (
        <>
            <Button variant="outlined" color='primary' onClick={handleSort}>Sort</Button>
             <CountryList items={countries} action={deleteCountry} chec={checkCountry} upd={editCountryAction}/>
             <Form addAction={addCountry} ed={editCountry} updateAction={updateCountry}/>
             <Button variant="outlined" color='primary' onClick={exportJSON}>Export JSON</Button>
             <Button variant="contained" color='error' onClick={deleteSelected}>DELETE SELECTED</Button>
        </>
              
    )
}
