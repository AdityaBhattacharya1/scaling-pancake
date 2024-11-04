'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { BsCloudUpload } from 'react-icons/bs'
import { auth } from '@/lib/firebase'

export default function FileUploadPage() {
	const [file, setFile] = useState<File | null>(null)
	const router = useRouter()
	const API_URL = process.env.NEXT_PUBLIC_API_URL

	const onDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0])
		}
		console.log(file)
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'application/pdf': ['.pdf'] },
		multiple: false,
	})

	const handleUpload = async () => {
		if (file) {
			const formData = new FormData()
			const idToken = await auth.currentUser?.uid
			formData.append('file', file)
			formData.append('userId', idToken as string)

			try {
				const response = await fetch(`${API_URL}/upload/${idToken}`, {
					method: 'POST',
					body: formData,
				})
				console.log(await response.json())
				if (response.ok) {
					alert('File uploaded successfully')
					router.push('/')
				} else {
					alert('Failed to upload file')
				}
			} catch (error) {
				console.error('Upload error:', error)
				alert('An error occurred while uploading the file.')
			}
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100">
			<h1 className="text-3xl font-bold mb-6">Upload PDF</h1>
			<div
				{...getRootProps()}
				className={`w-full max-w-lg p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${
					isDragActive
						? 'border-primary bg-gray-100'
						: 'border-gray-400'
				}`}
			>
				<input {...getInputProps()} />
				<BsCloudUpload className="text-4xl text-primary mb-4" />
				{isDragActive ? (
					<p>Drop the file here...</p>
				) : (
					<p>Drag & drop a PDF file here, or click to select one</p>
				)}
			</div>
			{file && (
				<div className="mt-4 text-center">
					<p>Selected file: {file.name}</p>
					<button
						onClick={handleUpload}
						className="btn btn-primary mt-4"
						disabled={!file}
					>
						Upload File
					</button>
				</div>
			)}
		</div>
	)
}
