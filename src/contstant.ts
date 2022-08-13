export type FormFieldType = {
    id: string,
    name: string,
    icon: string,
    description?: string,
    options?: Array<string>,
    type?: Array<string>,
    placeholder?: string
}

export const FileTypes = ['img/png', 'img/jpg', 'img/jpeg', 'img/gif', 'file/pdf', 'file/doc', 'file/docx', 'file/xls', 'file/xlsx', 'file/csv', 'file/txt']

export const FormFields = [
    {
        id: 'short-text',
        name: 'Short Text',
        icon: "",
        description: "",
        placeholder: "Enter short text",
    },
    {
        id: 'long-text',
        name: 'Long Text',
        icon: "",
        description: "",
        placeholder: "Enter long text",
    },
    {
        id: 'number',
        name: 'Number Field',
        icon: "",
        description: "",
        placeholder: "0",
    },
    {
        id: 'single-select',
        name: 'Single Select',
        icon: "",
        description: "",
        options: [],
        placeholder: "Select an option",
    },
    {
        id: 'multi-select',
        name: 'Multi Select',
        icon: "",
        description: "",
        options: [],
        placeholder: "Select an option",
    },
    {
        id: 'radio',
        name: 'Radio',
        icon: "",
        description: "",
        options: [],
        placeholder: "Select an option",
    },
    {
        id: 'checkbox',
        name: 'Checkbox',
        icon: "",
        description: "",
        options: []
    },
    {
        id: 'file',
        name: 'File upload',
        icon: "",
        description: "",
        type: FileTypes,
        placeholder: "Upload a file"
    },
    {
        id: 'date',
        name: 'Date',
        icon: "",
        description: "",
        placeholder: "Select a date"
    },
    {
        id: 'time',
        name: 'Time',
        icon: "",
        description: "",
        placeholder: "Select a time"
    },
    {
        id: 'datetime',
        name: 'DateTime',
        icon: "",
        description: "",
        placeholder: "Select a date and time"
    }
];