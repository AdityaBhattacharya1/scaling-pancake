import Navbar from '@/components/Navbar'
import './globals.css'
import { ReactNode } from 'react'
import { UserProvider } from '@/context/UserContext'

export const metadata = {
	title: 'AI Chat with PDF Upload',
	description: 'Chat interface with PDF upload functionality',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-800 font-sans">
				<UserProvider>
					<Navbar />
					{children}
				</UserProvider>
			</body>
		</html>
	)
}
