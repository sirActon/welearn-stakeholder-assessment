import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import type { AssessmentData, Results } from "@/app/page";
import { maturityLevelRecommendations, getSectionRecommendation, sectionKeyToRecommendationKey } from '@/lib/recommendations';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    color: 'white',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 5,
  },
  maturityBox: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  maturityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  maturityLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 5,
  },
  maturityDescription: {
    fontSize: 12,
    marginBottom: 10,
  },
  maturityModelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  maturityModelItem: {
    width: '48%',
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 5,
    backgroundColor: '#f8fafc',
  },
  maturityModelItemActive: {
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
  },
  maturityModelItemHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  maturityModelItemDescription: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 5,
  },
  sectionScoresContainer: {
    marginVertical: 15,
  },
  scoreItem: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 5,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  scoreName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 12,
    color: '#f97316',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginTop: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f97316',
    borderRadius: 2,
  },
  reflectionItem: {
    marginBottom: 10,
  },
  reflectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reflectionContent: {
    fontSize: 10,
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 5,
  },
  recommendationsContainer: {
    marginVertical: 15,
  },
  recommendationItem: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  recommendationBullet: {
    width: 15,
    fontSize: 12,
  },
  recommendationText: {
    fontSize: 11,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
});

// Section names
const sectionNames = {
  alignment: "Alignment to Business Strategy",
  governance: "Learning Governance",
  technology: "Technology and Ecosystem Integration",
  content: "Content and Experience Strategy",
  measurement: "Measurement and Analytics",
  culture: "Culture and Change Readiness",
};

// Get section-specific recommendations based on scores
const getSectionSpecificRecommendations = (sectionScores: Record<string, number>) => {
  return Object.keys(sectionScores).map(sectionKey => ({
    section: sectionNames[sectionKey as keyof typeof sectionNames] || sectionKey,
    score: sectionScores[sectionKey],
    recommendation: getSectionRecommendation(sectionKey, sectionScores[sectionKey])
  })).filter(item => item.recommendation);
};

interface ReportPDFProps {
  assessmentData: AssessmentData;
  results: Results;
}

const getRecommendations = (maturityLevel: string) => {
  return maturityLevelRecommendations[maturityLevel as keyof typeof maturityLevelRecommendations] || maturityLevelRecommendations["Reactive"];
};

const ReportPDF: React.FC<ReportPDFProps> = ({ assessmentData, results }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>WELEARN</Text>
          <Text style={styles.headerText}>Generated on {currentDate}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Learning Strategy Scorecard Report</Text>

        {/* Participant Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Participant Information</Text>
          {assessmentData.demographics.name && (
            <Text>Name: {assessmentData.demographics.name}</Text>
          )}
          {assessmentData.demographics.email && (
            <Text>Email: {assessmentData.demographics.email}</Text>
          )}
          <Text>Submission ID: {assessmentData.submissionId || "fldu0yi0EKKvAH2gr"}</Text>
          {/* Company information removed as it's not in the current type definition */}
        </View>

        {/* Maturity Level */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Maturity Assessment</Text>
          <View style={styles.maturityBox}>
            <Text style={styles.maturityTitle}>
              Overall Score: {results.totalScore}/150
            </Text>
            <Text style={styles.maturityLevel}>
              Maturity Level: {results.maturityLevel}
            </Text>
            <Text style={styles.maturityDescription}>
              {results.maturityDescription}
            </Text>
          </View>

          {/* Maturity Model Explanation */}
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
            Understanding the Maturity Model
          </Text>
          <View style={styles.maturityModelContainer}>
            <View style={[
              styles.maturityModelItem, 
              results.maturityLevel === "Reactive" ? styles.maturityModelItemActive : {}
            ]}>
              <Text style={[styles.maturityModelItemHeader, { color: '#dc2626' }]}>
                Reactive (0-74)
              </Text>
              <Text style={styles.maturityModelItemDescription}>
                Basic learning activities with limited strategy
              </Text>
            </View>
            <View style={[
              styles.maturityModelItem,
              results.maturityLevel === "Operational" ? styles.maturityModelItemActive : {}
            ]}>
              <Text style={[styles.maturityModelItemHeader, { color: '#f97316' }]}>
                Operational (75-104)
              </Text>
              <Text style={styles.maturityModelItemDescription}>
                Structured processes with some measurement
              </Text>
            </View>
            <View style={[
              styles.maturityModelItem,
              results.maturityLevel === "Strategic" ? styles.maturityModelItemActive : {}
            ]}>
              <Text style={[styles.maturityModelItemHeader, { color: '#2563eb' }]}>
                Strategic (105-129)
              </Text>
              <Text style={styles.maturityModelItemDescription}>
                Aligned with business goals and data-driven
              </Text>
            </View>
            <View style={[
              styles.maturityModelItem,
              results.maturityLevel === "Transformational" ? styles.maturityModelItemActive : {}
            ]}>
              <Text style={[styles.maturityModelItemHeader, { color: '#16a34a' }]}>
                Transformational (130-150)
              </Text>
              <Text style={styles.maturityModelItemDescription}>
                Innovation-driven with continuous improvement
              </Text>
            </View>
          </View>
        </View>

        {/* Section Scores */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Section Scores</Text>
          <View style={styles.sectionScoresContainer}>
            {Object.entries(results.sectionScores).map(([sectionKey, score]) => (
              <View key={sectionKey} style={styles.scoreItem}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreName}>
                    {sectionNames[sectionKey as keyof typeof sectionNames]}
                  </Text>
                  <Text style={styles.scoreValue}>{score}/25</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(score / 25) * 100}%` }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Reflections */}
        {(assessmentData.actionPlanning?.improvementArea ||
          assessmentData.actionPlanning?.biggestChallenge ||
          assessmentData.actionPlanning?.successVision) && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Your Reflections</Text>
            {assessmentData.actionPlanning?.improvementArea && (
              <View style={styles.reflectionItem}>
                <Text style={styles.reflectionTitle}>Area for Improvement</Text>
                <Text style={styles.reflectionContent}>
                  {assessmentData.actionPlanning?.improvementArea}
                </Text>
              </View>
            )}
            {assessmentData.actionPlanning?.biggestChallenge && (
              <View style={styles.reflectionItem}>
                <Text style={styles.reflectionTitle}>Biggest Challenge</Text>
                <Text style={styles.reflectionContent}>
                  {assessmentData.actionPlanning?.biggestChallenge}
                </Text>
              </View>
            )}
            {assessmentData.actionPlanning?.successVision && (
              <View style={styles.reflectionItem}>
                <Text style={styles.reflectionTitle}>Vision of Success</Text>
                <Text style={styles.reflectionContent}>
                  {assessmentData.actionPlanning?.successVision}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Section-Specific Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Targeted Section Recommendations
          </Text>
          <View style={styles.recommendationsContainer}>
            {getSectionSpecificRecommendations(results.sectionScores).map((item, index) => (
              <View key={index} style={[styles.scoreItem, { marginBottom: 15 }]}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreName}>{item.section}</Text>
                  <Text style={styles.scoreValue}>{item.score}/30</Text>
                </View>
                <Text style={{ fontSize: 10, marginTop: 5 }}>{item.recommendation}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Maturity Level Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Maturity Level Next Steps: {getRecommendations(results.maturityLevel).title}
          </Text>
          <View style={styles.recommendationsContainer}>
            {getRecommendations(results.maturityLevel).items.map((item, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={styles.recommendationBullet}>{index + 1}.</Text>
                <Text style={styles.recommendationText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2024 WeLearn. Building Better Humans Through Learning. This report is confidential and intended solely for the named recipient.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF;
