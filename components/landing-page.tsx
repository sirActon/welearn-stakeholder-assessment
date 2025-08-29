"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { shouldShowHeader } from "@/lib/header-utils";
import { useSearchParams } from "next/navigation";
import { sections, likertOptions } from "@/lib/assessment-data";

interface LandingPageProps {
  onStartAssessment: () => void;
}

export default function LandingPage({ onStartAssessment }: LandingPageProps) {
  const [showHeader, setShowHeader] = useState(false);
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";

  useEffect(() => {
    setShowHeader(shouldShowHeader());
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-coral-50">
      {/* Header - conditionally rendered based on URL param */}
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Image
                  src="/logo.jpg"
                  alt="WeLearn Logo"
                  width={225}
                  height={75}
                  className="object-contain"
                  priority
                />
              </div>
              <nav className="hidden md:flex space-x-10">
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-24 lg:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            {/*<div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-coral-100 text-coral-800 mb-8">
                ✨ Assess Your Learning Strategy Maturity
              </span>
            </div>*/}

            <h1 className="text-6xl lg:text-7xl font-medium text-slate-900 mb-8 tracking-tight leading-tight">
              Learning Strategy
              <span className="block text-coral-500">Scorecard</span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600 mb-16 leading-relaxed max-w-3xl mx-auto">
              Assess the maturity of your organization's learning strategy and
              receive a personalized report with actionable insights to guide
              your next steps.
            </p>

            {!isEmbedded ? (
              <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-10 lg:p-16 mb-20 border border-slate-100">
                <div className="grid lg:grid-cols-3 gap-12 mb-12">
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <span className="text-3xl font-bold text-coral-600">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Complete Assessment
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Answer questions across 6 key areas of learning strategy
                      maturity
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <span className="text-3xl font-bold text-coral-600">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Get Your Score
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Receive your maturity level and detailed performance
                      breakdown
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <span className="text-3xl font-bold text-coral-600">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Take Action
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Use personalized insights to advance your learning strategy
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={onStartAssessment}
                    className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    Start Your Assessment
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="px-6 py-3 font-semibold rounded-xl bg-black text-white hover:bg-black/90">
                        Open Test Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:w-full sm:max-w-3xl h-[85vh] sm:h-[75vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle id="dialog-title">Dialog Testing</DialogTitle>
                        <DialogDescription>
                          This dialog is used to test desktop and mobile behavior and to validate accessibility (focus management, keyboard navigation, and screen reader announcements).
                        </DialogDescription>
                      </DialogHeader>
                      {/* Accessible test content: first dimension questions */}
                      {(() => {
                        const first = sections[0];
                        return (
                          <form className="space-y-8" aria-labelledby="dialog-title">
                            <div>
                              <h2 className="text-xl font-semibold text-slate-900">{first.title}</h2>
                              <p className="text-slate-600 mt-1">{first.description}</p>
                            </div>
                            <div className="space-y-6">
                              {first.questions.map((q, qi) => {
                                const name = `test-q-${qi}`;
                                return (
                                  <fieldset key={name} className="border rounded-xl p-4 sm:p-5">
                                    <legend className="font-medium text-slate-900 mb-3">{q}</legend>
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3" role="radiogroup" aria-label={q}>
                                      {likertOptions.map((opt) => {
                                        const id = `${name}-${opt.value}`;
                                        return (
                                          <div key={id} className="flex flex-col items-center text-center gap-2">
                                            <input
                                              id={id}
                                              name={name}
                                              type="radio"
                                              value={opt.value}
                                              className="h-5 w-5 text-rose-600 focus:ring-rose-600"
                                            />
                                            <label htmlFor={id} className="text-sm text-slate-800">
                                              <span className="block font-medium">{opt.label}</span>
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </fieldset>
                                );
                              })}
                            </div>
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button className="bg-black text-white hover:bg-black/90">Dismiss</Button>
                              </DialogClose>
                            </div>
                          </form>
                        );
                      })()}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ) : (
              <div className="mb-20">
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={onStartAssessment}
                    className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    Start Your Assessment
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="px-6 py-3 font-semibold rounded-xl bg-black text-white hover:bg-black/90">
                        Open Test Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:w-full sm:max-w-3xl h-[85vh] sm:h-[75vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle id="test-dialog-title">Dialog Testing</DialogTitle>
                        <DialogDescription>
                          This dialog is used to test desktop and mobile behavior and to validate accessibility (focus management, keyboard navigation, and screen reader announcements).
                        </DialogDescription>
                      </DialogHeader>
                      {/* Accessible test content: first dimension questions */}
                      {(() => {
                        const first = sections[0];
                        return (
                          <form className="space-y-8" aria-labelledby="test-dialog-title">
                            <div>
                              <h2 className="text-xl font-semibold text-slate-900">{first.title}</h2>
                              <p className="text-slate-600 mt-1">{first.description}</p>
                            </div>
                            <div className="space-y-6">
                              {first.questions.map((q, qi) => {
                                const name = `test-q-${qi}`;
                                return (
                                  <fieldset key={name} className="border rounded-xl p-4 sm:p-5">
                                    <legend className="font-medium text-slate-900 mb-3">{q}</legend>
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3" role="radiogroup" aria-label={q}>
                                      {likertOptions.map((opt) => {
                                        const id = `${name}-${opt.value}`;
                                        return (
                                          <div key={id} className="flex flex-col items-center text-center gap-2">
                                            <input
                                              id={id}
                                              name={name}
                                              type="radio"
                                              value={opt.value}
                                              className="h-5 w-5 text-rose-600 focus:ring-rose-600"
                                            />
                                            <label htmlFor={id} className="text-sm text-slate-800">
                                              <span className="block font-medium">{opt.label}</span>
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </fieldset>
                                );
                              })}
                            </div>
                            <div className="flex justify-end">
                              <DialogClose asChild>
                                <Button className="bg-black text-white hover:bg-black/90">Dismiss</Button>
                              </DialogClose>
                            </div>
                          </form>
                        );
                      })()}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
