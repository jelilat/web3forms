import { FormFieldType, FormSubmission } from '@components/types/types';
import { useState } from 'react';
import { useAppContext } from '../utils/AppContext';

interface FieldProps {
    formField: FormFieldType;
    index: number;
}

export const Field = ({formField, index}: FieldProps) => {
    const { submission, setSubmission } = useAppContext();

    return(
        <div>
            {
                formField?.type === "input" ? (
                    <input type={formField?.id} placeholder={formField?.placeholder} 
                        className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96" />
                ) : (
                    <div>
                        {
                            formField?.type === "textarea" && 
                            <textarea placeholder={formField?.placeholder} 
                                className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96" />
                        }
                        {
                            formField?.type === "choice" && 
                            <div>
                                {
                                    formField?.options?.map((option, index) => {
                                        return (
                                            <div key={index}>
                                                <input type={formField?.id} value={option} />{option}<br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            formField?.type === "select" && 
                            <select>
                                {
                                    formField?.options?.map((option, index) => {
                                        return (
                                            <div key={index}>
                                                <option value={option}>{option}</option>
                                            </div>
                                        )
                                    })
                                }
                            </select>
                        }
                    </div>
                )
            }
        </div>
    )
}