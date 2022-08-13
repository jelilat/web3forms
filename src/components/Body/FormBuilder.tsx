import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { FormFields, FormFieldType } from 'src/contstant'
import { PencilIcon, DuplicateIcon, TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image'

const FormBuilder = () => {
    const [selectedFormFields, setSelectedFormFields] = useState<Array<FormFieldType>>([])

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(selectedFormFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedFormFields(items);
    }
    return (
        <div className='flex p-3 m-10 max-h-screen'>
           <div className='border rounded-lg p-3 mx-2 w-1/5 cursor-pointer'>
            {
                FormFields.map((formfield, index) => {
                    return(
                        <div key={index} className="h-16 w-24" 
                            onClick={() => {
                                setSelectedFormFields([...selectedFormFields, formfield])
                            }}
                        >
                            {formfield.name}
                        </div>
                    )
                })
            }
           </div>
           <div className='border rounded-lg p-3 mx-2 w-4/5 overflow-auto'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields">
                {(provided) => (
                    <ul className="form-fields" {...provided.droppableProps} ref={provided.innerRef}>
                        {selectedFormFields.map(({id, name, description, placeholder}, index) => {
                            return (
                                <Draggable key={index} draggableId={String(index)} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className="flex">
                                            <div className="m-5 w-4/5">
                                                <p className="my-1">
                                                    { name }
                                                </p>
                                                <i className="text-gray-600 my-1 text-sm">{ description }</i>
                                                <div className="border rounded-lg w-full p-2 my-1 h-10 text-sm text-gray-400">
                                                    { placeholder }
                                                </div>
                                            </div>
                                            <div className="w-1/5 mt-16 flex">
                                                <PencilIcon className="w-4 h-4 mr-2 text-green-600" />
                                                <DuplicateIcon className="w-4 h-4 mr-2 text-gray-600" onClick={() => {
                                                    setSelectedFormFields(selectedFormFields.slice(0, index + 1).concat(selectedFormFields.slice(index)).concat(selectedFormFields.slice(index + 1)))
                                                }} />
                                                <TrashIcon className="w-4 h-4 text-red-600" onClick={() => {
                                                    setSelectedFormFields(selectedFormFields.filter((field, ind) => ind !== index))
                                                }} />
                                            </div>
                                        </div>      
                                    </li>
                                )}
                                </Draggable>
                            );
                            })}
                        {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
           </div>
        </div>
    );
}

export default FormBuilder;