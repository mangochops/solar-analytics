//import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
  //const supabase = await createClient()

  //const {
    //data: { user },
 // } = await supabase.auth.getUser()

  //if (user) {
    //redirect('/dashboard')
  //}

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-3xl font-bold mx-auto">
            ☀️
          </div>
          <h1 className="text-4xl font-bold text-foreground">SolarSync Kenya</h1>
          <p className="text-muted-foreground">Real-time solar energy analytics for Kenya</p>
        </div>

        <div className="space-y-4">
          <p className="text-foreground">
            Monitor your solar energy system in real-time with advanced analytics and insights specific to Kenyan locations.
          </p>

          <div className="space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
