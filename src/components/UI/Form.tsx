import { 
    FormData,
    limitedTimedFee
} from '@components/types/types';
import { Field } from './Field';
import { useAppContext } from '../utils/AppContext';
import { useMutation } from "react-query"
import { useState, useEffect } from 'react';
import { 
    useAccount,
    useSendTransaction,
    usePrepareSendTransaction,
    useContractRead,
    erc20ABI,
 } from 'wagmi';
import toast from "react-hot-toast";
import { BigNumber } from 'ethers';

interface FormProps {
    formData: FormData;
    preview: boolean;
}

export const Form = ({ formData, preview }: FormProps) => {
    const { submission } = useAppContext();
    const { address, isConnected } = useAccount();
    const [params, setParams] = useState<any>();
    const [paid, setPaid] = useState<boolean>();
    const [amount, setAmount] = useState<number>(0);
    const [valid, setValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const checkBalance = useContractRead({
        addressOrName: formData?.settings?.tokenGate?.tokenAddress,
        contractInterface: erc20ABI!,
        functionName: "balanceOf",
        args: address!,
        chainId: formData?.settings?.tokenGate?.networkId,
    })

    const decimals = useContractRead({
        addressOrName: formData?.settings?.tokenGate?.tokenAddress,
        contractInterface: erc20ABI,
        functionName: "decimals",
        chainId: formData?.settings?.tokenGate?.networkId,
    })

    useEffect(() => {
        const tokenGate = formData?.settings?.tokenGate;
        const moduleType = formData?.settings?.module?.type;
        const moduleOptions = formData?.settings?.module?.options;
        const options = (moduleOptions! as limitedTimedFee);

        let valids = 0
        let counts = 0

        if (tokenGate?.tokenAddress !== "") {
            const balance = checkBalance?.data?._hex;
            const decimal = 10**(Number(decimals?.data))
            const bal = parseInt(balance)/decimal
            counts ++
            if (bal < tokenGate?.minimumBalance) {
                setErrorMessage("Insufficient token balance. Can't access form")
                return
            } else {
                valids++
            }
        }

        if (moduleType.includes("Timed")) {
            const expiry = options?.expiry!;
            counts ++
            if (expiry < Date.now()/1000) {
                setErrorMessage("Form closed!");
                return;
            } else {
                valids++
            }
        }

        if (moduleType.includes("Limited")) {
            const limit = options?.maximum!;
            counts ++
            //TODO
            if (limit <= 0) {
                setErrorMessage("Maximum submissions reached");
                return;
            } else {
                valids++
            }
        }

        if (valids == counts) {
            setValid(true)
        }
    }, [])

    const { data, config, isSuccess, isLoading } = usePrepareSendTransaction({
        request: { 
            from: address,
            to: formData?.ownerAddress, 
            value: (BigNumber.from('10000000000000000')).mul(BigNumber.from(amount!))
        },
        onSuccess: () => {
            setPaid(true);
            mutate(params);
        }
      })
      const { sendTransaction } =
        useSendTransaction(config)

    const handleModules = async() => {
        const moduleType = formData?.settings?.module?.type;
        const moduleOptions = formData?.settings?.module?.options;

        if (moduleType.includes("Fee")) {
            const fee = (moduleOptions! as limitedTimedFee).amount!;
            setAmount(fee);
            if (paid) {
                mutate(params)
            } else {
                sendTransaction?.()
            }
        } else {console.log("gdifn")
            mutate(params)
        }
    }

    const { mutate } = useMutation(
        "db",
        (values: any) => 
            fetch("/api/db/write", {
                method: "PUT",
                body: JSON.stringify(values)
            })
            .then((res) => {
                alert("Submited successfully!")
            })
            .catch(err => {
                alert("Something went wrong 😢")
                console.log(err)
            }),
        {
            onSuccess: () => {
                setPaid(false)
                toast.success("Created successfully!")
            },
            onError: () => {
                toast.error("Something went wrong 😢")
            },
        }
    )

    const handleSubmission = () => {
        for (let i = 0; i < submission.length; i++) {
            if (submission[i].value === "" && formData.formFields[i].required) {
                alert("Please fill out all required fields")
                return
            }
        }
        console.log(submission)
        const params = {
            TableName: (formData.settings.formTitle)?.replace(/\s/g, '-'),
            Item: {
                submission,  
                walletAddress: address!
            }, 
        }
        setParams(params)
        handleModules()
    }

    return (
        <>
            {
                !isConnected ? (
                    <div className="text-center">
                        <h1>Please connect your wallet</h1>
                    </div>
                )
                : (
                    <div>
                            {
                    (valid || preview) ? (
                        <div className="flex flex-col p-2">
                            <h1 className="font-bold text-xl my-2 text-center">{formData?.settings?.formTitle}</h1>
                            <div>
                                {
                                    formData?.formFields?.map((field, index) => {
                                        return (
                                            <div key={index} className="my-2">
                                                <label className="my-1 text-sm flex">
                                                    <span>{field?.name}</span>
                                                    {
                                                        field.required && (
                                                            <span className="text-red-500">*</span>
                                                        )
                                                    }
                                                </label>
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
                                handleSubmission()
                                }}
                                    disabled={preview}
                                    className={`border bg-black text-white p-1 mr-1 rounded-lg w-20 float-right ${preview && "bg-gray-700 cursor-not-allowed"}`}>
                                    Submit
                            </button>
                            {isLoading && <div className="text-center">Check Wallet</div>}
                            {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
                        </div>
                    )
                    : (
                        <div className="text-center my-3">{errorMessage}</div>
                    )
                }
                    </div>
                )
            }
        </>
    )
}