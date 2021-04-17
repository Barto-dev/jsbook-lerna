import React from 'react';

interface ActionButtonProps {
    icon: string;
    onClick: () => {}
}

const ActionButton: React.FC<ActionButtonProps> = ({onClick, icon}) => {
    return (
        <button className="button is-primary is-small" onClick={onClick}>
            <span className="icon">
                <i className={`fas ${icon}`} />
            </span>
        </button>
    );
};

export default ActionButton
