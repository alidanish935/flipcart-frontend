import React,{createContext,useState} from 'react'

export const DataContext = createContext();

const DataApp = (props) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0)

  const [ loading, setLoading ] = useState(false);// quantity counter
    const [account,setAccount]= useState(null)
  return (
    <DataContext.Provider value={{account,setAccount,price, setPrice,loading, setLoading,discount, setDiscount}}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataApp