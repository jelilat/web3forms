import { Form } from "@components/UI/Form"
import { useAppContext } from "../utils/AppContext"

const Preview = () => {
    const { formData } = useAppContext()

    return (
        <>
            <Form formData={formData!} preview={true} />
        </>
    )
}

export default Preview;