"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { AssessmentData, Results } from "@/app/page";
import dynamic from "next/dynamic";

// Dynamically import ReportPDF to avoid SSR issues
const ReportPDF = dynamic(() => import("./ReportPDF"), {
  ssr: false,
});

interface PDFDownloadButtonProps {
  assessmentData: AssessmentData;
  results: Results;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  assessmentData,
  results,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Check if we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button
        variant="outline"
        className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
      >
        Download PDF
      </Button>
    );
  }

  // We need to wrap the PDF functionality in a try/catch to handle any rendering errors
  try {
    return (
      <PDFDownloadLink
        document={<ReportPDF assessmentData={assessmentData} results={results} />}
        fileName={`WeLearn-Scorecard-${assessmentData.demographics.name || "Report"}.pdf`}
      >
        {({ blob, url, loading, error }) => {
          // Handle any errors in the render function
          if (error) {
            console.error("PDF generation error:", error);
            return (
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
              >
                Download PDF
              </Button>
            );
          }
          
          return (
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
              disabled={loading}
            >
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          );
        }}
      </PDFDownloadLink>
    );
  } catch (e) {
    console.error("Error rendering PDF component:", e);
    return (
      <Button
        variant="outline"
        className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
      >
        Download PDF
      </Button>
    );
  }
};

export default PDFDownloadButton;
