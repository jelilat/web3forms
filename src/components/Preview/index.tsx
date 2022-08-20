import { Form } from "@components/UI/Form"
import { useAppContext } from "../utils/AppContext"
import { useSession, signIn } from "next-auth/react"

const Preview = () => {
    const { formData, setFormData } = useAppContext()
    const { data: session } = useSession()
console.log(session)
    const handleComplete = async () => {console.log("ok")
        if (!session) {
            signIn()
        } else {
            const response = await fetch('api/submit', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <>
            <div className="flex my-3">
                <div className="w-1/4"></div>
                <div className="w-1/2 p-2 border rounded-lg my-3">
                    <Form formData={formData!} preview={true} />
                </div>
                <div className="w-1/4"></div>
            </div>

            <div className="text-center my-3">
                <button onClick={() => {
                    console.log("hete")
                    handleComplete()
                }}
                    className="border bg-black text-white p-2 mr-1 rounded-lg">
                    Complete
                </button>
            </div>
        </>
    )
}

export default Preview;