/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

// 🧠 SaleContext tracks if a new sale has been made so other pages can react
export const SaleContext = createContext()

export const SaleProvider = ({ children }) => {
    const [saleUpdated, setSaleUpdated] = useState(false)

    const triggerSaleUpdate = () => {
        setSaleUpdated((prev) => !prev) // toggle to signal a change
    }

    return (
        <SaleContext.Provider value={{ saleUpdated, triggerSaleUpdate }}>
        {children}
        </SaleContext.Provider>
    )
}
