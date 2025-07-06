'use client'
import { useState } from 'react'
import AppLayout from '@/components/layout/AppLayout'

// Material type definition
type Material = {
    id: string
    title: string
    subject: 'English' | 'Mathematics'
    type: 'past_questions' | 'textbook'
    year: number
    downloadUrl: string
    isDownloaded?: boolean
}

export default function MaterialsPage() {
    // State for filters and materials
    const [selectedSubject, setSelectedSubject] = useState<'all' | 'English' | 'Mathematics'>('all')
    const [selectedType, setSelectedType] = useState<'all' | 'past_questions' | 'textbook'>('all')
    
    // Mock data
    const [materials] = useState<Material[]>([
        {
            id: '1',
            title: 'WASSCE English Past questions',
            subject: 'English',
            type: 'past_questions',
            year: 2023,
            downloadUrl: '#',
            isDownloaded: false
        },
        {
            id: '2',
            title: 'WASSCE Mathematics Past questions',
            subject: 'Mathematics',
            type: 'past_questions',
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
                {/* Enhanced Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Materials</h2>
                    <div className="flex flex-wrap gap-4">
                        <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value as 'all' | 'English' | 'Mathematics')}
                        className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                        <option value="all">📚 All Subjects</option>
                        <option value="English">English Language</option>
                        <option value="Mathematics">Core Mathematics</option>
                        </select>
                        
                        <select 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as 'all' | 'past_questions' | 'textbook')}
                        className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                        <option value="all">📄 All Types</option>
                        <option value="past_paper">📝 Past Questions</option>
                        <option value="textbook">📖 Notes</option>
                        </select>
                    </div>
                    </div>
                
                {/* Enhanced Material Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map(material => (
                    <div 
                    key={material.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                    {/* Card Header with Subject Color */}
                    <div className={`h-2 ${material.subject === 'English' ? 'bg-green-300' : 'bg-blue-300'}`}></div>
                    
                    <div className="p-6">
                        {/* Subject Badge */}
                        <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            material.subject === 'English' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                            {material.subject}
                        </span>
                        <span className="text-sm text-gray-500">{material.year}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {material.title}
                        </h3>
                        
                        {/* Type with Icon */}
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span className="mr-2">{material.type === 'past_questions' ? '📝' : '📖'}</span>
                        {material.type === 'past_questions' ? 'Past Question' : 'Textbook'}
                        </div>
                        
                        {/* Download Button */}
                        <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                        material.isDownloaded 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                        }`}>
                        {material.isDownloaded ? (
                            <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Downloaded
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            Download
                            </span>
                        )}
                        </button>
                    </div>
                    </div>
                ))}
                </div> 
                </div>
            </AppLayout>
    );
}