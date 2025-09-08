"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "@/components/ReportPDF";
import type { AssessmentData, Results } from "@/app/page";
import { Button } from "@/components/ui/button";

// Loading component for Suspense fallback
function LoadingPDF() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Preparing Your PDF</h1>
        <p className="text-slate-700 mb-6">Loading report data...</p>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component to use searchParams
function PDFGenerator() {
  const searchParams = useSearchParams();
  const [parsedData, setParsedData] = useState<{
    assessmentData: AssessmentData;
    results: Results;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Build absolute logo URL for the PDF (react-pdf prefers absolute URLs)
  const siteUrl =
    (typeof window !== "undefined" && window.location?.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.learningstrategyscorecard.com";
  const logoSrc = `${siteUrl}/logo.jpg`;

  useEffect(() => {
    try {
      const data = searchParams.get("data");
      if (!data) {
        setError("No data provided for PDF generation");
        return;
      }
      
      const decoded = JSON.parse(decodeURIComponent(data));
      setParsedData(decoded);
    } catch (err) {
      console.error("Error parsing data:", err);
      setError("Failed to parse report data");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-slate-700 mb-6">{error}</p>
          <Button onClick={() => window.close()}>Close</Button>
        </div>
      </div>
    );
  }

  if (!parsedData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-4">Preparing Your PDF</h1>
          <p className="text-slate-700 mb-6">Loading report data...</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Learning Strategy Scorecard PDF</h1>
        <p className="text-slate-700 mb-6">
          Your PDF is ready to download. Click the button below to download your
          personalized Learning Strategy Scorecard report.
        </p>
        
        <div className="flex justify-center">
          <Button asChild className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            <PDFDownloadLink
              document={
                <ReportPDF
                  assessmentData={parsedData.assessmentData}
                  results={parsedData.results}
                  logoSrc={logoSrc}
                />
              }
              fileName={`WeLearn-Scorecard-${
                parsedData.assessmentData.demographics.name || "Report"
              }.pdf`}
              className="inline-block"
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
            </PDFDownloadLink>
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => window.close()}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Close this window after downloading
          </button>
        </div>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function GeneratePDF() {
  return (
    <Suspense fallback={<LoadingPDF />}>
      <PDFGenerator />
    </Suspense>
  );
}
