import { allChains, useAccount } from "wagmi";
import { Modules, ModuleOptions, defaultSettings } from "src/contstant";
import { Settings } from "@components/types/types";
import { useState } from "react";
import { useAppContext } from "@utils/AppContext";
import Link from "next/link";

const Settings = () => {
    const { fields, setFormData } = useAppContext();
    const { isConnected, address } = useAccount();
    const [moduleIndex, setModuleIndex] = useState<number>(0);
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const today = new Date().toISOString().split("T")[0];
    
    return (
        <>
            <div className="mx-10 my-5">
                <label>Form Title</label><br />
                <input onChange={(e) => {
                    setSettings({
                        ...settings,
                        formTitle: e.target.value
                    })
                }}
                    type="text" placeholder="Give your form a title"
                    className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                 /><br />
                <div className="my-1">
                    <h2 className="font-bold text-xl my-1">Token Gate</h2>
                    <div>
                        <label className="my-1">Token address</label><br />
                        <input onChange={(e) => {
                            setSettings({
                                ...settings,
                                tokenGate: {
                                    ...settings!.tokenGate,
                                    tokenAddress: e.target.value
                                }
                            })
                        }}
                            type="text" placeholder="Enter token address"
                            className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                        /><br />
                        <label className="my-1">Network</label><br />
                        <select onChange={(e) => {
                            setSettings({
                                ...settings,
                                tokenGate: {
                                    ...settings.tokenGate,
                                    networkId: parseInt(e.target.value)
                                }
                            })
                        }}
                            className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96">
                            {
                                allChains.slice(0, -3).map((chain, index) => {
                                    return (
                                        <option key={index} value={chain.id}>{chain.name}</option>
                                    )
                                })
                            }
                        </select><br />
                        <label className="my-1">Minimum token balance</label><br />
                        <input onChange={(e) => {
                            setSettings({
                                ...settings,
                                tokenGate: {
                                    ...settings.tokenGate,
                                    minimumBalance: parseInt(e.target.value)
                                }
                            })
                        }} 
                            type="number" min="1" 
                            className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                        /><br />
                    </div>
               </div>
                <div className="my-1">
                    <h2 className="font-bold text-xl my-1">Module</h2>
                    <label className="my-1">Select a module</label><br />
                    <select onChange={(e) => {
                        setModuleIndex(parseInt(e.target.value));
                        setSettings({
                            ...settings,
                            module: {
                                ...settings.module,
                                type: Modules[parseInt(e.target.value)]
                            }
                        })
                    }}
                        className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96">
                        {
                            Modules.map((module, index) => {
                                return (
                                    <option key={index} value={index}>{module}</option>
                                )
                            })
                        }
                    </select><br />
                    {
                        ModuleOptions[moduleIndex].amount && (
                            <div>
                                <label className="my-1">Fee (MATIC)</label><br />
                                <input onChange={(e) => {
                                    setSettings({
                                        ...settings,
                                        module: {
                                            ...settings.module,
                                            options: {
                                                ...settings.module.options,
                                                amount: parseInt(e.target.value)
                                            }
                                        }
                                    })
                                }}
                                    type="number"
                                    className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                                /><br />
                            </div>
                        )
                    }
                    {
                        ModuleOptions[moduleIndex].maximum && (
                            <div>
                                <label className="my-1">Maximum submissions</label><br />
                                <input onChange={(e) => {
                                    setSettings({
                                        ...settings,
                                        module: {
                                            ...settings.module,
                                            options: {
                                                ...settings.module.options,
                                                maximum: parseInt(e.target.value)
                                            }
                                        }
                                    })
                                }}
                                   type="number"
                                    className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                                /><br />
                            </div>
                        )
                    }
                    {
                        ModuleOptions[moduleIndex].expiry && (
                            <div>
                                <label className="my-1">Deadline</label><br />
                                <input onChange={(e) => {
                                    const deadline = new Date(e.target.value).getTime();
                                    setSettings({
                                        ...settings,
                                        module: {
                                            ...settings.module,
                                            options: {
                                                ...settings.module.options,
                                                expiry: deadline
                                            }
                                        }
                                    })
                                }}
                                   type="date" min={today}
                                    className="rounded-lg border border-gray-700 text-sm p-2 my-1 lg:w-96 md:w-96"
                                /><br />
                            </div>
                        )
                    }
                </div>
                <div>
                    <button onClick={() => {
                        if (isConnected) {
                            setFormData({
                                ownerAddress: address!,
                                formFields: fields,
                                settings: settings,
                                storageLink: ""
                            })
                        } else {
                            alert("Please connect your wallet")
                        }
                    }}
                        className="border bg-black text-white p-1 mr-1 rounded-lg w-20"
                    >
                        <Link href={isConnected ? "/preview" : "#"}>Preview</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Settings