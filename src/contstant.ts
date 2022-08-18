import { Module, Settings } from '@components/types/types';

export const FileTypes = ['img/png', 'img/jpg', 'img/jpeg', 'img/gif', 'file/pdf', 'file/doc', 'file/docx', 'file/xls', 'file/xlsx', 'file/csv', 'file/txt']

export const FormFields = [
    {
        id: 'text',
        name: 'Short Text',
        icon: "",
        description: "",
        type: "input",
        placeholder: "Enter short text",
        required: false,
    },
    {
        id: 'long-text',
        name: 'Long Text',
        icon: "",
        type: "textarea",
        description: "",
        placeholder: "Enter long text",
        required: false,
    },
    {
        id: 'number',
        name: 'Number Field',
        icon: "",
        description: "",
        type: "input",
        placeholder: "0",
        required: false,
    },
    {
        id: 'single-select',
        name: 'Single Select',
        icon: "",
        description: "",
        options: [],
        placeholder: "Select an option",
        required: false,
    },
    {
        id: 'multi-select',
        name: 'Multi Select',
        icon: "",
        description: "",
        options: [],
        placeholder: "Select an option",
        required: false,
    },
    {
        id: 'radio',
        name: 'Radio',
        icon: "",
        description: "",
        type: 'choice',
        options: [],
        placeholder: "Select an option",
        required: false,
    },
    {
        id: 'checkbox',
        name: 'Checkbox',
        icon: "",
        description: "",
        type: 'choice',
        options: [],
        required: false,
    },
    {
        id: 'file',
        name: 'File upload',
        icon: "",
        description: "",
        type: "input",
        placeholder: "Upload a file",
        required: false,
    },
    {
        id: 'date',
        name: 'Date',
        icon: "",
        description: "",
        type: "input",
        placeholder: "Select a date",
        required: false,
    },
    {
        id: 'time',
        name: 'Time',
        icon: "",
        description: "",
        type: "input",
        placeholder: "Select a time",
        required: false,
    },
    {
        id: 'datetime',
        name: 'DateTime',
        icon: "",
        description: "",
        placeholder: "Select a date and time",
        required: false,
    }
];

export const Modules: Array<Module> = [
    'Free',
    'Fee',
    'LimitedFree',
    'LimitedFee',
    'LimitedTimedFree',
    'LimitedTimedFee',
    'TimedFree',
    'TimedFee',
]

export const ModuleOptions = [
    {
        amount: false,
        maximum: false,
        expiry: false,
    },
    {
        amount: true,
        maximum: false,
        expiry: false,
    },
    {
        amount: false,
        maximum: true,
        expiry: false,
    },
    {
        amount: true,
        maximum: true,
        expiry: false,
    },
    {
        amount: false,
        maximum: true,
        expiry: true,
    },
    {
        amount: true,
        maximum: true,
        expiry: true,
    },
    {
        amount: false,
        maximum: false,
        expiry: true,
    },
    {
        amount: true,
        maximum: false,
        expiry: true,
    }
]

export const defaultSettings: Settings = {
    formTitle: '',
    module: {
        type: 'Free',
        options: null
    },
    tokenGate: {
        tokenAddress: '',
        networkId: 137,
        minimumBalance: 1,
    },
}