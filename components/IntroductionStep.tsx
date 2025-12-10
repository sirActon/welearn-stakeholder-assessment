"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function IntroductionStep() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Let&apos;s Get Started
        </h1>
        <p className="text-slate-600 text-lg mb-4">
          Thank you for taking a few minutes to complete this scorecard. The
          purpose of this survey is to understand how you and your teams
          experience the Learning &amp; Development (L&amp;D) function today.
          Your feedback will help us benchmark current perceptions, identify
          strengths to build on, and focus improvements where they will most
          benefit the business.
        </p>
        <p className="text-slate-600 text-lg mb-4">
          This scorecard is paired with a parallel self-assessment that the
          L&amp;D organization is completing using the same six dimensions.
          Together, these two perspectives—your outside-in view and
          L&amp;D&apos;s inside-out view—help us see where we are aligned, where
          gaps exist, and what actions will most improve L&amp;D&apos;s impact.
        </p>
        <p className="text-slate-500 text-sm italic">
          Note: Please base your ratings on your direct experience.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="dimensions" className="border-none">
            <AccordionTrigger className="py-4 text-lg font-medium text-coral-600 hover:no-underline data-[state=open]:text-slate-900">
              The 6 Dimensions of a High-Impact Learning Strategy
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    1. Alignment to Business Strategy
                  </h3>
                  <p className="text-slate-600">
                    How well L&D understands and supports your goals and
                    priorities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    2. Learning Governance & Decision-Making
                  </h3>
                  <p className="text-slate-600">
                    How clear, coordinated, and effective learning priorities
                    and decisions feel from your perspective.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    3. Technology & Learning Ecosystem Experience
                  </h3>
                  <p className="text-slate-600">
                    How easy and connected the learning tools, platforms, and
                    data are for you and your teams.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    4. Content & Learning Experience Quality
                  </h3>
                  <p className="text-slate-600">
                    How relevant, practical, engaging, and current the learning
                    experiences are.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    5. Measurement, Impact & Communication
                  </h3>
                  <p className="text-slate-600">
                    How well L&D demonstrates value, measures outcomes, and
                    shares useful insights.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    6. Culture, Change & Organizational Readiness
                  </h3>
                  <p className="text-slate-600">
                    How effectively L&D supports growth, capability building,
                    and change across the organization.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating" className="border-none">
            <AccordionTrigger className="py-4 text-lg font-medium text-coral-600 hover:no-underline data-[state=open]:text-slate-900">
              Rating Scale
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    1 = Not Yet in Place
                  </h3>
                  <p className="text-slate-600">
                    No formal efforts or practices are currently in place.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    2 = Early Development
                  </h3>
                  <p className="text-slate-600">
                    Some initial steps have been taken, but efforts are limited
                    or informal.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    3 = Inconsistent Practice
                  </h3>
                  <p className="text-slate-600">
                    Practices are present but applied unevenly across the
                    organization.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    4 = Consistently Applied
                  </h3>
                  <p className="text-slate-600">
                    Practices are well established and applied consistently
                    across teams or functions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    5 = Fully Mature / Optimized
                  </h3>
                  <p className="text-slate-600">
                    Practices are well established and applied consistently
                    across teams or functions.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="maturity" className="border-none">
            <AccordionTrigger className="py-4 text-lg font-medium text-coral-600 hover:no-underline data-[state=open]:text-slate-900">
              The Maturity Model
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    30–74: Reactive Perception
                  </h3>
                  <p className="text-slate-600">
                    L&D seen as reactive, inconsistent, or disconnected from
                    business priorities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    75–104: Operational Perception
                  </h3>
                  <p className="text-slate-600">
                    L&D seen as reliable for core delivery, but not consistently
                    strategic or proactive.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    105–129: Strategic Perception
                  </h3>
                  <p className="text-slate-600">
                    L&D seen as aligned, proactive, and influential in
                    performance and change.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    130–150: Transformational Perception
                  </h3>
                  <p className="text-slate-600">
                    L&D seen as essential to business success, innovation, and
                    competitive advantage.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <p className="text-center text-slate-600 italic">
        Click on each section above to learn more about the dimensions, rating
        scale, and maturity model.
      </p>
    </div>
  );
}
