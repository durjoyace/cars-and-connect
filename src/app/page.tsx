import Link from 'next/link'
import { ArrowRight, Car, Trophy, Users, Zap, Star, History } from 'lucide-react'
import { Button } from '@/components/ui'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 retro-grid opacity-30" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Header */}
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-blue rounded-xl flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                Cars & Connection
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="neon">Get Started</Button>
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink/20 rounded-full text-neon-pink text-sm font-medium mb-6 animate-neon-pulse">
              <Zap size={16} />
              Daily Challenges Are Live
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Real Car Culture
              </span>
              <br />
              <span className="bg-gradient-to-r from-neon-pink via-neon-blue to-neon-pink bg-clip-text text-transparent">
                Meets Pop Nostalgia
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Build dream garages, compete in themed challenges, and connect with fellow enthusiasts.
              From Fast & Furious vibes to Bring a Trailer deep dives.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button variant="neon" size="lg" className="group">
                  Start Your Garage
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/challenges">
                <Button variant="secondary" size="lg">
                  <Trophy className="mr-2" size={20} />
                  View Challenges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-retro-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Flex
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you&apos;re building a Tokyo Drift dream team or tracking auction histories,
              we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Daily Challenges"
              description="Gran Turismo tributes, Top Gear budget challenges, Doug DeMuro oddball hunts, and more. New challenge every day."
              color="pink"
            />
            <FeatureCard
              icon={<Car className="w-8 h-8" />}
              title="Real Car Data"
              description="VINs, auction histories, provenance timelines, and collector stats. Never just surface-level."
              color="blue"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Social Unlocks"
              description="Bring friends, unlock features. From sticker packs to VIP garage themes, progression is social."
              color="green"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Pop Culture Mode"
              description="Toggle between movie trivia, retro aesthetics, and serious collector mode. Your choice."
              color="orange"
            />
            <FeatureCard
              icon={<Star className="w-8 h-8" />}
              title="Themed Garages"
              description="Build &apos;Seinfeld&apos;s Porsches&apos;, &apos;Tokyo Drift Tuners&apos;, or &apos;Radwood Legends&apos;. Each unlockable."
              color="purple"
            />
            <FeatureCard
              icon={<History className="w-8 h-8" />}
              title="Provenance Deep Dives"
              description="Owner histories, magazine features, and auction records. Serious bragging rights for serious enthusiasts."
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Challenge Themes Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Challenges Inspired By
            </h2>
            <p className="text-gray-400">
              Every challenge pays homage to car culture legends
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Gran Turismo', emoji: '🏁' },
              { name: 'Fast & Furious', emoji: '🔥' },
              { name: 'Top Gear', emoji: '🇬🇧' },
              { name: 'Doug DeMuro', emoji: '🤓' },
              { name: 'Radwood', emoji: '📼' },
              { name: 'BaT Auctions', emoji: '🔨' },
            ].map((theme) => (
              <div
                key={theme.name}
                className="p-6 bg-retro-purple/30 rounded-xl border border-retro-purple/50 text-center hover:border-neon-pink/50 hover:bg-retro-purple/50 transition-all cursor-pointer"
              >
                <span className="text-4xl mb-3 block">{theme.emoji}</span>
                <span className="text-sm font-medium text-gray-300">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-blue/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Garage?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of enthusiasts who are already competing, collecting, and connecting.
          </p>
          <Link href="/auth/signup">
            <Button variant="neon" size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-retro-purple/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Cars & Connection</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Cars & Connection. Built for car lovers.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  const colors: Record<string, string> = {
    pink: 'from-neon-pink/20 to-transparent border-neon-pink/30 text-neon-pink',
    blue: 'from-neon-blue/20 to-transparent border-neon-blue/30 text-neon-blue',
    green: 'from-neon-green/20 to-transparent border-neon-green/30 text-neon-green',
    orange: 'from-neon-orange/20 to-transparent border-neon-orange/30 text-neon-orange',
    purple: 'from-purple-500/20 to-transparent border-purple-500/30 text-purple-400',
    yellow: 'from-yellow-500/20 to-transparent border-yellow-500/30 text-yellow-400',
  }

  return (
    <div className={`p-6 rounded-xl bg-gradient-to-b ${colors[color]} border backdrop-blur-sm`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
