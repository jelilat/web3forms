import { 
    createContext, 
    Dispatch, 
    ReactNode, 
    SetStateAction, 
    useContext,
    useState 
  } from 'react';
  import { FormFieldType, FormData, FormSubmission } from '@components/types/types';
  
  export interface ContextType {
      address: string | undefined;
      fields: FormFieldType[];
      formData: FormData | undefined;
      submission: FormSubmission[];
      setUserAddress: Dispatch<SetStateAction<string>>;
      setFields: Dispatch<SetStateAction<FormFieldType[]>>;
      setFormData: Dispatch<SetStateAction<FormData | undefined>>;
      setSubmission: Dispatch<SetStateAction<FormSubmission[]>>;
    }
  
  type Props = {
    children: ReactNode;
  };
    
  const AppContext = createContext<ContextType>({
    address: undefined,
    fields: [],
    formData: undefined,
    submission: [],
    setUserAddress: () => {},
    setFields: () => {},
    setFormData: () => {},
    setSubmission: () => {}
  })
  
  export function AppWrapper({ children }: Props) {
    const [address, setUserAddress] = useState("")
    const [fields, setFields] = useState<FormFieldType[]>([])
    const [formData, setFormData] = useState<FormData>()
    const [submission, setSubmission] = useState<FormSubmission[]>([])

    const value = {
      address,
      fields,
      formData,
      submission,
      setUserAddress,
      setFields,
      setFormData,
      setSubmission
    }
  
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  }
  
  export const useAppContext = () => {
    return useContext(AppContext)
  }
    
  export default AppContext