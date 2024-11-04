interface MessageProps {
	sender: 'user' | 'assistant'
	text: string
}

export default function Message({ sender, text }: MessageProps) {
	const isUser = sender === 'user'
	return (
		<div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
			<div
				className={`chat-bubble ${
					isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
				}`}
			>
				{text}
			</div>
		</div>
	)
}
