import TestConnection from '../components/TestConnection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          AdamsBrain - Development Test
        </h1>
        <TestConnection />
      </div>
    </main>
  )
}