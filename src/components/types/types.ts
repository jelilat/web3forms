export type Module = 
| 'Free' 
| 'Fee' 
| 'LimitedFree'
| 'LimitedFee'
| 'LimitedTimedFree'
| 'LimitedTimedFee'
| 'TimedFree'
| 'TimedFee';

export type free = null

export type fee = {
    amount: number
}

export type limitedFree = {
    maximum: number
}

export type limitedFee = {
    amount: number,
    maximum: number
}

export type limitedTimedFree = {
    expiry: number,
    maximum: number
}

export type limitedTimedFee = {
    amount: number,
    expiry: number,
    maximum: number
}

export type timedFree = {
    expiry: number
}

export type timedFee = {
    amount: number,
    expiry: number
}

export type ModuleType = 
| free
| fee
| limitedFree
| limitedFee
| limitedTimedFree
| limitedTimedFee
| timedFree
| timedFee;

export type TokenGate = {
    tokenAddress: string,
    networkId: number,
    minimumBalance: number,
}
export type Settings = {
    formTitle: string,
    module: {
        type: Module,
        options: ModuleType,
    },
    tokenGate: TokenGate,
}

export type FormFieldType = {
    id: string,
    name: string,
    icon: string,
    description?: string,
    options?: Array<string>,
    type?: string,
    placeholder?: string,
    required: boolean,
}

export type FormData = {
    ownerAddress: string,
    formFields: FormFieldType[],
    settings: Settings,
    storageLink: string,
}

export type FormSubmission = {
    name: string,
    value: string
}

export type CreateSpreadsheet = {
    title: string,
    headers: string[],
}
