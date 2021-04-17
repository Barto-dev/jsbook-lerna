import React, {Fragment, useEffect} from 'react';
import CellListItem from "../cell-list-item/cell-list-item";
import AddCell from "../add-cell/add-cell";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useActions} from "../../hooks/use-action";

import './cell-list.css';


const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => {
        return order.map((id) => data[id]
        )
    });

    const {fetchCells} = useActions();

    useEffect(() => {
        fetchCells();
    }, [fetchCells])

    const renderedCells = cells.map(cell => (
        <Fragment key={cell.id}>
            <CellListItem key={cell.id + 1} cell={cell} />
            <AddCell key={cell.id + 2} previousCellId={cell.id} />
        </Fragment>
    ))
    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;
