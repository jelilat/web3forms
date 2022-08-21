import { Form } from "@components/UI/Form"
import { useAppContext } from "../utils/AppContext"
import { useSession, signIn } from "next-auth/react"
import { useMutation } from "react-query"
import { CreateSpreadsheet } from "@components/types/types"
import toast from "react-hot-toast"

const Preview = () => {
    const { formData, setFormData } = useAppContext()
    const { data: session } = useSession()

    const { isLoading, mutate } = useMutation(
        "create",
        (values: CreateSpreadsheet) => 
            fetch("/api/create", {
                method: "POST",
                body: JSON.stringify(values)
            }).then(res => console.log(res.json())),
        {
            onSuccess: () => {
                toast.success("Spreadsheet created successfully!")
            },
            onError: () => {
                toast.error("Something went wrong 😢")
            },
        }
    )
console.log(isLoading)
    const handleComplete = async () => {
        if (!session) {
            signIn()
        } else {
            let headers: string[] = []
            for (let i=0; i<(formData?.formFields!)?.length; i++) {
                headers.push(formData?.formFields![i]?.name!)
            }
            const values: CreateSpreadsheet = {
                title: formData?.settings?.formTitle!,
                headers: headers,
            }
            mutate(values)
            // const body = JSON.stringify(values)
            // console.log(body)
            // fetch("/api/create", {
            //     method: "POST",
            //     body: body,
            //     headers: {
            //         "Content-Type": "application/json",
            //     }
            // }).then(res => console.log(res.json()))
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