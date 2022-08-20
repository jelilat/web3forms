import { FormFieldType, FormSubmission } from '@components/types/types';
import { useAppContext } from '../utils/AppContext';
import { XIcon } from '@heroicons/react/solid';
 
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
                    <input onChange={(e) => {
                        let newSubmission = submission
                        newSubmission[index] = {
                            ...newSubmission[index],
                            name: formField.name,
                            value: e.target.value
                        }
                        setSubmission(newSubmission) 
                    }}
                        type={formField?.id} placeholder={formField?.placeholder} 
                        className="rounded-lg border border-gray-700 text-sm p-2 my-1  w-full" />
                ) : (
                    <div>
                        {
                            formField?.type === "textarea" && 
                            <textarea onChange={(e) => {
                                let newSubmission = submission
                                newSubmission[index] = {
                                    ...newSubmission[index],
                                    name: formField.name,
                                    value: e.target.value
                                }
                                setSubmission(newSubmission)
                            }}
                            placeholder={formField?.placeholder} 
                                className="rounded-lg border border-gray-700 text-sm p-2 my-1 h-40  w-full" />
                        }
                        {
                            formField?.type === "choice" && 
                            <div>
                                {
                                    formField?.options?.map((option, ind) => {
                                        return (
                                            <div key={ind}>
                                                <input onChange={(e) => {
                                                    let newSubmission = submission
                                                    if (formField?.id === 'radio') {
                                                        newSubmission[index] = {
                                                            ...newSubmission[index],
                                                            name: formField.name,
                                                            value: e.target.value
                                                        }
                                                    } else {
                                                        newSubmission[index] = {
                                                            ...newSubmission[index],
                                                            name: formField.name,
                                                            value: newSubmission[index]?.value ? newSubmission[index]?.value?.concat(", " + option) : option
                                                        }
                                                    }
                                                  
                                                    setSubmission(newSubmission)
                                                }}
                                                    name="choice" type={formField?.id} value={option} />{option}<br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            formField?.id === "single-select" && 
                            <select onChange={(e) => {
                                let newSubmission = submission
                                newSubmission[index] = {
                                    ...newSubmission[index],
                                    name: formField.name,
                                    value: e.target.value
                                }
                                setSubmission(newSubmission)
                            }}
                                className="rounded-lg border border-gray-700 text-sm p-2 my-1  w-full">
                                {
                                    formField?.options?.map((option, index) => {console.log(option)
                                        return (
                                                <option key={index} value={option}>{option}</option>
                                        )
                                    })
                                }
                            </select> 
                        }
                        {
                            formField?.id === "multi-select" &&
                            <div
                                className="flex rounded-lg border border-gray-700 text-sm p-2 my-1 w-full">
                                        <div className="flex">
                                            {submission[index]?.value !== "" &&
                                                submission[index]?.value?.split(", ").map((option, id) => {console.log(option, submission[index])
                                                    return (
                                                        <div className="flex border rounded-xl bg-blue-300 border-green-200 px-1"
                                                            key={id}>
                                                            {option}
                                                            <XIcon onClick={() => {console.log("h")
                                                                let newSubmission = submission
                                                                const values = newSubmission[index]?.value?.split(', ')
                                                                let val: string
                                                                if (values.length > 1) {
                                                                    const value = values.filter((value) => value !== option)
                                                                    val = value.join(", ")
                                                                } else {
                                                                    val = ""
                                                                }
                                                                newSubmission[index] = {
                                                                    ...newSubmission[index],
                                                                    value: val!
                                                                }
                                                                setSubmission(newSubmission)
                                                            }}
                                                                className="ml-1 w-2 top-0 cursor-pointer" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="group">
                                            <svg className="ml-2 w-4 h-4 text-right" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            <div className="w-full bg-gray-700 text-white p-1 invisible group-hover:visible absolute z-10 rounded divide-y divide-white shadow block">
                                                <ul className="py-1 text-sm">
                                                    {
                                                        formField?.options?.map((option, ind) => {console.log(option)
                                                            return (
                                                                    <li onClick={() => {console.log("got")
                                                                        if (!submission[index]?.value?.includes(option)) {
                                                                            let newSubmission = submission
                                                                            newSubmission[index] = {
                                                                                ...newSubmission[index],
                                                                                name: formField.name,
                                                                                value: newSubmission[index]?.value ? newSubmission[index]?.value?.concat(", " + option) : option
                                                                            }
                                                                            setSubmission(newSubmission)
                                                                        }
                                                                        
                                                                    }}
                                                                        className="p-1 cursor-pointer hover:bg-gray-600"
                                                                        key={ind} value={option}>{option}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    {/* </button> */}
                                
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}