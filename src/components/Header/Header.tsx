import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Modal } from '@components/UI/Modal';
import Connect from './Connect'
import { useAccount } from 'wagmi'

const Header = () => {
    const { address, isConnected } = useAccount()
    const [connectModal, setConnectModal] = useState<boolean>(false)
    const [navOpen, setNavOpen] = useState<boolean>(false)

    return (
        <>
            <div className="flex text-sm p-3 border-b-2 border-b-black-500 sticky top-0 bg-white">
                <div className="w-1/2 float-right p-2 font-semibold">
                    Web3Forms
                </div>
                
                <div className="w-1/2 flex justify-end">
                    <button className="rounded-lg bg-black text-white p-2"
                        onClick={() => {
                            setConnectModal(true)
                        }}
                        data-bs-toggle="modal">
                        {!isConnected || address == undefined ? 
                            "Connect wallet"
                            : (address)?.slice(0, 6) + "..." + (address)?.slice(-4)
                            }
                    </button>
                    <Modal
                        active={connectModal}
                        onClose={()=>{
                            setConnectModal(false)
                        }}>
                            <Connect />
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Header