import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useWindowWidth } from '@react-hook/window-size';
import BoardContainer from './BoardContainer'

const Board = (props) => {

    const colWidth = 450;

    const [cols, setCols] = useState(0);
    const windowWidth = useWindowWidth();

    var winCols = Math.floor(windowWidth / colWidth);
    if (winCols < 1) winCols = 1;
    if (winCols > 5) winCols = 5;

    if (cols != winCols) setCols(winCols);

    var style = {
        width: winCols * colWidth,
        margin: '0 auto'
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={style}>
                <BoardContainer {...props} cols={winCols} />
            </div>
        </DndProvider>
    )
};

export default Board;