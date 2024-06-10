import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Import Signup component
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Patients from "./pages/Patients/Patients";
import Sectors from "./pages/Patients/Sectors";
import Historique from "./pages/Historique/Historique";
import Facturation from "./pages/Facturation/Facturation";
import Notifications from "./pages/Notifications/Notifications";
import Parametres from "./pages/Parametres/Parametres";
import Profil from "./pages/Profil/Profil";
import DossierDetail from "./pages/Patients/DossierDetail";
import BedDetail from "./pages/Patients/BedDetail";
import PatientIdentity from "./pages/Patients/DossierDetails/PatientIdentity";
import PatientIdentityShow from "./pages/Patients/DossierDetailsShow/PatientIdentityShow";

import ReasonHospitalization from "./pages/Patients/DossierDetails/ReasonHospitalization";
import ReasonHospitalizationShow from "./pages/Patients/DossierDetailsShow/ReasonHospitalizationShow";

import CaseHistory from "./pages/Patients/DossierDetails/CaseHistory";
import CaseHistoryShow from "./pages/Patients/DossierDetailsShow/CaseHistoryShow";

import HistoryDisease from "./pages/Patients/DossierDetails/HistoryDisease";
import HistoryDiseaseShow from "./pages/Patients/DossierDetailsShow/HistoryDiseaseShow";

import ClinicalExamination from "./pages/Patients/DossierDetails/ClinicalExamination";
import ClinicalExaminationShow from "./pages/Patients/DossierDetailsShow/ClinicalExaminationShow";

import ECG from "./pages/Patients/DossierDetails/ECG";
import ECGShow from "./pages/Patients/DossierDetailsShow/ECGShow";

import Exploration from "./pages/Patients/DossierDetails/Exploration";
import ExplorationShow from "./pages/Patients/DossierDetailsShow/ExplorationShow";

import Biology from "./pages/Patients/DossierDetails/Biology";
import BiologyShow from "./pages/Patients/DossierDetailsShow/BiologyShow";

import PrimaryConclusion from "./pages/Patients/DossierDetails/PrimaryConclusion";
import PrimaryConclusionShow from "./pages/Patients/DossierDetailsShow/PrimaryConclusionShow";

import Diagnostic from "./pages/Patients/DossierDetails/Diagnostic";
import DiagnosticShow from "./pages/Patients/DossierDetailsShow/DiagnosticShow";

import Conclusion from "./pages/Patients/DossierDetails/Conclusion";
import ConclusionShow from "./pages/Patients/DossierDetailsShow/ConclusionShow";

import ECCV from "./pages/Patients/DossierDetails/ECCV";
import ECCVShow from "./pages/Patients/DossierDetailsShow/ECCVShow";

import ECPP from "./pages/Patients/DossierDetails/ECPP";
import ECPPShow from "./pages/Patients/DossierDetailsShow/ECPPShow";

import ECA from "./pages/Patients/DossierDetails/ECA";
import ECAShow from "./pages/Patients/DossierDetailsShow/ECAShow";

import ExpRT from "./pages/Patients/DossierDetails/ExpRT";
import ExpRTShow from "./pages/Patients/DossierDetailsShow/ExpRTShow";

import ExpEcho from "./pages/Patients/DossierDetails/ExpEcho";
import ExpEchoShow from "./pages/Patients/DossierDetailsShow/ExpEchoShow";

import BedService from "./services/bed.service";
import DossierDetailShow from "./pages/Patients/DossierDetailShow";
import PasswordReset from "./components/PasswordReset";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedAuth);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-reset" element={<PasswordReset />} />{" "}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="dashboard-container flex flex-col min-h-screen">
                <Header
                  currentTime={currentTime}
                  formatTime={formatTime}
                  username={
                    localStorage.getItem("userData")
                      ? JSON.parse(localStorage.getItem("userData")).username
                      : ""
                  }
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
                      <Route path="/historique" element={<Historique />} />
                      <Route path="/facturation" element={<Facturation />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/dossier/:id" element={<DossierDetail />} />
                      <Route
                        path="/dossier/show/:id"
                        element={<DossierDetailShow />}
                      />
                      <Route
                        path="/patient-identity"
                        element={<PatientIdentity />}
                      />
                      <Route
                        path="/show/patient-identity"
                        element={<PatientIdentityShow />}
                      />
                      <Route
                        path="motif-hospitalisation"
                        element={<ReasonHospitalization />}
                      />
                      <Route
                        path="/show/motif-hospitalisation"
                        element={<ReasonHospitalizationShow />}
                      />
                      <Route path="antecedents" element={<CaseHistory />} />
                      <Route
                        path="/show/antecedents"
                        element={<CaseHistoryShow />}
                      />

                      <Route
                        path="histoire-maladie"
                        element={<HistoryDisease />}
                      />

                      <Route
                        path="/show/histoire-maladie"
                        element={<HistoryDiseaseShow />}
                      />
                      <Route
                        path="examen-clinique"
                        element={<ClinicalExamination />}
                      />
                      <Route
                        path="/show/examen-clinique"
                        element={<ClinicalExaminationShow />}
                      />
                      <Route path="ecg" element={<ECG />} />
                      <Route path="/show/ecg" element={<ECGShow />} />
                      <Route
                        path="examen-clinique/cardio-vasculaire"
                        element={<ECCV />}
                      />
                      <Route
                        path="/show/examen-clinique/cardio-vasculaire"
                        element={<ECCVShow />}
                      />
                      <Route
                        path="examen-clinique/pleuro-pulmonaire"
                        element={<ECPP />}
                      />
                      <Route
                        path="/show/examen-clinique/pleuro-pulmonaire"
                        element={<ECPPShow />}
                      />
                      <Route
                        path="examen-clinique/abdominal"
                        element={<ECA />}
                      />
                      <Route
                        path="/show/examen-clinique/abdominal"
                        element={<ECAShow />}
                      />
                      <Route path="exploration" element={<Exploration />} />
                      <Route
                        path="/show/exploration"
                        element={<ExplorationShow />}
                      />
                      <Route
                        path="exploration/radio-throax"
                        element={<ExpRT />}
                      />
                      <Route
                        path="/show/exploration/radio-throax"
                        element={<ExpRTShow />}
                      />
                      <Route
                        path="exploration/echocardiographie"
                        element={<ExpEcho />}
                      />
                      <Route
                        path="/show/exploration/echocardiographie"
                        element={<ExpEchoShow />}
                      />
                      <Route path="biologie" element={<Biology />} />
                      <Route path="/show/biologie" element={<BiologyShow />} />
                      <Route
                        path="conclusion-primaire"
                        element={<PrimaryConclusion />}
                      />
                      <Route
                        path="/show/conclusion-primaire"
                        element={<PrimaryConclusionShow />}
                      />
                      <Route path="conclusion" element={<Conclusion />} />
                      <Route
                        path="/show/conclusion"
                        element={<ConclusionShow />}
                      />

                      <Route path="diagnostic" element={<Diagnostic />} />
                      <Route
                        path="/show/diagnostic"
                        element={<DiagnosticShow />}
                      />
                      <Route path="/parametres" element={<Parametres />} />
                      <Route path="/profil" element={<Profil />} />
                      {/*<Route path="*" element={<Navigate to="/dashboard" />} />*/}
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
