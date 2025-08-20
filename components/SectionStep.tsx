// components/SectionStep.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SectionResponse } from "./types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
        {!hideDescriptors ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 bg-coral-100 text-coral-700 text-sm font-medium rounded-full">
                Dimension {dimensionNumber}
              </span>
              <CardTitle className="text-3xl font-bold text-slate-900 m-0">
                {section.title}
              </CardTitle>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {section.description}
            </p>
          </>
        )}
        {!hideDescriptors ? (
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm font-medium text-slate-700 mb-2">
              Rating Scale:
            </p>
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
        ) : null}
      </CardHeader>
      <CardContent
        className={`p-10 ${hideDescriptors ? "space-y-8" : "space-y-12"}`}
      >
        {section.questions.map((question, index) => (
          <div
            key={`${section.key}-${index}`}
            className={hideDescriptors ? "space-y-4" : "space-y-6"}
          >
            <h4 className="text-lg font-semibold text-slate-900 leading-relaxed">
              {question}
            </h4>
            {!hideDescriptors ? (
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
                      <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors leading-tight px-1 hidden md:block">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </fieldset>
            ) : (
              <div className="max-w-sm">
                <Select
                  value={
                    sectionData?.questions?.[index] !== undefined
                      ? String(sectionData?.questions?.[index])
                      : undefined
                  }
                  onValueChange={(val) => onResponse(index, parseInt(val, 10))}
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-300 tabular-nums text-left">
                    <SelectValue
                      className="tabular-nums"
                      placeholder="Select a rating"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {likertOptions.map((opt) => {
                      const raw = `${opt.value} - ${opt.label}`;
                      const cleaned = raw
                        // Replace a wide range of unicode space/format chars with a normal space
                        .replace(
                          /[\u2000-\u200A\u00A0\u202F\u205F\u3000\u200B\u200E\u200F\u2060]/g,
                          " "
                        )
                        .replace(/\s+/g, " ")
                        .trim();
                      return (
                        <SelectItem key={opt.value} value={String(opt.value)}>
                          {cleaned}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ))}

        {/* Comment section removed */}
      </CardContent>
    </Card>
  );
}
