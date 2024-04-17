import { useState, useEffect } from "react";
import CityList from "./CityList";
import CityForm from "./CityForm";
import axios from 'axios';

export default function CityApp(){
    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/c')
        .then(res => {return res.json()})
        .then(data => setCities(data))
        .catch(err => {
            if(err.message.includes("NetworkError"))
                alert("Network Error");
            else
                alert("Server Error");
            console.log(err.message);
            })
        
    }, [cities]);

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
        .catch(err => {console.log(err);})
    };

    const deleteCity = (index) =>
    {
        axios.delete(`http://localhost:8081/c/del/${index}`)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }

    const updateCity = (objj) => {
        axios.put(`http://localhost:8081/c/upd/${objj.id}`, objj)
        .then(res => alert(res.status))
        .catch(err => console.log(err))
    }

    return (
        <>
            <CityList items={cities} action={deleteCity} upd={editCityAction}/>
            <CityForm addAction={addCity} ed={editCity} updateAction={updateCity}/>
        </>
    )
}