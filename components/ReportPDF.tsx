import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { AssessmentData, Results } from "@/app/page";
import {
  maturityLevelRecommendations,
  getSectionRecommendation,
} from "@/lib/recommendations";

// --- Brand & tokens ---
const BRAND = {
  primary: "#ee5732", // WeLearn vivid orange
  accent: "#ee4255", // Optional CTA accent
  bgSoft: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  textMuted: "#64748b",
  slate500: "#64748b",
  slate600: "#475569",
  slate400: "#94a3b8",
};

const LEVEL_COLORS: Record<string, string> = {
  Reactive: "#dc2626",
  Operational: "#ee5732",
  Strategic: "#2563eb",
  Transformational: "#16a34a",
};

// --- Sections map ---
const sectionNames = {
  alignment: "Alignment to Business Strategy",
  governance: "Learning Governance",
  technology: "Technology & Ecosystem Integration",
  content: "Content & Experience Strategy",
  measurement: "Measurement & Analytics",
  culture: "Culture & Change Readiness",
} as const;

// --- Helpers ---
const getRecommendations = (maturityLevel: string) =>
  maturityLevelRecommendations[
    maturityLevel as keyof typeof maturityLevelRecommendations
  ] || maturityLevelRecommendations["Reactive"];

const getSectionSpecificRecommendations = (
  sectionScores: Record<string, number>
) =>
  Object.keys(sectionScores)
    .map((key) => ({
      section: sectionNames[key as keyof typeof sectionNames] || key,
      score: sectionScores[key],
      recommendation: getSectionRecommendation(key, sectionScores[key]),
    }))
    .filter((x) => x.recommendation);

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },

  // Header / Hero
  hero: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BRAND.border,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: (120 * 227) / 721, // ≈ 38
  },
  heroMeta: { fontSize: 9, color: BRAND.textMuted },
  titleBlock: { marginTop: 8 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: BRAND.text,
    textAlign: "left",
  },
  subtitle: { fontSize: 10, color: BRAND.textMuted, marginTop: 4 },

  // Generic card section
  section: {
    marginTop: 14,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BRAND.border,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: BRAND.text,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.border,
  },

  // Two-column row (when space allows)
  twoCol: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  col: { flexGrow: 1, flexBasis: "48%" },

  // Participant
  field: { marginBottom: 6 },
  label: { fontSize: 9, color: BRAND.slate600, marginBottom: 2 },
  value: { fontSize: 10, color: BRAND.text },

  // Maturity
  maturityWrap: {
    backgroundColor: BRAND.bgSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BRAND.border,
    padding: 12,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreText: { fontSize: 12, fontWeight: "bold", color: BRAND.text },
  levelPill: {
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    color: "#111827",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BRAND.border,
  },
  maturityDesc: {
    fontSize: 10,
    color: BRAND.text,
    marginTop: 8,
    lineHeight: 1.4,
  },

  modelGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  modelItem: {
    flexBasis: "48%",
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
  },
  modelItemActive: {
    borderColor: BRAND.primary,
    backgroundColor: "#fff7ed",
  },
  modelTitle: { fontSize: 10, fontWeight: "bold" },
  modelHint: {
    fontSize: 8,
    color: BRAND.textMuted,
    marginTop: 4,
    lineHeight: 1.35,
  },

  // Scores
  scoreCard: {
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  scoreName: { fontSize: 11, fontWeight: "bold", color: BRAND.text },
  scoreValue: { fontSize: 11, fontWeight: "bold", color: BRAND.primary },
  bar: { height: 6, borderRadius: 3, backgroundColor: "#e5e7eb" },
  barFill: { height: "100%", borderRadius: 3, backgroundColor: BRAND.primary },

  // Reflections
  reflItem: { marginBottom: 10 },
  reflTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    color: BRAND.text,
  },
  reflBody: {
    fontSize: 10,
    color: BRAND.text,
    backgroundColor: BRAND.bgSoft,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BRAND.border,
    lineHeight: 1.35,
  },

  // Recommendations
  recCard: {
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  recTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  recTitle: { fontSize: 11, fontWeight: "bold", color: BRAND.text },
  recScore: { fontSize: 10, fontWeight: "bold", color: BRAND.primary },
  recText: { fontSize: 10, color: BRAND.text, lineHeight: 1.35 },

  // Bulleted list for maturity next steps
  bulletRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  bulletIdx: { width: 12, fontSize: 10, color: BRAND.textMuted },
  bulletText: { fontSize: 10, flex: 1, color: BRAND.text, lineHeight: 1.35 },

  // Footer with page numbers
  footer: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 24,
    textAlign: "center",
    fontSize: 8,
    color: BRAND.slate400,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BRAND.border,
  },
});

// --- Component ---
interface ReportPDFProps {
  assessmentData: AssessmentData;
  results: Results;
  logoSrc?: string;
}

const ReportPDF: React.FC<ReportPDFProps> = ({ assessmentData, results, logoSrc }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentYear = new Date().getFullYear();

  const levelColor = LEVEL_COLORS[results.maturityLevel] || BRAND.primary;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Image style={styles.logo} src={logoSrc || "/logo.png"} />
            <Text style={styles.heroMeta}>Generated on {currentDate}</Text>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Learning Strategy Scorecard Report</Text>
            <Text style={styles.subtitle}>
              A snapshot of your learning maturity with targeted recommendations
            </Text>
          </View>
        </View>

        {/* PARTICIPANT */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Participant Information</Text>
          <View style={styles.twoCol}>
            <View style={styles.col}>
              {assessmentData.demographics.name ? (
                <View style={styles.field}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>
                    {assessmentData.demographics.name}
                  </Text>
                </View>
              ) : null}
              <View style={styles.field}>
                <Text style={styles.label}>Submission ID</Text>
                <Text style={styles.value}>
                  {assessmentData.submissionId || "—"}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              {assessmentData.demographics.email ? (
                <View style={styles.field}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>
                    {assessmentData.demographics.email}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* MATURITY */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Maturity Assessment</Text>

          <View style={styles.maturityWrap}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreText}>
                Overall Score: {results.totalScore}/150
              </Text>
              <Text
                style={[
                  styles.levelPill,
                  { borderColor: levelColor, color: levelColor },
                ]}
              >
                {results.maturityLevel}
              </Text>
            </View>
            <Text style={styles.maturityDesc}>
              {results.maturityDescription}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 11, fontWeight: "bold", color: BRAND.text }}
            >
              Understanding the Maturity Model
            </Text>

            <View style={styles.modelGrid}>
              {[
                {
                  label: "Reactive (30–74)",
                  key: "Reactive",
                  hint: "Learning is reactive, compliance-driven, and lacks strategic integration.",
                },
                {
                  label: "Operational (75–104)",
                  key: "Operational",
                  hint: "Structured processes with some alignment to goals and measurement.",
                },
                {
                  label: "Strategic (105–129)",
                  key: "Strategic",
                  hint: "Data-informed, aligned with business priorities and leadership support.",
                },
                {
                  label: "Transformational (130–150)",
                  key: "Transformational",
                  hint: "Fully embedded, innovative, and business-driving strategy.",
                },
              ].map((m) => (
                <View
                  key={m.key}
                  style={[
                    styles.modelItem,
                    results.maturityLevel === m.key
                      ? styles.modelItemActive
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.modelTitle,
                      { color: LEVEL_COLORS[m.key] || BRAND.text },
                    ]}
                  >
                    {m.label}
                  </Text>
                  <Text style={styles.modelHint}>{m.hint}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION SCORES */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Section Scores</Text>
          {Object.entries(results.sectionScores).map(([sectionKey, score]) => (
            <View key={sectionKey} style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <Text style={styles.scoreName}>
                  {sectionNames[sectionKey as keyof typeof sectionNames]}
                </Text>
                <Text style={styles.scoreValue}>{score}/25</Text>
              </View>
              <View style={styles.bar}>
                <View
                  style={[styles.barFill, { width: `${(score / 25) * 100}%` }]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* REFLECTIONS */}
        {(assessmentData.actionPlanning?.improvementArea ||
          assessmentData.actionPlanning?.biggestChallenge ||
          assessmentData.actionPlanning?.successVision) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Your Reflections</Text>

            {assessmentData.actionPlanning?.improvementArea ? (
              <View style={styles.reflItem}>
                <Text style={styles.reflTitle}>Area for Improvement</Text>
                <Text style={styles.reflBody}>
                  {assessmentData.actionPlanning.improvementArea}
                </Text>
              </View>
            ) : null}

            {assessmentData.actionPlanning?.biggestChallenge ? (
              <View style={styles.reflItem}>
                <Text style={styles.reflTitle}>Biggest Challenge</Text>
                <Text style={styles.reflBody}>
                  {assessmentData.actionPlanning.biggestChallenge}
                </Text>
              </View>
            ) : null}

            {assessmentData.actionPlanning?.successVision ? (
              <View style={styles.reflItem}>
                <Text style={styles.reflTitle}>Vision of Success</Text>
                <Text style={styles.reflBody}>
                  {assessmentData.actionPlanning.successVision}
                </Text>
              </View>
            ) : null}
          </View>
        )}

        {/* TARGETED SECTION RECOMMENDATIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Targeted Section Recommendations
          </Text>
          {getSectionSpecificRecommendations(results.sectionScores).map(
            (item, idx) => (
              <View key={idx} style={styles.recCard}>
                <View style={styles.recTitleRow}>
                  <Text style={styles.recTitle}>{item.section}</Text>
                  {/* NOTE: corrected denominator to /25 for section scores */}
                  <Text style={styles.recScore}>{item.score}/25</Text>
                </View>
                <Text style={styles.recText}>{item.recommendation}</Text>
              </View>
            )
          )}
        </View>

        {/* MATURITY-LEVEL NEXT STEPS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Maturity Level Next Steps:{" "}
            {getRecommendations(results.maturityLevel).title}
          </Text>
          {getRecommendations(results.maturityLevel).items.map(
            (t: string, i: number) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletIdx}>{i + 1}.</Text>
                <Text style={styles.bulletText}>{t}</Text>
              </View>
            )
          )}
        </View>

        {/* FOOTER WITH PAGE NUMBERS */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `© ${currentYear} WeLearn — Building Better Humans Through Learning • Confidential • Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default ReportPDF;
