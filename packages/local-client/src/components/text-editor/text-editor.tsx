import React, {useState, useEffect, useRef} from "react";
import './text-editor.css';
import {Cell} from "../../redux";
import {useActions} from "../../hooks/use-action";

import MDEditor from '@uiw/react-md-editor';


interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const {updateCell} = useActions();

    useEffect(() => {
        const listener = (evt: MouseEvent) => {
            // если реф уже создался у клика есть какой-то таргерт
            // и если цель клика является потомком рефа, редактор не закрывается
            if (ref.current && evt.target && ref.current?.contains(evt.target as Node)) {
                console.log('element clicked on is inside editor');
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, {capture: true});

        return () => document.removeEventListener('click', listener, {capture: true})
    }, [])

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor value={cell.content} onChange={(val) => updateCell(cell.id, val || '')} />
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'} />
            </div>
        </div>)
}

export default TextEditor
