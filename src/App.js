import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Patients from "./pages/Patients/Patients";
import Sectors from "./pages/Patients/Sectors";
import Statistiques from "./pages/Statistiques/Statistiques";
import Administration from "./pages/Administration/Administration";
import Notifications from "./pages/Notifications/Notifications";
import Parametres from "./pages/Parametres/Parametres";
import Profil from "./pages/Profil/Profil";
import DossierDetail from "./pages/Patients/DossierDetail";
import BedDetail from "./pages/Patients/BedDetail";
import PatientIdentity from "./pages/Patients/DossierDetails/PatientIdentity";
import ReasonHospitalization from "./pages/Patients/DossierDetails/ReasonHospitalization";
import CaseHistory from "./pages/Patients/DossierDetails/CaseHistory";
import HistoryDisease from "./pages/Patients/DossierDetails/HistoryDisease";
import ClinicalExamination from "./pages/Patients/DossierDetails/ClinicalExamination";
import ECG from "./pages/Patients/DossierDetails/ECG";
import Exploration from "./pages/Patients/DossierDetails/Exploration";
import Biology from "./pages/Patients/DossierDetails/Biology";
import PrimaryConclusion from "./pages/Patients/DossierDetails/PrimaryConclusion";
import Diagnostic from "./pages/Patients/DossierDetails/Diagnostic";
import Conclusion from "./pages/Patients/DossierDetails/Conclusion";
import ECCV from "./pages/Patients/DossierDetails/ECCV";
import ECPP from "./pages/Patients/DossierDetails/ECPP";
import ECA from "./pages/Patients/DossierDetails/ECA";
import ExpRT from "./pages/Patients/DossierDetails/ExpRT";
import ExpEcho from "./pages/Patients/DossierDetails/ExpEcho";
import BedService from "./services/bed.service";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    const day = time.getDate().toString().padStart(2, "0");
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const year = time.getFullYear();
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="dashboard-container flex flex-col min-h-screen">
                <Header
                  currentTime={currentTime}
                  formatTime={formatTime}
                  logout={logout}
                />
                <div className="content">
                  <Sidebar />
                  <div className="flex-1 bg-gradient-to-b from-white to-blue-100">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/sectors" element={<Sectors />} />
                      <Route
                        path="/patients/:sectorId"
                        element={<Patients />}
                      />
                      <Route path="/beds/:id" element={<BedDetail />} />
                      <Route path="/statistiques" element={<Statistiques />} />
                      <Route
                        path="/administration"
                        element={<Administration />}
                      />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/dossier/:id" element={<DossierDetail />} />
                      <Route
                        path="/patient-identity"
                        element={<PatientIdentity />}
                      />
                      <Route
                        path="motif-hospitalisation"
                        element={<ReasonHospitalization />}
                      />
                      <Route path="antecedents" element={<CaseHistory />} />
                      <Route
                        path="histoire-maladie"
                        element={<HistoryDisease />}
                      />
                      <Route
                        path="examen-clinique"
                        element={<ClinicalExamination />}
                      />
                      <Route path="ecg" element={<ECG />} />
                      <Route
                        path="examen-clinique/cardio-vasculaire"
                        element={<ECCV />}
                      />
                      <Route
                        path="examen-clinique/pleuro-pulmonaire"
                        element={<ECPP />}
                      />
                      <Route
                        path="examen-clinique/abdominal"
                        element={<ECA />}
                      />
                      <Route path="exploration" element={<Exploration />} />
                      <Route
                        path="exploration/radio-throax"
                        element={<ExpRT />}
                      />
                      <Route
                        path="exploration/echocardiographie"
                        element={<ExpEcho />}
                      />
                      <Route path="biologie" element={<Biology />} />
                      <Route
                        path="conclusion-primaire"
                        element={<PrimaryConclusion />}
                      />
                      <Route path="conclusion" element={<Conclusion />} />
                      <Route path="diagnostic" element={<Diagnostic />} />

                      <Route path="/parametres" element={<Parametres />} />
                      <Route path="/profil" element={<Profil />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
