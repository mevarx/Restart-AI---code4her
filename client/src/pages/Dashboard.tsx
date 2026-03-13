import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, CheckCircle2, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { setCurrentView, profileData, roadmapData } = useApp();

  if (!profileData || !roadmapData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Your Personalized Roadmap</h1>
              <p className="text-lg text-muted-foreground">
                {profileData.previousRole} → {profileData.targetRole}
              </p>
            </div>
            <div
              className="w-32 h-32 rounded-full opacity-20"
              style={{
                backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663430646065/dUX3ufqEwN3QkiacYKSsth/success-illustration-25GrKnwYKtahAXRhyPFUZF.webp)',
                backgroundSize: 'cover',
              }}
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Skill Gap Analysis */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Skill Gap Analysis</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Here's how your current skills compare to industry requirements for your target role
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roadmapData.skillGaps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E1" />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E6E1',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="#0D6B7D" name="Current Level" />
                  <Bar dataKey="target" fill="#E8765A" name="Target Level" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Profile Summary */}
          <motion.div variants={itemVariants}>
            <Card className="p-8 border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Your Profile</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">Previous Role</p>
                  <p className="text-lg font-semibold text-foreground">{profileData.previousRole}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">Experience</p>
                  <p className="text-lg font-semibold text-foreground">{profileData.yearsExperience} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">Career Break</p>
                  <p className="text-lg font-semibold text-foreground">{profileData.breakDuration} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">Target Role</p>
                  <p className="text-lg font-semibold text-foreground">{profileData.targetRole}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold">Work Style</p>
                  <p className="text-lg font-semibold text-foreground capitalize">{profileData.workStyle}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Learning Roadmap */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Learning Roadmap</h2>
            </div>

            <div className="space-y-6">
              {roadmapData.learningSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 pb-6 border-b border-border last:border-b-0 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <p className="text-sm font-semibold text-primary">Duration: {step.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Returnship Opportunities */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Returnship Opportunities</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roadmapData.opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-border hover:border-accent transition-colors card-hover"
                  style={{
                    backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663430646065/dUX3ufqEwN3QkiacYKSsth/opportunity-card-bg-NJP7SD52gAabJpvdih7hvG.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-white/95 rounded-lg" style={{ zIndex: -1 }} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{opportunity.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-3">{opportunity.company}</p>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Interview Focus */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 border border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-accent rounded-full p-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Interview Focus Areas</h2>
            </div>

            <div className="space-y-4">
              {roadmapData.interviewTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-white border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-sm font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-foreground">{topic}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to take the next step in your career journey?
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setCurrentView('landing')}
              variant="outline"
              className="px-6 py-3 text-base"
            >
              Start Over
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base font-semibold">
              Download Roadmap
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
