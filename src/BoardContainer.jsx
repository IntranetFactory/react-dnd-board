import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BoardCard } from './BoardCard';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';

const style = {
    width: 400,
};



const BoardContainer = memo(({ items }) => {

    console.log("xxxx", items);

    const [cards, setCards] = useState(items);

    const findCard = useCallback((id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card),
        };
    }, [cards]);

    const moveCard = useCallback((id, atIndex) => {
        const { card, index } = findCard(id);
        setCards(update(cards, {
            $splice: [
                [index, 1],
                [atIndex, 0, card],
            ],
        }));
    }, [findCard, cards, setCards]);

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

    return (<div ref={drop} style={style}>
        {cards.map((card) => (<BoardCard key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard} />))}
    </div>);
});

export default BoardContainer;