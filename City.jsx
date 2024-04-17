import "./City.css"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function City({id, name, cid, action, upd}){
    return (
        <div className="City">
            <h3>{id}</h3>
            <h3>{name}</h3>
            <h3>{cid}</h3>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => action(id)}
            style={{margin: "5px", justifyContent: "center"}} color='error'>
                Delete
            </Button>
            <Button variant="outlined" color='secondary' onClick={() => upd(id, name, cid)}>update</Button>
        </div>
    )
}