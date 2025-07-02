import TestConnection from '../components/TestConnection'
import RegisterForm from '../components/RegisterForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          AdamsBrain ITS - Week 1 Demo
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">API Testing</h2>
            <TestConnection />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  )
}