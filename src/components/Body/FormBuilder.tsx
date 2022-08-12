
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
    FILE: 'file',
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
}

const FormBuilder = () => {
    return (
        <div>
            <h1>FormBuilder</h1>
        </div>
    );
}

export default FormBuilder;