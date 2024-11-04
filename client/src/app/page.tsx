import ChatBox from '@/components/ChatBox'

export default function Home() {
	return (
		<main className="flex justify-center items-center mt-10">
			<div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-6">
				<ChatBox />
			</div>
		</main>
	)
}
