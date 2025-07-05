export default function PrivacyPage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
          <div className="prose max-w-none text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide when creating an account...</p>
            {/* Add more content */}
          </div>
        </div>
      </div>
    )
  }