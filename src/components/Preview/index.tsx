import { Form } from "@components/UI/Form"
import { useAppContext } from "../utils/AppContext"
import { uploadToIPFS } from "../utils/ipfsUpload"
import { useSession, signIn } from "next-auth/react"
import { useMutation } from "react-query"
import { CreateSpreadsheet, AttributeDefinition } from "@components/types/types"
import toast from "react-hot-toast"
import { useState } from "react"
import { useAccount } from 'wagmi'

const Preview = () => {
    const { formData, setFormData } = useAppContext()
    const [ipfsUrl, setIpfsUrl] = useState<string | undefined>()
    const { address, isConnected } = useAccount()
    // const { data: session } = useSession()

    const { isLoading, mutate } = useMutation(
        "db",
        (values: any) => 
            fetch("/api/db/write", {
                method: "POST",
                body: JSON.stringify(values)
            })
            .then(async (res) => {
                // console.log(await res.json())
                const response = await res.json()
                console.log(response)
                const tId = response.TableDescription?.TableId
                setFormData({ ...formData!, storageLink: tId })
                const url = await uploadToIPFS(formData)
                console.log(url)
                setIpfsUrl(url.path)
            })
            .catch(err => console.log(err)),
        {
            onSuccess: () => {
                toast.success("Created successfully!")
            },
            onError: () => {
                toast.error("Something went wrong 😢")
            },
        }
    )

    const handleComplete = async () => {
            // const cid = await uploadToIPFS(formData)
            let attributes: AttributeDefinition[] = [{
                AttributeName: 'walletAddress',
                AttributeType: 'S'
            }]
            let schema = [
                {
                    AttributeName: 'walletAddress',
                    KeyType: 'HASH'
                }
            ]
            // for (let i=0; i<(formData?.formFields!)?.length; i++) {
            //     attributes.push({
            //         AttributeName: formData?.formFields![i].name!,
            //         AttributeType: 'S'
            //     })
            //     schema.push({
            //         AttributeName: formData?.formFields![i].name!,
            //         KeyType: 'RANGE'
            //     })
            // }
            const values: any = {
                AttributeDefinitions: attributes,
                KeySchema: schema,
                TableName: (formData?.settings?.formTitle!)?.replace(/\s/g, '-'),
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
            
            mutate(values)
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

            {
                isConnected ? (
                    <div className="text-center my-3">
                        {
                                ipfsUrl ? (
                                    <div>
                                        Copy form link: <input type="text" value={"https://web3forms-rho.vercel.app/form/" + ipfsUrl} />
                                    </div>
                                )
                                : (
                                    <button onClick={() => {
                                            handleComplete()
                                        }}
                                            className="border bg-black text-white p-2 mr-1 rounded-lg">
                                            Complete
                                    </button>
                                )
                        }
                    </div>
                )
                : (
                    <div className="text-center my-3">
                        Connect your wallet
                    </div>
                )
            }
            </>
    )
}

export default Preview;