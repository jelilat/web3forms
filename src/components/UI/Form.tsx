import { FormData } from '@components/types/types';
import { Field } from './Field';

interface FormProps {
    formData: FormData;
    preview: boolean;
}

export const Form = ({ formData, preview }: FormProps) => {
    return (
        <div className="flex flex-col p-2">
            <h1 className="font-bold text-xl my-2 text-center">{formData?.settings?.formTitle}</h1>
            <div>
                {
                    formData?.formFields.map((field, index) => {
                        return (
                            <div key={index} className="my-2">
                                <label className="my-1 text-sm">{field?.name}</label><br />
                                <p className="text-xs text-gray-600"><i>{field?.description}</i></p>
                                <Field formField={field} index={index} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="relative flex w-full">
        </div>
            <button onClick={() => {
                }}
                    disabled={preview}
                    className={`border bg-black text-white p-1 mr-1 rounded-lg w-20 float-right ${preview && "bg-gray-700 cursor-not-allowed"}`}>
                    Submit
                </button>
        </div>
    )
}