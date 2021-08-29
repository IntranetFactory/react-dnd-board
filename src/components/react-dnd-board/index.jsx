
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BoardContainer from './BoardContainer'

const Board = (props) => {    

    var cols = 3;

    return (
        <DndProvider backend={HTML5Backend}>
            <BoardContainer {...props} cols={cols}/>
        </DndProvider>
    )
};

export default Board;