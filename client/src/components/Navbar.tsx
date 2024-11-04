'use client'

import { useEffect, useState } from 'react'
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GoPlusCircle } from 'react-icons/go'

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
	console.log(user?.photoURL)

	return (
		<nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
			<Link className="text-xl font-semibold text-green-600" href="/">
				🌍 AI Planet
			</Link>
			<div>
				{user ? (
					<div className="flex items-center gap-5 flex-row">
						<div>
							<Link
								href="/fileupload"
								className="btn btn-sm btn-outline"
							>
								<GoPlusCircle />
								Upload PDF
							</Link>
						</div>
						<div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									{user.photoURL ? (
										<img
											src={user.photoURL}
											alt="User avatar"
										/>
									) : (
										<span className="text-3xl">
											{user.displayName?.substring(0, 1)}
										</span>
									)}
								</div>
							</label>

							<ul
								tabIndex={0}
								className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<button onClick={handleLogout}>
										Logout
									</button>
								</li>
							</ul>
						</div>
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
