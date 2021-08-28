import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';

const style = {
    width: 400,
};

const ITEMS = [
    {
        id: 1,
        text: 'Write a cool JS library',
    },
    {
        id: 2,
        text: 'Make it generic enough',
    },
    {
        id: 3,
        text: 'Write README',
    },
    {
        id: 4,
        text: 'Create some examples',
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others). Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
        id: 6,
        text: '??? Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
    {
        id: 8,
        text: 'Write a cool JS library. Spam in Twitter and IRC to promote it (note that this element is taller than the others). Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
        id: 9,
        text: 'Make it generic enough',
    },
    {
        id: 10,
        text: 'Write README',
    },
    {
        id: 11,
        text: 'Create some examples',
    },
    {
        id: 12,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
        id: 13,
        text: '???',
    },
];
export const Container = memo(function Container() {
    const [cards, setCards] = useState(ITEMS);
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
        {cards.map((card) => (<Card key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard} />))}
    </div>);
});
