'use client'

import { useEffect, useState } from 'react'
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
	const [user, setUser] = useState<User | null>(null)
	const router = useRouter()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser)
		})
		return () => unsubscribe()
	}, [])

	const handleLogin = async () => {
		try {
			await signInWithPopup(auth, googleProvider)
		} catch (error) {
			console.error('Error signing in with Google', error)
		}
	}

	const handleLogout = async () => {
		await signOut(auth)
		setUser(null)
	}

	return (
		<nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
			<h1 className="text-xl font-semibold text-green-600">
				🌍 AI Planet
			</h1>
			<div>
				{user ? (
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img
									src={user.photoURL || '/default-avatar.png'}
									alt="User avatar"
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
						>
							<li>
								<button onClick={handleLogout}>Logout</button>
							</li>
						</ul>
					</div>
				) : (
					<button onClick={handleLogin} className="btn btn-primary">
						Login | Signup
					</button>
				)}
			</div>
		</nav>
	)
}
