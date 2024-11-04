'use client'
import ChatBox from '@/components/ChatBox'
import { useUserContext } from '@/context/UserContext'

export default function Home() {
	const { uploadedFileName } = useUserContext()
	return (
		<main className="flex justify-center items-center mt-10">
			<div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 space-y-3">
				<span className="text-center block font-semibold">
					{uploadedFileName
						? `Last Uploaded File: ${uploadedFileName}`
						: ''}
				</span>
				<ChatBox />
			</div>
		</main>
	)
}
