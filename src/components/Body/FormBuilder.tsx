import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import { FormFields } from 'src/contstant'
import { FormFieldType } from "@components/types/types";
import { PencilIcon, DuplicateIcon, TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@components/UI/Modal';
import { useAppContext } from '@utils/AppContext';

const FormBuilder = () => {
    const { setFields } = useAppContext();
    const [selectedFormFields, setSelectedFormFields] = useState<Array<FormFieldType>>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editing, setEditing] = useState<number>(0)
    const [showContinueModal, setShowContinueModal] = useState<boolean>(false)

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(selectedFormFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedFormFields(items);
    }

    const handleSave = (event: any) => {
        event.preventDefault();
        let newFieldDetails = selectedFormFields
        newFieldDetails[editing] = {
            ...newFieldDetails[editing],
            name: event.target[0].value,
            placeholder: event.target[1].value,
            description: event.target[2].value,
            required: event.target[3].checked,
        }
        setSelectedFormFields(newFieldDetails)
        setShowModal(false)
        console.log(newFieldDetails)
    }

    return (
        <>
            <div className='flex p-3 mx-10 mt-5 max-h-screen'>
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
                                                        <PencilIcon className="w-4 h-4 mr-2 text-green-600 cursor-auto"
                                                            onClick={() => {
                                                                setEditing(index);
                                                                setShowModal(true)
                                                            }}
                                                        />
                                                        <DuplicateIcon className="w-4 h-4 mr-2 text-gray-600 cursor-auto" onClick={() => {
                                                            setSelectedFormFields(selectedFormFields.slice(0, index + 1).concat(selectedFormFields.slice(index)).concat(selectedFormFields.slice(index + 1)))
                                                        }} />
                                                        <TrashIcon className="w-4 h-4 text-red-600 cursor-auto" onClick={() => {
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
                <Modal
                    active={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <div className="left-0">
                        <h1 className="text-black m-1 text-md">Settings</h1>
                        <form onSubmit={(event) => handleSave(event)}>
                            <input className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to edit field name" /><br />
                            <input className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to edit placeholder text" /><br />
                            <input className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to add a description" /><br />
                            <label className="my-3 text-sm">
                                <input type="checkbox" className="mx-1 my-3" />
                                Make field required
                            </label><br />
                            <div className="flex m-1 mt-5 text-sm">
                                <button type="submit" className="border bg-green-600 text-white p-1 mr-1 rounded-lg w-16">
                                    Save
                                </button>
                                <button className="border bg-red-600 text-white p-1 mr-1 rounded-lg w-16"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>      
            <div className="p-3 mx-10">
                <button onClick={() => {
                    setFields(selectedFormFields)
                    setShowContinueModal(true)
                }}
                    className="border bg-black text-white p-1 mr-1 rounded-lg w-20 float-right">
                    Continue
                </button>
                <Modal onClose={() => {setShowContinueModal(false)}} active={showContinueModal}>
                    <div className="text-center">
                        <h1 className="text-black m-1 text-md">Are you sure you want to continue?</h1>
                        <div className="my-3">
                            <button className="border bg-green-600 text-white p-1 mr-1 rounded-lg w-16">
                                <Link href="/settings">
                                    Yes
                                </Link>
                            </button>
                            <button className="border bg-red-600 text-white p-1 mr-1 rounded-lg w-16"
                                onClick={() => setShowContinueModal(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default FormBuilder;