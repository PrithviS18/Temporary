import { useState,createContext} from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) =>{
    const [darkmode,setdarkmode] = useState(true)

    return (
        <ThemeContext.Provider value={{darkmode,setdarkmode}} >
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeContext;