interface MessageProps {
	sender: 'user' | 'assistant'
	text: string
	type: 'skeleton' | 'normal'
}

export default function Message({ sender, text, type }: MessageProps) {
	const isUser = sender === 'user'
	return (
		<div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
			{type === 'normal' ? (
				<div
					className={`chat-bubble ${
						isUser
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-black'
					}`}
				>
					{text}
				</div>
			) : (
				<div className="chat-bubble skeleton h-8 w-24"></div>
			)}
		</div>
	)
}
