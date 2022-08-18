import { 
    createContext, 
    Dispatch, 
    ReactNode, 
    SetStateAction, 
    useContext,
    useState 
  } from 'react';
  import { FormFieldType } from '@components/types/types';
  
  export interface ContextType {
      address: string | undefined;
      fields: FormFieldType[];
      setUserAddress: Dispatch<SetStateAction<string>>;
      setFields: Dispatch<SetStateAction<FormFieldType[]>>;
    }
  
  type Props = {
    children: ReactNode;
  };
    
  const AppContext = createContext<ContextType>({
    address: undefined,
    fields: [],
    setUserAddress: () => {},
    setFields: () => {},
  })
  
  export function AppWrapper({ children }: Props) {
    const [address, setUserAddress] = useState("")
    const [fields, setFields] = useState<FormFieldType[]>([])
    const value = {
      address,
      fields,
      setUserAddress,
      setFields
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