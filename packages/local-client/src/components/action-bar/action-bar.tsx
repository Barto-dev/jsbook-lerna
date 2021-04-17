import React from 'react';
import {useActions} from "../../hooks/use-action";
import ActionButton from "../action-button/action-button";
import './action-bar.css';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions();
    return (
        <div className="action-bar">
            <ActionButton icon="fa-arrow-up" onClick={() => moveCell(id, 'up')} />
            <ActionButton icon="fa-arrow-down" onClick={() => moveCell(id, 'down')} />
            <ActionButton icon="fa-times" onClick={() => deleteCell(id)} />
        </div>
    );
};

export default ActionBar;
