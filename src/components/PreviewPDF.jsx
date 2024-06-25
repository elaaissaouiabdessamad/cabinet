import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import { useLocation, useNavigate } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import HeaderDossierBiologyShow from "./HeaderDossierBiologyShow";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PreviewPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const color = location.state?.color;
  const { url } = location.state || {};
  const [pdfFile, setPdfFile] = useState(null);

  const handleDossierBiologyShow = () => {
    navigate(`/show/biologie`, {
      state: { patient, color },
    });
  };

  useEffect(() => {
    showPdf(url);
  }, [url]);

  const showPdf = (pdf) => {
    setPdfFile(pdf);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <HeaderDossierBiologyShow
        handleDossierBiologyShow={handleDossierBiologyShow}
      />
      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
};

export default PreviewPDF;
