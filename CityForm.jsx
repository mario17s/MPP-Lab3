import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './Form.css'

export default function CityForm({addAction, ed, updateAction}){
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        cid: 0
    })

    useEffect(() => {
        console.log(ed);
            setFormData(ed)
    }, [ed])

    const handleChange = (evt) => {
        let value = evt.target.value;
        if(evt.target.name === "id" || evt.target.name === "cid")
            if(value !== "")
            value = parseInt(value);
        console.log(value);
        console.log(typeof value)
        setFormData(old => {
            return {
                ...old,
                [evt.target.name]: value
            }
        })
    }

    const handleAdd = (formD) => {
        addAction(formD)
        setFormData({
            id: 0,
            name: "",
            cid: 0
        })
    }

    const handleUpdate = (formD) => {
        updateAction(formD)
        setFormData({
            id: 0,
            name: "",
            cid: 0
        })
    }
    
    return (
        <form className='Form'>
            <TextField id="id" name='id' variant="outlined" label="ID" defaultValue={formData.id.toString()} value={formData.id.toString()} onChange={handleChange} />
            <TextField id="name" name='name' label="Name" variant="outlined" defaultValue={formData.name} value={formData.name} onChange={handleChange} />
            <TextField id="cid" name='cid' label="CountryID" variant="outlined" value={formData.cid.toString()} defaultValue={formData.cid.toString()} onChange={handleChange} />
            <Button className="addbtn" variant="outlined" color='success' onClick={() => handleAdd(formData)}>Add</Button>
            <Button className="addbtn" variant="outlined" color='success' onClick={() => handleUpdate(formData)}>Update</Button>
        </form>
    )
}