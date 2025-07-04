'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'

// Material type definition
type Material = {
    id: string
    title: string
    subject: 'English' | 'Mathematics'
    type: 'past_paper' | 'textbook'
    year: number
    downloadUrl: string
    isDownloaded?: boolean
}

export default function MaterialsPage() {
    // State for filters and materials
    const [selectedSubject, setSelectedSubject] = useState<'all' | 'English' | 'Mathematics'>('all')
    const [selectedType, setSelectedType] = useState<'all' | 'past_paper' | 'textbook'>('all')
    
    // Mock data
    const [materials] = useState<Material[]>([
        {
            id: '1',
            title: 'WASSCE English Past Paper',
            subject: 'English',
            type: 'past_paper',
            year: 2023,
            downloadUrl: '#',
            isDownloaded: false
        },
        {
            id: '2',
            title: 'WASSCE Mathematics Past Paper',
            subject: 'Mathematics',
            type: 'past_paper',
            year: 2023,
            downloadUrl: '#',
            isDownloaded: true
        }
    ])
    
    // Filter logic
    const filteredMaterials = materials.filter(material => {
        if (selectedSubject !== 'all' && material.subject !== selectedSubject) return false
        if (selectedType !== 'all' && material.type !== selectedType) return false
        return true
    })
    
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Subjects</option>
                        <option value="English">English</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                    
                    <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as any)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Types</option>
                        <option value="past_paper">Past Papers</option>
                        <option value="textbook">Textbooks</option>
                    </select>
                </div>
                
                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMaterials.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center">
                            No materials found. Try adjusting your filters.
                        </p>
                    ) : (
                        filteredMaterials.map(material => (
                            <div key={material.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                                <h3 className="font-semibold text-gray-900 mb-2">{material.title}</h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Subject: {material.subject}</p>
                                    <p>Year: {material.year}</p>
                                    <p>Type: {material.type === 'past_paper' ? 'Past Paper' : 'Textbook'}</p>
                                </div>
                                <button className={`mt-4 w-full py-2 rounded ${
                                    material.isDownloaded 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}>
                                    {material.isDownloaded ? '✓ Downloaded' : 'Download'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    )
}