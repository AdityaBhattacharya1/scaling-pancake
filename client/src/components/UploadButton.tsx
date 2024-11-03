'use client'

import { useState } from 'react'

export default function UploadButton() {
	const [loading, setLoading] = useState(false)

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0]
		if (file) {
			setLoading(true)
			setTimeout(() => setLoading(false), 2000)
		}
	}

	return (
		<label className="btn btn-outline">
			{loading ? 'Uploading...' : 'Upload PDF'}
			<input
				type="file"
				accept=".pdf"
				className="hidden"
				onChange={handleFileUpload}
			/>
		</label>
	)
}
