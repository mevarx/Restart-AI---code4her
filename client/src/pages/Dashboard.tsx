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
    <div className="min-h-screen mesh-bg relative py-12 px-4 overflow-hidden z-[1]">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-float opacity-50 pointer-events-none -z-[1]" />
      <div className="absolute top-1/2 right-[-5%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl animate-float-delayed opacity-50 pointer-events-none -z-10" />

      {/* Code for Her Hackathon - Cherry on Top Reference Image Blend */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[1000px] pointer-events-none -z-[1] opacity-15"
        style={{
          backgroundImage: 'url(/hero-profile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
          mixBlendMode: 'multiply',
          WebkitMaskImage: 'radial-gradient(circle at center right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          maskImage: 'radial-gradient(circle at center right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 premium-text-gradient py-1">Your Personalized Roadmap</h1>
              <p className="text-xl text-foreground/80 font-medium">
                {profileData.previousRole} → {profileData.targetRole}
              </p>
            </div>
            <div className="hidden md:block w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-float" />
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
            <Card className="glass-card p-8 md:p-10 border-white/60">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 shadow-lg shadow-primary/20">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Skill Gap Analysis</h2>
              </div>
              <p className="text-foreground/70 mb-8 font-medium">
                Here's how your current skills compare to industry requirements for your target role
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={roadmapData.skillGaps}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={1}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={1}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E1" vertical={false} />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12, fill: '#4B5563', fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4B5563' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(13, 107, 125, 0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      color: '#2C2C2C',
                      fontWeight: 600
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="current" fill="url(#colorCurrent)" name="Current Level" radius={[6, 6, 0, 0]} barSize={32} />
                  <Bar dataKey="target" fill="url(#colorTarget)" name="Target Level" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Profile Summary */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card p-8 md:p-10 border-white/60 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold text-foreground mb-8">Your Profile</h3>
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
          <Card className="glass-card p-8 md:p-12 border-white/60">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 shadow-lg shadow-primary/20">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Your Learning Roadmap</h2>
            </div>

            <div className="space-y-8 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary/30 to-accent/30 hidden md:block" />

              {roadmapData.learningSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 relative z-10 p-6 rounded-2xl transition-all duration-300 hover:bg-white/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold shadow-lg shadow-primary/30 text-lg border-2 border-white">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow pt-2 md:pt-0">
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-foreground/70 font-medium mb-4 leading-relaxed">{step.description}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
                      Duration: {step.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Returnship Opportunities */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card className="glass-card p-8 md:p-12 border-white/60">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 shadow-lg shadow-primary/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Returnship Opportunities</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roadmapData.opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-8 group relative overflow-hidden card-hover border-white/40 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Subtle Hover Gradient Base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{opportunity.title}</h3>
                  <p className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">{opportunity.company}</p>
                  <p className="text-foreground/70 font-medium leading-relaxed">{opportunity.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Interview Focus */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card p-8 md:p-12 border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 shadow-lg shadow-primary/20">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Interview Focus Areas</h2>
            </div>

            <div className="space-y-4">
              {roadmapData.interviewTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent/20 text-accent text-sm font-bold shadow-sm">
                      ✓
                    </div>
                  </div>
                  <p className="text-foreground/80 font-medium leading-relaxed pt-0.5">{topic}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl text-foreground/80 font-medium mb-8">
            Ready to take the next step in your career journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setCurrentView('landing')}
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold bg-white/50 border-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 w-full sm:w-auto"
            >
              Start Over
            </Button>
            <Button className="btn-primary rounded-full px-10 py-6 text-base font-bold shadow-xl shadow-primary/20 w-full sm:w-auto">
              Download Full Roadmap PDF
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
