import React,{createContext,useState} from 'react'

export const DataContext = createContext();

const DataApp = (props) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0)

  const [ conloading, setconLoading ] = useState(false);// quantity counter
    const [account,setAccount]= useState(null)
  return (
    <DataContext.Provider value={{account,setAccount,price, setPrice,conloading, setconLoading,discount, setDiscount}}>
        {props.children}
    </DataContext.Provider>
  )
}

export default DataApp