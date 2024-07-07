import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../services/axiosInstance";

const GeneratePDFButton = ({ patient }) => {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const fetchImageAsBase64 = async () => {
      try {
        const response = await import("../assets/placeholder2.jpg");
        const blob = await fetch(response.default).then((r) => r.blob());
        const base64String = await convertToBase64(blob);
        setBase64Image(`data:image/jpeg;base64,${base64String}`);
      } catch (error) {
        console.error("Error fetching image:", error);
        setBase64Image(
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
            "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
            "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        );
      }
    };

    fetchImageAsBase64();
  }, []);

  const fetchImageData = async (url, type) => {
    let endpoint;
    switch (type) {
      case "explorations":
        endpoint = `/explorations/files/${url}`;
        break;
      case "ecgs":
        endpoint = `/ecgs/files/${url}`;
        break;
      case "biologies":
        endpoint = `/biologies/files/${url}`;
        break;
      default:
        return null;
    }

    try {
      const response = await axiosInstance.get(endpoint, {
        responseType: "arraybuffer",
      });
      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const extension = url.split(".").pop().toLowerCase();
      const mimeType = `image/${extension === "jpg" ? "jpeg" : extension}`;
      return `data:${mimeType};base64,${base64String}`;
    } catch (error) {
      console.error("Error fetching image:", error);
      return (
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      );
    }
  };

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();
      console.log(base64Image);
      // Adding a title
      doc.setFontSize(18);
      doc.text("Dossier Médical du Patient", 14, 22);
      doc.setFontSize(12);
      doc.setTextColor(100);

      // Basic information
      const infoYStart = 30;
      const lineHeight = 6;
      doc.text(`Nom: ${patient.nom}`, 14, infoYStart);
      doc.text(`Prénom: ${patient.prenom}`, 14, infoYStart + lineHeight);
      doc.text(`Âge: ${patient.age}`, 14, infoYStart + lineHeight * 2);
      doc.text(`Ville: ${patient.ville}`, 14, infoYStart + lineHeight * 3);
      doc.text(
        `Assurance: ${patient.assurance}`,
        14,
        infoYStart + lineHeight * 4
      );
      doc.text(
        `Profession: ${patient.profession}`,
        14,
        infoYStart + lineHeight * 5
      );
      doc.text(
        `Reference ID: ${patient.referenceID}`,
        14,
        infoYStart + lineHeight * 6
      );

      // Adding a section title
      const sectionTitleYStart = infoYStart + lineHeight * 8;
      doc.setFontSize(16);
      doc.text("Dossier Médical", 14, sectionTitleYStart);
      doc.setFontSize(12);

      // Adding the medical dossier details
      const dossier = patient.medicalDossier || {}; // Default to empty object
      const textYStart = sectionTitleYStart + 10;

      const addTextWithWrap = (label, text, x, y) => {
        doc.text(`${label}:`, x, y);
        const splitText = doc.splitTextToSize(text || "N/A", 180);
        doc.text(splitText, x + 6, y + 6);
        return y + splitText.length * lineHeight + 10;
      };

      let currentY = textYStart;
      currentY = addTextWithWrap(
        "Hospitalisation",
        dossier.hospitalization,
        14,
        currentY
      );
      currentY = addTextWithWrap(
        "Histoire de la Maladie",
        dossier.historyDisease,
        14,
        currentY
      );
      currentY = addTextWithWrap(
        "Conclusion Principale",
        dossier.primaryConclusion,
        14,
        currentY
      );
      currentY = addTextWithWrap(
        "Conclusion",
        dossier.conclusion,
        14,
        currentY
      );

      // Function to create tables
      const createTable = (title, data, columns, startY) => {
        if (data && data.length > 0) {
          doc.addPage();
          doc.text(title, 14, 20);
          doc.autoTable({
            startY: startY || 30,
            head: [columns],
            body: data,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: {
              fillColor: [41, 128, 185],
              textColor: [255, 255, 255],
            },
            columnStyles: {
              0: { cellWidth: 10 },
              1: { cellWidth: 40 },
              2: { cellWidth: 40 },
              3: { cellWidth: 40 },
            },
            margin: { top: 10 },
            didDrawCell: (data) => {
              if (data.column.dataKey === 1 && data.cell.raw?.content) {
                doc.addImage(
                  data.cell.raw.content,
                  data.cell.raw.content
                    .split(";")[0]
                    .split("/")[1]
                    .toUpperCase(),
                  data.cell.x + 2,
                  data.cell.y + 2,
                  36,
                  18
                );
              }
            },
          });
        } else {
          // Handle case where data is empty
          doc.addPage();
          doc.text(title + ": No data available", 14, 20);
        }
      };

      // Data for antecedents
      const antecedentsData = (dossier.antecedents || []).map(
        (antecedent, index) => [
          index + 1,
          antecedent.personal || "N/A",
          antecedent.familial || "N/A",
          antecedent.cardiovascularRiskFactors || "N/A",
        ]
      );
      createTable("Antécédents", antecedentsData, [
        "#",
        "Personnel",
        "Familial",
        "Facteurs de Risque",
      ]);

      // Data for clinical exams
      const clinicalExamsData = (dossier.clinicalExams || []).map(
        (exam, index) => [
          index + 1,
          exam.pulmonary || "N/A",
          exam.abdominal || "N/A",
          exam.generalExam || "N/A",
          exam.functionalSigns || "N/A",
          exam.physicalSigns || "N/A",
        ]
      );
      createTable("Examens Cliniques", clinicalExamsData, [
        "#",
        "Pulmonaire",
        "Abdominal",
        "Examen Général",
        "Signes Fonctionnels",
        "Signes Physiques",
      ]);

      // Data for ECGs
      const ecgsData = await Promise.all(
        (dossier.ecgs || []).map(async (ecg, index) => {
          const imageUrl = await fetchImageData(ecg.imageUrl, "ecgs");
          return [
            index + 1,
            { content: imageUrl, type: "image" },
            ecg.conclusion || "N/A",
          ];
        })
      );

      // Adding ECGs table manually since autoTable does not support images in cells
      if (ecgsData.length > 0) {
        doc.addPage();
        doc.text("ECGs", 14, 20);
        let ecgYStart = 30;
        ecgsData.forEach((ecg, index) => {
          doc.text(`#${index + 1}`, 14, ecgYStart);
          doc.addImage(
            ecg[1].content,
            ecg[1].content.split(";")[0].split("/")[1].toUpperCase(),
            24,
            ecgYStart,
            50,
            30
          );
          doc.text(ecg[2], 80, ecgYStart + 10);
          ecgYStart += 40;
          if (ecgYStart > 260) {
            doc.addPage();
            ecgYStart = 30;
          }
        });
      }

      // Data for diagnoses
      const diagnosesData = (dossier.diagnoses || []).map(
        (diagnosis, index) => [
          index + 1,
          diagnosis.diagnosis || "N/A",
          diagnosis.diagnosisDifferentiel || "N/A",
        ]
      );
      createTable("Diagnoses", diagnosesData, [
        "#",
        "Diagnostic",
        "Différentiel",
      ]);

      // Data for explorations
      const explorationsData = await Promise.all(
        (dossier.explorations || []).map(async (exploration, index) => {
          const imageUrl = await fetchImageData(
            exploration.imageUrl,
            "explorations"
          );
          return [
            index + 1,
            exploration.type || "N/A",
            { content: imageUrl, type: "image" },
            exploration.conclusion || "N/A",
          ];
        })
      );

      if (explorationsData.length > 0) {
        doc.addPage();
        doc.text("Explorations", 14, 20);
        let explorationYStart = 30;
        explorationsData.forEach((exploration, index) => {
          doc.text(`#${index + 1}`, 14, explorationYStart);
          doc.text(exploration[1], 24, explorationYStart);
          doc.addImage(
            exploration[2].content,
            exploration[2].content.split(";")[0].split("/")[1].toUpperCase(),
            50,
            explorationYStart,
            50,
            30
          );
          doc.text(exploration[3], 110, explorationYStart + 10);
          explorationYStart += 40;
          if (explorationYStart > 260) {
            doc.addPage();
            explorationYStart = 30;
          }
        });
      }

      const biologiesData = await Promise.all(
        (dossier.biologies || []).map(async (biology, index) => {
          let imageUrl = null;
          if (!biology.bilanImageUrl.endsWith(".pdf")) {
            imageUrl = await fetchImageData(biology.bilanImageUrl, "biologies");
          } else {
            imageUrl =
              "data:image/png;base64,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";
          }
          return [
            index + 1,
            { content: imageUrl, type: "image" },
            biology.conclusion || "N/A",
          ];
        })
      );

      if (biologiesData.some((data) => data !== null)) {
        doc.addPage();
        doc.text("Biologies", 14, 20);
        let biologyYStart = 30;
        biologiesData.forEach((biology, index) => {
          if (biology !== null) {
            doc.text(`#${index + 1}`, 14, biologyYStart);
            doc.addImage(
              biology[1].content,
              biology[1].content.split(";")[0].split("/")[1].toUpperCase(),
              24,
              biologyYStart,
              50,
              30
            );
            doc.text(biology[2], 80, biologyYStart + 10);
            biologyYStart += 40;
            if (biologyYStart > 260) {
              doc.addPage();
              biologyYStart = 30;
            }
          }
        });
      }

      doc.save(`Dossier_Medical_${patient.nom}_${patient.prenom}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-[#8f8df2] hover:bg-[#9f9df8] text-white px-4 py-2 rounded"
    >
      Générer PDF
    </button>
  );
};

export default GeneratePDFButton;
