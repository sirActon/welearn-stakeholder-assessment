// components/SectionStep.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SectionResponse } from "./types";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface SectionDefinition {
  key: string;
  title: string;
  description: string;
  questions: string[];
}

interface Props {
  section: SectionDefinition;
  sectionData?: SectionResponse;
  likertOptions: { value: number; label: string; description: string }[];
  onResponse: (questionIndex: number, value: number) => void;
  dimensionNumber: number;
  hideDescriptors?: boolean;
}

export function SectionStep({
  section,
  sectionData,
  likertOptions,
  onResponse,
  dimensionNumber,
  hideDescriptors = false,
}: Props) {
  return (
    <Card className="shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-coral-50 p-10">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-coral-100 text-coral-700 text-sm font-medium rounded-full mb-4">
            Dimension {dimensionNumber}
          </span>
        </div>
        <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
          {section.title}
        </CardTitle>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {section.description}
        </p>
        {!hideDescriptors ? (
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm font-medium text-slate-700 mb-2">Rating Scale:</p>
            {/* Grid layout that changes on mobile to stack each label with its number */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs text-slate-600">
              {likertOptions.map((option) => (
                <div
                  key={option.value}
                  className="text-center md:block flex justify-center items-center space-x-1"
                >
                  <span className="font-medium">{option.value}</span>
                  <span className="font-medium">= {option.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-sm text-slate-600 underline hover:text-slate-900">
                  What do the numbers mean?
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Rating Scale</AlertDialogTitle>
                  <AlertDialogDescription>
                    Understanding the 1–5 scale used for each question.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-3 text-left mt-2">
                  {likertOptions.map((option) => (
                    <div key={option.value}>
                      <div className="font-medium text-slate-800">
                        {option.value} = {option.label}
                      </div>
                      <div className="text-slate-600 text-xs leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardHeader>
      <CardContent
        className={`p-10 ${hideDescriptors ? "space-y-8" : "space-y-12"}`}
      >
        {section.questions.map((question, index) => (
          <div
            key={index}
            className={hideDescriptors ? "space-y-4" : "space-y-6"}
          >
            <h4 className="text-lg font-semibold text-slate-900 leading-relaxed">
              {question}
            </h4>
            <fieldset
              className={`grid grid-cols-5 ${
                hideDescriptors ? "gap-3" : "gap-4"
              }`}
            >
              <legend className="sr-only">Rate: {question}</legend>
              {likertOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col items-center ${
                    hideDescriptors ? "space-y-1" : "space-y-3"
                  } cursor-pointer group`}
                >
                  <input
                    type="radio"
                    aria-label={option.label}
                    name={`section-${section.key}-question-${index}`}
                    value={option.value}
                    checked={sectionData?.questions?.[index] === option.value}
                    onChange={() => onResponse(index, option.value)}
                    className="w-5 h-5 text-coral-500 focus:ring-coral-400 focus:ring-2"
                  />
                  <div className="text-center">
                    <span className="text-lg font-bold text-slate-800 block">
                      {option.value}
                    </span>
                    {!hideDescriptors && (
                      <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors leading-tight px-1 hidden md:block">
                        {/* Hide descriptors on mobile devices */}
                        {option.label}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </fieldset>
          </div>
        ))}

        {/* Comment section removed */}
      </CardContent>
    </Card>
  );
}
