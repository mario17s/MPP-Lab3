import { useState, useEffect } from "react";
import CityList from "./CityList";
import CityForm from "./CityForm";
import axios from 'axios';
import {faker} from '@faker-js/faker';
import Button from '@mui/material/Button';

export default function CityApp(){
    const [cities, setCities] = useState([]);
    const storedDetail = JSON.parse(localStorage.getItem('details')) || [];

    useEffect(() => {
        loadData2();
        
    }, []);

    const loadData2 = () => {
        console.log("fetch");
        console.log(storedDetail);
        fetch(`http://localhost:8081/c`)
        .then(res => {return res.json()})
        .then(data => {
            console.log(data);
            const d = data;
            if(storedDetail.length != 0)
            {
                for(let si of storedDetail){
                    axios.post('http://localhost:8081/c/add',  {...si})
                    .then(res => {alert(res.status);})
                    .catch(err => {console.log(err);})
                    d.push(si);
                }
                localStorage.removeItem('details');
            }
            setCities(d);
        })
        .catch(err => {
            console.log(err.message);
            })
    }

    const [editCity, setEditCity] = useState({
        id: 0,
        name: "",
        cid: 0
    })

    const editCityAction = (id, name, cid) => {
        console.log(id)
        setEditCity({
            id: id,
            name: name,
            cid: cid
        })
    }

    const addCity = (objj) => {
        console.log(objj);
        axios.post('http://localhost:8081/c/add',  {...objj})
        .then(res => {alert(res.status);})
        .catch(err => {console.log(err);
            const h = storedDetail;
            h.push(objj)
            localStorage.setItem('details', JSON.stringify(h));
        })
        setTimeout(loadData2, 2000);
    };

    const deleteCity = (index) =>
    {
        axios.delete(`http://localhost:8081/c/del/${index}`)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
        setTimeout(loadData2, 2000);
    }

    const updateCity = (objj) => {
        axios.put(`http://localhost:8081/c/upd/${objj.id}`, objj)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
        setTimeout(loadData2, 2000);
    }

    const handleFaker = async () => {
        let indexes = [];
        await fetch(`http://localhost:8081/c`)
        .then(res => {return res.json()})
        .then(data => {
            data.forEach(di => indexes.push(di.id))
        })
        .catch(err => {
            console.log(err.message);
            })

        let countryIndexes = []
        await fetch(`http://localhost:8081/name`)
        .then(res => {return res.json()})
        .then(data => {
            data.forEach(di => countryIndexes.push(di.id))
        })
        .catch(err => {
            console.log(err.message);
            })
        let fakers = []
        for(let i = 0; i < 10000; i++)
        {
            let idd = Math.floor(Math.random() * 100000);
            while(indexes.includes(idd))
                idd = Math.floor(Math.random() * 100000);
            indexes.push(idd);
            const cityy = {
                id: idd,
                name: faker.string.alphanumeric(10),
                cid: countryIndexes[Math.floor(Math.random() * countryIndexes.length)]
            }
            //axios.post('http://localhost:8081/c/add',  {...cityy})
              //      .then(res => {console.log(res.status);})
                //    .catch(err => {console.log(err);})
            fakers.push(cityy);
        }
        let prev = 0
        let idd = 1000;
        for(;idd <= 10000; idd += 1000)
        {
            let smallFakers = fakers.slice(prev, idd);
            prev = idd;
            await axios.post('http://localhost:8081/fake/city', [...smallFakers])
            .then(res => console.log("done inserting 1000"))
            .catch(err => console.log(err));
        }
        
    }

    return (
        <>
            <Button variant="outlined" color='primary' onClick={handleFaker}>Faker 5k</Button>
            <CityList items={cities} action={deleteCity} upd={editCityAction}/>
            <CityForm addAction={addCity} ed={editCity} updateAction={updateCity}/>
        </>
    )
}