import { Form } from '@components/UI/Form'
import { FormData } from '@components/types/types'
import { useAppContext } from '@utils/AppContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const FormSubmission = () => {
    const { submission } = useAppContext()
    const [formData, setFormData] = useState<FormData>()
    const { cid } = useRouter().query

    useEffect(() => {
        async function getIpfsData() {
            const ipfsUrl = "https://ipfs.io/ipfs/" + cid
            const ipfsData = await fetch(ipfsUrl)
            const formData = await ipfsData.json()
            setFormData(formData)
        }
        getIpfsData()
    }, [cid])

    return (
        <>
           <div className="flex">
                <div className="w-1/4"></div>
                <div className="w-1/2">
                    {
                        formData ? (
                            <Form formData={formData} preview={false} />
                        )
                        : (
                            <div className="text-center">Fetching form...</div>
                        )
                    }
                </div>
                <div className="w-1/4"></div>
           </div>
        </>
    )
}

export default FormSubmission
