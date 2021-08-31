import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { BoardCard } from './BoardCard';
import update from 'immutability-helper';
import { ItemTypes } from './ItemTypes';
import useBus from 'use-bus';

const BoardLayoutContainer = styled.div`
    width: 100%;
    display: flex;
	flex-flow: column wrap;
	height: 100%;
`;

const BoardSizingContainer = styled.div`
    xmin-height: 80vh;
    height:100px;
`;

const ColsEnd = styled.div`
    flex-basis: 100%;
    width: 0;
    border: 1px solid transparent;
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

    const [cards, setCards] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const boardSizingContrainerRef = useRef();

    useEffect(() => {
        setCards(items);
    }, [items]);

    // console.log("COLS" ,cols);
    var newContainerHeight = containerHeight;

    // compute largest col height + largest card height
    useBus('card.change.height', (event) => {
        const card = cards.filter((c) => `${c.id}` === event.id)[0];
        if (card) card.height = event.height + 4;  // +4  rounding save guard
        updateContainerHeight();
        //console.log(event);
    });


    // persist change 
    useBus('cards.persist', (event) => {
        // cards is not updated yet after drop, so we query the DOM
        let nodes = boardSizingContrainerRef.current.children[0].children;
        var cardOrder = [];
        for (let i = 0; i < nodes.length; i++) {
            if(!nodes[i].classList.contains("colEnd")) cardOrder.push(nodes[i].getAttribute('card-id'));
        }
        console.log(cardOrder);
        
    });

    function updateContainerHeight() {
        let update = false;
        let maxCardHeight = 0;
        let maxColHeight = 0;
        let colHeight = [];
        for (let i = 0; i < cols; i++) colHeight[i] = 0;

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];            
            let height = Number(card.height || 500);
            if (height > maxCardHeight) maxCardHeight = height;
            let col = i % cols;
            colHeight[col] = colHeight[col] + height;
            if (colHeight[col] > maxColHeight) maxColHeight = colHeight[col];
            //console.log(i,col+1, height, maxColHeight);
        }
        //console.log("HEIGHT",maxColHeight,maxCardHeight);        
        newContainerHeight = maxColHeight + maxCardHeight;
        if (newContainerHeight != containerHeight) setContainerHeight(newContainerHeight);
    }

    useEffect(() => {
        //console.log("useEffect");
        updateContainerHeight();
    });

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
        updateContainerHeight();
    }, [findCard, cards, setCards]);

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

    updateContainerHeight();

    var colsEnd = [];
    for (var i = 0; i < cols; i++) {
        colsEnd.push({ key: "end" + i });
    }

    console.log("CH",containerHeight);
 
    return (
        <BoardSizingContainer ref={boardSizingContrainerRef} style={{ height: `${newContainerHeight}px` }}>
            <BoardLayoutContainer ref={drop} className={`board${cols}cols`}>
                {cards.map((card) => (<BoardCard key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard} />))}
                {colsEnd.map((colEnd) => (<ColsEnd key={colEnd.key} className={"colEnd"}></ColsEnd>))}
            </BoardLayoutContainer>
        </BoardSizingContainer>
    );
});

export default BoardContainer;