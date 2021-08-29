import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { BoardCard } from './BoardCard';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';

const BoardLayoutContainer = styled.div`
    width: 100%;
    display: flex;
	flex-flow: column wrap;
	height: 2000px;

`;


const ColsEnd = styled.div`
    flex-basis: 100%;
    width: 0;
    border: 1px solid #ddd;
    margin: 0;
    content: "";
    padding: 0;


    
    .board2cols &:nth-child(2n+1) { order: 1; }
    .board2cols &:nth-child(2n) { order: 2; }

    .board3cols &:nth-child(3n+1) { order: 1; }
    .board3cols &:nth-child(3n+2) { order: 2; }
    .board3cols &:nth-child(3n) { order: 3; }

    .board4cols &:nth-of-type(4n+1) { order: 1; }
    .board4cols &:nth-of-type(4n+2) { order: 2; }
    .board4cols &:nth-of-type(4n+3) { order: 3; }
    .board4cols &:nth-of-type(4n)   { order: 4; }

    .board5cols &:nth-of-type(5n+1) { order: 1; }
    .board5cols &:nth-of-type(5n+2) { order: 2; }
    .board5cols &:nth-of-type(5n+3) { order: 3; }
    .board5cols &:nth-of-type(5n+4) { order: 4; }
    .board5cols &:nth-of-type(5n)   { order: 5; }
`;


const BoardContainer = memo(({ items, cols }) => {

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

    var colsEnd = [];
    for(var i=0;i<cols;i++) {
        colsEnd.push({ key:"end" + i});
    }

    return (<BoardLayoutContainer ref={drop} className={`board${cols}cols`}>
        {cards.map((card) => (<BoardCard key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard} />))}
        {colsEnd.map((colEnd) => (<ColsEnd key={colEnd.key}></ColsEnd>))}
    </BoardLayoutContainer>);
});

export default BoardContainer;