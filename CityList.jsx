import City from "./City";

export default function CityList({items, action, upd}){
    return (
        <div className="cities">
            {items.map(i => <City key={i.id} id={i.id} name={i.name} cid={i.cid} action={action} upd={upd}/>)}
        </div>
    )
}