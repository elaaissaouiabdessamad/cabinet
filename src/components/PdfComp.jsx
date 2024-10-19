import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setNumPages(undefined);
    setPageNumber(1);
  }, [props.pdfFile]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrevClick = (e) => {
    e.preventDefault();
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <div className="pdf-container p-6 flex flex-col items-center">
      <h4 className="text-3xl font-bold text-gray-800 mb-4">
        Prévisualisation du PDF
      </h4>
      <div className="pdf-toolbar flex justify-between items-center mb-4">
        <button
          onClick={handlePrevClick}
          disabled={pageNumber === 1}
          className="bg-[#8f8df2] hover:bg-[#7f7de2] text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Précédent
        </button>
        <span className="text-xl font-semibold text-gray-800 mx-4">
          Page {pageNumber} sur {numPages || "--"}
        </span>
        <button
          onClick={handleNextClick}
          disabled={pageNumber === numPages}
          className="bg-[#8f8df2] hover:bg-[#7f7de2] text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Suivant&nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="pdf-document bg-gray-100 p-4 rounded-lg shadow-md">
        <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            key={`page_${pageNumber}`}
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page mx-auto"
            width={800}
          />
        </Document>
      </div>
    </div>
  );
}

export default PdfComp;
