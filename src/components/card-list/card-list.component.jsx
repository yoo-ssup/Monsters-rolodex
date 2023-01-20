import './card-list.styles.css';

import Card from "../card/card.component";

const CardList = ({ monsters }) => (
    <div className="card-list">
        { monsters.map(monster =>{
            return (
                <Card monster={monster} />
        )})}        
    </div>
);

export default CardList;