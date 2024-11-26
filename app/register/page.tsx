'use client'

import { useState, useEffect } from 'react'
import { Button, Input, Card, CardBody, CardHeader } from '@nextui-org/react'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        localStorage.setItem('supabase_token', session.access_token)
        router.push('/profile')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    })

    if (error) {
      setError(error.message)
    } else if (data.user) {
      // Update the user's metadata with the username
      const { error: updateError } = await supabase.auth.updateUser({
        data: { username: username }
      })

      if (updateError) {
        setError(updateError.message)
      } else {
        router.push('/profile')
      }
    }
  }

  const handleGoogleSignUp = async () => {
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Register</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" color="primary" fullWidth>
              Register
            </Button>
          </form>
          <div className="my-4 flex items-center justify-between">
            <hr className="w-full" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full" />
          </div>
          <Button 
            onClick={handleGoogleSignUp} 
            color="secondary" 
            fullWidth
          >
            Sign up with Google
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}