import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { useState, FormEvent } from 'react';
import { FormFields } from 'src/contstant'
import { FormFieldType } from "@components/types/types";
import { PencilIcon, DuplicateIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@components/UI/Modal';
import { useAppContext } from '@utils/AppContext';

const FormBuilder = () => {
    const { setFields } = useAppContext();
    const [selectedFormFields, setSelectedFormFields] = useState<Array<FormFieldType>>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editing, setEditing] = useState<number>(0)
    const [activeOption, setActiveOption] = useState<string>("")
    const [showContinueModal, setShowContinueModal] = useState<boolean>(false)

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(selectedFormFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedFormFields(items);
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
                                        formfield.options = []
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
                        <div>
                            <input onChange={(event) => {
                                let newFieldDetails = selectedFormFields
                                newFieldDetails[editing] = {
                                    ...newFieldDetails[editing],
                                    name: event.target.value
                                }
                                setSelectedFormFields(newFieldDetails)
                            }}
                                defaultValue={selectedFormFields[editing]?.name} 
                                className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to edit field name" /><br />
                            <input onChange={(event) => {
                                    let newFieldDetails = selectedFormFields
                                    newFieldDetails[editing] = {
                                        ...newFieldDetails[editing],
                                        description: event.target.value
                                    }
                                    setSelectedFormFields(newFieldDetails)
                                }}
                                defaultValue={selectedFormFields[editing]?.description} 
                                className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to add a description" /><br />
                            {
                                selectedFormFields[editing]?.type === 'select' || selectedFormFields[editing]?.type === 'choice' ?
                                    <div className="m-2">
                                        <label>Add options</label><br />
                                        {
                                            selectedFormFields[editing].options?.map((option, index) => {
                                                return (
                                                    <div key={index} className="flex">
                                                        <li>{option}</li>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="flex">
                                            <input onChange={(event) => {setActiveOption(event.target.value)}} 
                                                className="rounded-lg border border-gray-700 text-sm p-3 my-1 w-2/3" placeholder="Click to add an option" /><br />
                                            <button onClick={() => {
                                                let newOptions = selectedFormFields[editing]?.options;
                                                newOptions?.push(activeOption)
                                        
                                                let newSelectedFormField = selectedFormFields
                                                newSelectedFormField[editing].options = newOptions
                                                newSelectedFormField[editing] = {
                                                    ...newSelectedFormField[editing],
                                                    options: newOptions,
                                                    placeholder: newOptions!.join(", ")
                                                }
                                        
                                                setSelectedFormFields(newSelectedFormField)
                                                setActiveOption('')
                                            }} className="flex border border-gray-700 rounded-lg w-1/3 p-3 my-1 ml-3 justify-center">
                                                Add option 
                                                {/* <PlusIcon className="w-4 h-6 justify-center mx-1 text-gray-600 cursor-auto" />  */}
                                            </button>
                                        </div>
                                    </div>
                                    : <div>
                                        <input defaultValue={selectedFormFields[editing]?.placeholder} className="rounded-lg border border-gray-700 text-sm p-3 m-1 lg:w-96 md:w-96" placeholder="Click to edit placeholder" /><br />
                                    </div>
                            }
                            <label className="my-3 text-sm">
                                <input onChange={() => {
                                    let newFieldDetails = selectedFormFields
                                    const state = newFieldDetails[editing].required; 
                                    newFieldDetails[editing] = {
                                        ...newFieldDetails[editing],
                                        required: !state,
                                    }
                                    setSelectedFormFields(newFieldDetails)
                                }} checked={selectedFormFields[editing]?.required} type="checkbox" className="mx-1 my-3" />
                                Make field required
                            </label><br />
                            <div className="flex m-1 mt-3 text-sm">
                                <button className="border bg-green-600 text-white p-1 mr-1 rounded-lg w-16"
                                    onClick={() => setShowModal(false)}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
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