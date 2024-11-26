'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('supabase_token')
      
      if (!token) {
        router.push('/login')
        return
      }

      supabase.auth.setSession({ access_token: token, refresh_token: '' })

      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          throw error || new Error('User not found')
        }

        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        localStorage.removeItem('supabase_token')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('supabase_token')
    router.push('/login')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Profile</h1>
        </CardHeader>
        <CardBody>
          <p><strong>Username:</strong> {user.user_metadata.username || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <Button 
            onClick={handleSignOut} 
            color="primary" 
            className="mt-4"
            fullWidth
          >
            Sign Out
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}