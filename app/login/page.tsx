'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useLang } from '@/contexts/lang-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogIn, Chrome } from 'lucide-react'

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const { isAr } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [tab, setTab] = useState('email')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      console.error(err)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isAr ? 'تسجيل الدخول' : 'Sign In'}
          </CardTitle>
          <CardDescription>
            {isAr ? 'تسجيل الدخول إلى لوحة التحكم' : 'Sign in to your dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">
                <LogIn className="h-4 w-4 mr-2" />
                {isAr ? 'البريد الإلكتروني' : 'Email'}
              </TabsTrigger>
              <TabsTrigger value="google">
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={isAr ? 'example@domain.com' : 'example@domain.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{isAr ? 'كلمة المرور' : 'Password'}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading
                    ? isAr ? 'جاري التحميل...' : 'Loading...'
                    : isAr ? 'تسجيل الدخول' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="google">
              <div className="space-y-4 py-2">
                <p className="text-sm text-center text-muted-foreground">
                  {isAr ? 'تسجيل الدخول باستخدام حساب جوجل' : 'Sign in with your Google account'}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-3 h-11 border-2 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950 transition-all"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                <Chrome className="h-5 w-5 text-teal-600" />
                {googleLoading
                  ? isAr ? 'جاري التحميل...' : 'Loading...'
                  : isAr ? 'تسجيل الدخول عبر جوجل' : 'Continue with Google'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
