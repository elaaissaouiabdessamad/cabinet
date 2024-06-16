import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PDFPreview = () => {
  const location = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const query = new URLSearchParams(location.search);
  const fileUrl = query.get("url");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="pdf-preview">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Chargement du document PDF..."
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages && (
        <div className="pagination">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
