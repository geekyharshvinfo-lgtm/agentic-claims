import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Clock } from 'lucide-react';
import { Document, AgentOutput } from '@/types';
import { ClaimSpecificData } from '@/data/claimSpecificData';
import DecisionCard from '@/components/ui/DecisionCard';

interface ColumnBProps {
  documents: Document[];
  payout: number;
  setPayout: (value: number) => void;
  notes: string;
  setNotes: (value: string) => void;
  onApprove: () => void;
  agents: AgentOutput[];
  isComplete: boolean;
  claimData: ClaimSpecificData;
}

export default function ColumnB({
  documents,
  payout,
  setPayout,
  notes,
  setNotes,
  onApprove,
  agents,
  isComplete,
  claimData,
}: ColumnBProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageDocuments = documents.filter(d => d.type === 'image');
  const pdfDocuments = documents.filter(d => d.type === 'pdf');

  const nextImage = () => {
    setImageLoading(true);
    setImageError(false);
    setCurrentImageIndex((prev) => (prev + 1) % imageDocuments.length);
  };

  const prevImage = () => {
    setImageLoading(true);
    setImageError(false);
    setCurrentImageIndex((prev) => (prev - 1 + imageDocuments.length) % imageDocuments.length);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* FNOL Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">FNOL Summary</h3>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>
              <strong>Incident Location:</strong> {claimData.fnolSummary.location}<br />
              <strong>Incident Time:</strong> {claimData.fnolSummary.incidentTime} / {claimData.fnolSummary.fnolTime}<br />
              <strong>Description:</strong> {claimData.fnolSummary.description}<br />
              <strong>Weather:</strong> {claimData.fnolSummary.weather}<br />
              <strong>Injuries:</strong> {claimData.fnolSummary.injuries}
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
          <div className="relative bg-gray-900">
            {/* Main Image */}
            <div className="aspect-video relative bg-black">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
              )}
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center p-8">
                    <p className="text-lg font-medium text-gray-300">
                      {imageDocuments[currentImageIndex]?.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Image unavailable
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageDocuments[currentImageIndex]?.url}
                  alt={imageDocuments[currentImageIndex]?.name}
                  className="w-full h-full object-contain"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
              
              {/* Hotspot indicators overlay - only show when image is loaded */}
              {!imageLoading && !imageError && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-white">Front damage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-white">Impact zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-xs text-white">Secondary damage</span>
                  </div>
                </div>
              )}
              
              {/* Image filename overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
                <p className="text-xs text-white font-medium">
                  {imageDocuments[currentImageIndex]?.name}
                </p>
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
                onClick={() => {
                  setImageLoading(true);
                  setImageError(false);
                  setCurrentImageIndex(idx);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all overflow-hidden ${
                  idx === currentImageIndex
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img
                  src={doc.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
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

        {/* Decision Card - Only show when agents complete */}
        {isComplete ? (
          <DecisionCard
            payout={payout}
            setPayout={setPayout}
            notes={notes}
            setNotes={setNotes}
            onApprove={onApprove}
            agents={agents}
            claimData={claimData}
          />
        ) : (
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                AI Analysis in Progress
              </h3>
              <p className="text-sm text-gray-500">
                Settlement recommendation will appear once all agents complete their investigation.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                <span>Analyzing documents, images, and claim details...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
