'use client'
import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import Message from './Message'

interface Message {
	sender: 'user' | 'assistant'
	text: string
}

export default function ChatBox() {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')
	const [userId, setUserId] = useState<string | null>(null)
	const API_URL = process.env.NEXT_PUBLIC_API_URL

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUserId(user?.uid || null)
		})
		return () => unsubscribe()
	}, [])

	const handleSend = async () => {
		console.log(messages)
		if (input.trim() && userId) {
			const idToken = auth.currentUser?.uid
			setMessages([...messages, { sender: 'user', text: input }]) // update messages to include user's message
			setInput('')
			const response = await fetch(`${API_URL}/query/${idToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
				body: JSON.stringify({
					question: input,
					chat_history: messages,
				}),
			})
			const data = await response.json()
			console.log(data)
			setMessages([
				...messages,
				{ sender: 'user', text: input },
				{ sender: 'assistant', text: data.answer },
			]) // update messages again to include the ai response as well
		}
	}

	return (
		<div className="flex flex-col h-[40rem] border border-gray-300 rounded-lg p-4 overflow-hidden">
			<div className="flex-grow overflow-y-auto space-y-3">
				{messages.map((msg, idx) => (
					<Message key={idx} sender={msg.sender} text={msg.text} />
				))}
			</div>
			<div className="mt-4">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={
						auth.currentUser ? 'Send a message...' : 'Login to chat' // only allow user to chat if logged in
					}
					className="input input-bordered w-full"
					onKeyDown={(e) => e.key === 'Enter' && handleSend()}
					disabled={!!!auth.currentUser}
				/>
			</div>
		</div>
	)
}
