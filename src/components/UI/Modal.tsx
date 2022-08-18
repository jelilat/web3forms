
import React, { FC, Fragment, ReactNode } from 'react'
import { XIcon } from '@heroicons/react/solid'

interface ModalProps {
    children: ReactNode[] | ReactNode;
    active: boolean;
    onClose: () => void;
}
export const Modal = ({...ModalProps}: ModalProps) => {
    return (
        <div>
            {
                ModalProps.active && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity ">
                        <div className="flex justify-left items-center min-h-screen sm:block sm:p-0">
                            <div className="flex h-screen justify-center items-center ">
                                <div className="flex-col bg-white p-4 border-2 rounded-lg opacity-1000">
                                    <XIcon className="w-3 float-right cursor-pointer"
                                        onClick={() => {
                                            ModalProps.onClose()
                                        }}
                                    />
                                    {ModalProps.children}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}