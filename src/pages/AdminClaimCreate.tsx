import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Home, Upload, Save, Plus } from 'lucide-react';
import { ClaimStatus, SLARisk } from '../types';

interface ClaimFormData {
  claimantName: string;
  vehicle: string;
  incidentDate: string;
  incidentLocation: string;
  description: string;
  status: ClaimStatus;
  slaRisk: SLARisk;
  estimatedAmount: string;
}

const defaultFormData: ClaimFormData = {
  claimantName: '',
  vehicle: '',
  incidentDate: '',
  incidentLocation: '',
  description: '',
  status: 'New',
  slaRisk: 'Medium',
  estimatedAmount: '',
};

const claimTemplates = {
  'Auto Collision': {
    claimantName: '',
    vehicle: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentLocation: '',
    description: 'Vehicle collision incident',
    status: 'New' as ClaimStatus,
    slaRisk: 'Medium' as SLARisk,
    estimatedAmount: '',
  },
  'Property Damage': {
    claimantName: '',
    vehicle: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentLocation: '',
    description: 'Property damage claim',
    status: 'New' as ClaimStatus,
    slaRisk: 'Low' as SLARisk,
    estimatedAmount: '',
  },
  'Theft': {
    claimantName: '',
    vehicle: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentLocation: '',
    description: 'Vehicle theft incident',
    status: 'New' as ClaimStatus,
    slaRisk: 'High' as SLARisk,
    estimatedAmount: '',
  },
};

export default function AdminClaimCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClaimFormData>(defaultFormData);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleTemplateSelect = (template: keyof typeof claimTemplates) => {
    setFormData(claimTemplates[template]);
  };

  const generateClaimId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `AC-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim = {
      id: generateClaimId(),
      ...formData,
      fnolDate: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };
    
    console.log('Creating new claim:', newClaim);
    console.log('Uploaded files:', uploadedFiles);
    
    alert(`Claim ${newClaim.id} created successfully!`);
    navigate('/claims');
  };

  const handleBulkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBulkFile(e.target.files[0]);
    }
  };

  const handleBulkUploadSubmit = () => {
    if (!bulkFile) {
      alert('Please select a file to upload');
      return;
    }

    // Process the JSON file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        console.log('Bulk upload data:', json);
        alert(`Successfully processed ${Array.isArray(json) ? json.length : 1} claim(s)!`);
        setShowBulkUpload(false);
        setBulkFile(null);
        navigate('/claims');
      } catch (error) {
        alert('Invalid JSON file format. Please check your file.');
      }
    };
    reader.readAsText(bulkFile);
  };

  const downloadSampleSchema = () => {
    const sampleSchema = [
      {
        claimantName: 'John Doe',
        vehicle: '2020 Honda Civic (ABC123)',
        incidentDate: '2024-01-15',
        incidentLocation: '123 Main St, City',
        description: 'Vehicle collision at intersection',
        status: 'New',
        slaRisk: 'Medium',
        estimatedAmount: '50000'
      },
      {
        claimantName: 'Jane Smith',
        vehicle: '2019 Toyota Camry (XYZ789)',
        incidentDate: '2024-01-16',
        incidentLocation: '456 Oak Ave, Town',
        description: 'Rear-end collision',
        status: 'New',
        slaRisk: 'High',
        estimatedAmount: '75000'
      }
    ];

    const blob = new Blob([JSON.stringify(sampleSchema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-claims-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Claim</h1>
                <p className="text-sm text-gray-500">Manually add a claim to the system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/claims"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FileText className="w-4 h-4" />
                Claims
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Templates */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(claimTemplates).map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateSelect(template as keyof typeof claimTemplates)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">{template}</p>
                <p className="text-sm text-gray-600 mt-1">Pre-filled template</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Upload Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors border-2 border-green-500"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload Claims
          </button>
        </div>

        {/* Claim Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Claim Details</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Claimant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claimant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="claimantName"
                value={formData.claimantName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Vehicle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="2020 Honda Civic (ABC123)"
              />
            </div>

            {/* Incident Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Incident Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Location
              </label>
              <input
                type="text"
                name="incidentLocation"
                value={formData.incidentLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main St, City"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="New">New</option>
                <option value="Investigating">Investigating</option>
                <option value="Ready to Approve">Ready to Approve</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* SLA Risk */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SLA Risk
              </label>
              <select
                name="slaRisk"
                value={formData.slaRisk}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Estimated Amount */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Amount (₹)
              </label>
              <input
                type="number"
                name="estimatedAmount"
                value={formData.estimatedAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50000"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the incident..."
              />
            </div>

            {/* File Upload */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Documents/Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors text-sm font-medium"
                >
                  Browse Files
                </label>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Uploaded Files ({uploadedFiles.length}):
                    </p>
                    <ul className="space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/claims')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Create Claim
            </button>
          </div>
        </form>

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bulk Upload Claims</h2>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  Upload a JSON file containing multiple claims. Each claim should follow the required schema format.
                </p>
                
                <button
                  onClick={downloadSampleSchema}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium mb-4"
                >
                  <FileText className="w-4 h-4" />
                  Download Sample JSON Schema
                </button>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    {bulkFile ? bulkFile.name : 'Select a JSON file to upload'}
                  </p>
                  <input
                    type="file"
                    onChange={handleBulkFileUpload}
                    className="hidden"
                    id="bulk-file-upload"
                    accept=".json"
                  />
                  <label
                    htmlFor="bulk-file-upload"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors text-sm font-medium"
                  >
                    {bulkFile ? 'Change File' : 'Select File'}
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowBulkUpload(false);
                    setBulkFile(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUploadSubmit}
                  disabled={!bulkFile}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Upload Claims
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
