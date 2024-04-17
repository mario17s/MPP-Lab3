import Country from "./Country";
import './CountryList.css'

export default function CountryList({items, action, chec, upd}){
    return (
        <div className="listt">
        {items.map(i => <Country key={i.id} id={i.id} name={i.name} 
        continent={i.continent} capital={i.capital} population={i.population} checked={i.check} chec={chec} action={action} upd={upd}/>)}
        </div>
    )
}