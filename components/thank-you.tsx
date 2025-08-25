"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isEmbedded } from "@/lib/header-utils";

interface ThankYouProps {
  onBackToLanding: () => void;
}

export default function ThankYou({ onBackToLanding }: ThankYouProps) {
  const [mounted, setMounted] = useState(false);
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    setMounted(true);
    setEmbedded(isEmbedded());
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="WeLearn"
                width={140}
                height={36}
                priority
              />
            </div>
            {!mounted
              ? null
              : !embedded && (
                  <Button
                    variant="outline"
                    onClick={onBackToLanding}
                    className="px-6 py-3 font-medium rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
                  >
                    Start New Assessment
                  </Button>
                )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <Card className="shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
          <CardHeader className="p-10 bg-gradient-to-r from-slate-50 to-coral-50">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Thank you for completing the assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 text-slate-700 space-y-6 text-lg leading-relaxed">
            {!mounted ? null : embedded ? (
              <>
                <p>Thank you for completing the assessment.</p>
                <p className="text-base text-slate-600">
                  You can now continue with the course.
                </p>
              </>
            ) : (
              <>
                <p>
                  We appreciate your time and perspective. Because this
                  assessment is being completed on behalf of your organization,
                  your responses will be combined with those of your colleagues
                  to provide a collective view.
                </p>
                <p>
                  Once the collection period ends, your organization's contact
                  will share a summary of the results along with key insights
                  and recommendations.
                </p>
                <p className="text-slate-500 text-base">
                  If you have any questions before then, please reach out to
                  your organization’s designated contact.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
