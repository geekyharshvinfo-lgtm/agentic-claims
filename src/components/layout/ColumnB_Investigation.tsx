import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Claim, Document, AgentOutput } from '@/types';
import DecisionCard from '@/components/ui/DecisionCard';

interface ColumnBProps {
  claim: Claim;
  documents: Document[];
  payout: number;
  setPayout: (value: number) => void;
  notes: string;
  setNotes: (value: string) => void;
  onApprove: () => void;
  agents: AgentOutput[];
}

export default function ColumnB({
  claim,
  documents,
  payout,
  setPayout,
  notes,
  setNotes,
  onApprove,
  agents,
}: ColumnBProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const imageDocuments = documents.filter(d => d.type === 'image');
  const pdfDocuments = documents.filter(d => d.type === 'pdf');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageDocuments.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageDocuments.length) % imageDocuments.length);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* FNOL Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">FNOL Summary</h3>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>
              <strong>Incident Location:</strong> MG Road intersection, Mumbai<br />
              <strong>Incident Time:</strong> 15 Oct 2025, 22:50 (Police report) / 23:40 (FNOL filing)<br />
              <strong>Description:</strong> Single-vehicle collision with barrier. Claimant stated "rear impact" but evidence suggests front-left collision.<br />
              <strong>Weather:</strong> Clear, dry conditions<br />
              <strong>Injuries:</strong> None reported
            </p>
          </div>
        </div>

        {/* Image Viewer with Carousel */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">
              Vehicle Damage Photos ({currentImageIndex + 1}/{imageDocuments.length})
            </h3>
          </div>
          <div className="relative bg-gray-100">
            {/* Main Image */}
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 relative">
              <div className="text-center p-8">
                <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">
                  {imageDocuments[currentImageIndex]?.name}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Damage visualization: Front-left bumper, headlight, and hood
                </p>
                {/* Hotspot indicators */}
                <div className="mt-6 flex justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-600">Bumper damage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-600">Headlight shattered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-600">Hood dent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
              disabled={imageDocuments.length <= 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
              disabled={imageDocuments.length <= 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
            {imageDocuments.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all ${
                  idx === currentImageIndex
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-300 hover:border-gray-400'
                } bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}
              >
                <span className="text-xs text-gray-600 font-medium">#{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Documents</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {pdfDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-400 hover:bg-primary-50/50 transition-all text-left group"
                >
                  <div className="text-sm font-medium text-gray-900 group-hover:text-primary-700 mb-1">
                    {doc.name}
                  </div>
                  <div className="text-xs text-gray-500">Click to view</div>
                </button>
              ))}
            </div>
            {selectedDoc && (
              <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Viewing:</strong> {selectedDoc.name}
                </p>
                <p className="text-xs text-gray-500">
                  PDF viewer would display here. Content includes: incident details, witness statements, damage assessment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decision Card */}
        <DecisionCard
          payout={payout}
          setPayout={setPayout}
          notes={notes}
          setNotes={setNotes}
          onApprove={onApprove}
          agents={agents}
        />
      </div>
    </div>
  );
}
