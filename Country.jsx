import './Country.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useState } from 'react';

export default function Country({id, name, continent, capital, population, checked, chec, action, upd}){
    const [checke, setChecked] = useState(checked);
    return (
        <>
        <div className="Country">
            <h3>{id}</h3> 
            <h2 style={{fontSize: "2em"}}>{name.toUpperCase()}</h2>
            <div className='details'>
                <div className='detail'><h2 style={{color: 'white'}}>{continent}</h2></div>
                <div className='detail'><h2 style={{color: 'white'}}>{capital}</h2></div>
                <div className='detail'><h2 style={{color: 'white'}}>{population} mil</h2></div>
            </div>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => action(id)}
            style={{margin: "5px", justifyContent: "center"}} color='error'>
                Delete
            </Button>
            <Button variant="outlined" color='secondary' onClick={() => upd(id, name, continent, capital, population, checke)}>update</Button>
            <Checkbox
            checked={checke}
            onChange={(evt) => {
                chec(id, evt.target.checked)
                setChecked(evt.target.checked)
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            />
        </div>
        </>
    )
}