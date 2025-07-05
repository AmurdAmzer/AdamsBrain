export default function TermsPage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <div className="prose max-w-none text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2>Terms</h2>
            <p>By accessing AdamsBrain, you agree to these terms...</p>
            {/* Add more content */}
          </div>
        </div>
      </div>
    )
  }