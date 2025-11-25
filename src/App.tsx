import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClaimsInbox from './pages/ClaimsInbox';
import AdjusterWorkspace from './pages/AdjusterWorkspace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/claims" replace />} />
        <Route path="/claims" element={<ClaimsInbox />} />
        <Route path="/claims/:claimId" element={<AdjusterWorkspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
