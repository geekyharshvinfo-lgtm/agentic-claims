import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClaimsProvider } from './contexts/ClaimsContext';
import Dashboard from './pages/Dashboard';
import ClaimsInbox from './pages/ClaimsInbox';
import AdjusterWorkspace from './pages/AdjusterWorkspace';
import AdminClaimCreate from './pages/AdminClaimCreate';

function App() {
  return (
    <ClaimsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/claims" element={<ClaimsInbox />} />
          <Route path="/claims/:claimId" element={<AdjusterWorkspace />} />
          <Route path="/admin/create-claim" element={<AdminClaimCreate />} />
        </Routes>
      </BrowserRouter>
    </ClaimsProvider>
  );
}

export default App;
