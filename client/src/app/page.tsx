import ChatBox from '@/components/ChatBox'
import UploadButton from '@/components/UploadButton'

export default function Home() {
	return (
		<main className="flex justify-center items-center min-h-screen">
			<div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-6">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-green-600">
						🌍 AI Planet
					</h1>
					<UploadButton />
				</header>
				<ChatBox />
			</div>
		</main>
	)
}
