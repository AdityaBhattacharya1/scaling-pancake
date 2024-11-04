'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
	uploadedFileName: string | null
	setUploadedFileName: (fileName: string | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [uploadedFileName, setUploadedFileName] = useState<string | null>(
		null
	)

	return (
		<UserContext.Provider value={{ uploadedFileName, setUploadedFileName }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
