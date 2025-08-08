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
          The Learning Strategy Scorecard is designed to help L&D leaders
          reflect on the strategic strength of their learning function. By
          evaluating your approach across six core dimensions, you'll gain
          clarity on your current state—and where to focus your efforts for
          maximum impact.
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
                    Ensuring that learning initiatives directly support key
                    organizational goals, priorities, and KPIs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    2. Learning Governance
                  </h3>
                  <p className="text-slate-600">
                    Establishing decision-making structures and enterprise-level
                    prioritization for learning investments and initiatives.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    3. Technology and Ecosystem Integration
                  </h3>
                  <p className="text-slate-600">
                    Connecting your learning platforms, tools, systems and data
                    to create a seamless and scalable learning environment.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    4. Content and Experience Strategy
                  </h3>
                  <p className="text-slate-600">
                    Designing engaging, inclusive, and strategic learning
                    experiences aligned to learner needs and business outcomes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    5. Measurement and Analytics
                  </h3>
                  <p className="text-slate-600">
                    Capturing learning outcomes and using data to drive
                    decisions to inform strategy and decision making.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    6. Culture and Change Readiness
                  </h3>
                  <p className="text-slate-600">
                    Embedding learning into the culture ensuring people are
                    equipped and motivated to grow and adapt.
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
                    30–74: Reactive
                  </h3>
                  <p className="text-slate-600">
                    Learning is reactive, compliance driven and lacks strategic
                    integration.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    75–104: Operational
                  </h3>
                  <p className="text-slate-600">
                    Some alignment to business goals but L&D is still seen as a
                    support function.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    105–129: Strategic
                  </h3>
                  <p className="text-slate-600">
                    L&D data informs business priorities, has leadership
                    sponsorship and uses data to adapt.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    130–150: Transformational
                  </h3>
                  <p className="text-slate-600">
                    Fully embedded, innovative, and business-driving strategy.
                    Learning is a growth engine.
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
