import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { BoardCard } from './BoardCard';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';

const BoardLayoutContainer = styled.div`
    width: 400px;
    display: flex;
	flex-flow: column wrap;
	height: 900px;

    &::before,
	&::after {
        content: "";
        flex-basis: 100%;
        width: 0;
        order: 2;
    }
`;

const BoardContainer = memo(({ items }) => {

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

    return (<BoardLayoutContainer ref={drop}>
        {cards.map((card) => (<BoardCard key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard} />))}
    </BoardLayoutContainer>);
});

export default BoardContainer;