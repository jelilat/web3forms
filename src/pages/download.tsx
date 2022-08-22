import { useAccount } from 'wagmi'
import { useState } from 'react'
import { useQuery } from "react-query"

const Download = () => {
    const { address, isConnected } = useAccount()
    const [formId, setFormId] = useState('')

    const handleDownload = async () => {
        const ipfsUrl = "https://ipfs.io/ipfs/" + formId
        const ipfsData = await fetch(ipfsUrl)
        const formData = await ipfsData.json()
        if (formData?.ownerAddress !== address) {
            alert("You are not the owner of this form")
            return
        } else {
            const tableName = (formData?.settings?.formTitle!)?.replace(/\s/g, '-')
            await fetch(`/api/db/read?tableName=${tableName!}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await res.json()
                console.log(response)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <>
            {
                isConnected ? (
                    <div>
                        <h1>Download Responses</h1>
                        <label>Enter Form ID</label>
                        <input type="text" onChange={(e) => {
                            setFormId(e.target.value);
                        }} />
                        <button onClick={() => handleDownload()}>
                            Download
                        </button>
                    </div>
                ) 
                : (
                    <div>Connect your wallet</div>
                )
            }
        </>
    )
}

export default Download