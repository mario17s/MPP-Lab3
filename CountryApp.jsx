import { useEffect, useState } from 'react';
import CountryList from "./CountryList"
import Form from './Form';
import Button from '@mui/material/Button';
import axios from 'axios';
import {faker} from '@faker-js/faker';
import Pagination from './Pagination';

export default function CountryApp(){
    const [countries, setCountries] = useState([]);
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];

    const loadData = () => {
        console.log("fetch");
        console.log(storedItems);
        fetch(`http://localhost:8081/6`)
        .then(res => {return res.json()})
        .then(data => {
            console.log(data);
            const d = data;
            if(storedItems.length != 0)
            {
                for(let si of storedItems){
                    axios.post('http://localhost:8081/add',  {...si})
                    .then(res => {alert(res.status);})
                    .catch(err => {console.log(err);})
                    d.push(si);
                }
                localStorage.removeItem('items');
            }
            setCountries([...countries, ...d]);
        })
        .catch(err => {
            console.log(err.message);
            })
    }

    useEffect(() => {
            loadData();
    }, []);

    let isLoading = false;

    async function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
            isLoading = true;
            try {
                await loadData();
            } catch (error) {
                console.error('Error loading more countries:', error);
            } finally {
                isLoading = false;
            }
        }
    }
    
    // Event listener for scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Initial load
    window.addEventListener('load', async () => {
        try {
         await loadData();
        } catch (error) {
            console.error('Error loading initial countries:', error);
        }
    });

  
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
        setTimeout(loadData, 2000);
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
        .catch(err => {console.log(err); 
            const h = storedItems;
            h.push(objj)
            localStorage.setItem('items', JSON.stringify(h));})
        setTimeout(loadData, 2000);
    };
  
    const updateCountry = (objj) => {
        axios.put(`http://localhost:8081/upd/${objj.id}`, objj)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
        setTimeout(loadData, 2000);
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
        fetch(`http://localhost:8081/name`)
        .then(res => {return res.json()})
        .then(data => setCountries(data))
        .catch(err => {
            console.log(err.message);
            })
        setTimeout(loadData, 2000);
    }

    const deleteSelected = () => {
        setCountries(old => old.filter(c => c.checked === false));
    }

    const handleFaker = async () => {
        let indexes = [];
        await fetch(`http://localhost:8081/name`)
        .then(res => {return res.json()})
        .then(data => {
            data.forEach(di => indexes.push(di.id))
        })
        .catch(err => {
            console.log(err.message);
            })
        for(let i = 0; i < 100; i++)
        {
            let idd = Math.floor(Math.random() * 100000);
            while(indexes.includes(idd))
                idd = Math.floor(Math.random() * 100000);
            indexes.push(idd);
            const continents = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
            const capitalCities = [
                'Tokyo', 'New Delhi', 'Washington, D.C.', 'Beijing', 'London', 'Paris', 'Berlin', 'Moscow',
                'Ottawa', 'Canberra', 'Rome', 'Brasília', 'Pretoria', 'Ankara', 'Buenos Aires', 'Cairo']
            const countryy = {
                id: idd,
                name: faker.address.country(),
                continent: continents[Math.floor(Math.random() * continents.length)],
                capital: capitalCities[Math.floor(Math.random() * capitalCities.length)],
                population: Math.floor(Math.random() * 100),
                checked: false
            }
            axios.post('http://localhost:8081/add',  {...countryy})
                    .then(res => {console.log(res.status);})
                    .catch(err => {console.log(err);})
        }
    }
    
    const handleGold = async () => {
        const masters = []
        const details = []
        await fetch(`http://localhost:8081/`)
        .then(res => {return res.json()})
        .then(data => {
            data.forEach(di => masters.push(di))
        })
        .catch(err => {
            console.log(err.message);
            })
        await fetch(`http://localhost:8081/c`)
        .then(res => {return res.json()})
        .then(data => {
            data.forEach(di => details.push(di))
        })
        .catch(err => {
            console.log(err.message);
            })
        console.log(masters);
        console.log(details);
        let res = ""
        for(let country of masters){
            let count = 0;
            for(let city of details)
                if(city.cid === country.id)
                    count++;
            res += `${country.name} has ${count} cities\n`
        }
        console.log(res);
    }

    return (
        <>
            <Button variant="outlined" color='primary' onClick={handleSort}>Sort</Button>
            <Button variant="outlined" color='primary' onClick={handleFaker}>Faker 100</Button>
            <Button variant="outlined" color='primary' onClick={handleGold}>GOLD</Button>
            <CountryList items={countries} action={deleteCountry} chec={checkCountry} upd={editCountryAction}/>
            <Pagination itemsPerPage={6} data={countries} />
            <Form addAction={addCountry} ed={editCountry} updateAction={updateCountry}/>
            <Button variant="outlined" color='primary' onClick={exportJSON}>Export JSON</Button>
            <Button variant="contained" color='error' onClick={deleteSelected}>DELETE SELECTED</Button>
        </>
              
    )
}
