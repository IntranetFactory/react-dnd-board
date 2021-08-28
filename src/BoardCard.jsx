import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';

const BoardCardContainer = styled.div`
    border: 1px dashed gray;
    padding: 0.5rem 1rem;    
    background-bolor: white;
    cursor: move;
    width: 300px;
    margin: 12px;

    &:nth-child(3n+1) {
        order: 1;
    }

    &:nth-child(3n+2) {
        order: 2;
    }

    &:nth-child(3n) {
        order: 3;
    }
`;

export const BoardCard = memo(function Card({ id, text, moveCard, findCard, }) {

    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        },
    }), [id, originalIndex, moveCard]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        },
    }), [findCard, moveCard]);

    const opacity = isDragging ? 0 : 1;
    return (<BoardCardContainer style={{ opacity }}
        ref={(node) => {
            drag(drop(node));
            if (!node) return;
            var m = document.createElement("div");
            m.innerHTML = Math.random().toFixed(10);
            if (node && node.childElementCount == 0) node.appendChild(m);
        }}>
        {id}. {text}
    </BoardCardContainer>);
});
