import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ArrowRight, Sparkles, Users, Zap, TrendingUp, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const { setCurrentView } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      >
        {/* Abstract floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-float-delayed opacity-50" />

        <div className="container relative z-10 pt-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="animate-float">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold tracking-wide uppercase text-primary">Your AI Career Coach</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight premium-text-gradient py-2">
                Bridge Your Career Gap<br/>With Confidence
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              ReStart AI analyzes your past experience and generates a personalized re-entry roadmap, helping you return to the workforce with clarity and confidence.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setCurrentView('wizard')}
                className="btn-primary rounded-full text-lg px-10 py-7 font-bold flex items-center gap-2 group"
              >
                Create My Roadmap
                <ArrowRight className="group-hover:translate-x-1 duration-300 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full text-lg px-10 py-7 font-bold border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Diagonal Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 transform -skew-y-3 origin-top-left -z-10" />
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get back on track
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Share Your Story',
                description: 'Tell us about your background, career break, and goals',
              },
              {
                icon: Zap,
                title: 'AI Analysis',
                description: 'Our AI analyzes industry trends and skill gaps',
              },
              {
                icon: Users,
                title: 'Get Your Roadmap',
                description: 'Receive a personalized learning and opportunity plan',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center card-hover relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 shadow-lg shadow-primary/20 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More / Deep Dive Section */}
      <section id="learn-more" className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why ReStart AI?</h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                Returning to work after a career break can feel overwhelming. Industry standards change,
                new tools emerge, and confidence can take a hit. That's where we come in.
              </p>
            </motion.div>

            <div className="space-y-12">
              <motion.div
                className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-3xl p-8 shadow-sm border border-black/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Data-Driven Skill Mapping</h3>
                  <p className="text-foreground/70 leading-relaxed font- মাঝারি text-lg">
                    We don't just guess what you need to learn. Our AI engine cross-references your past experience 
                    with thousands of current job postings to identify exact skill gaps and build a targeted learning path.
                  </p>
                </div>
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white rounded-3xl p-8 shadow-sm border border-black/5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Curated Returnship Opportunities</h3>
                  <p className="text-foreground/70 leading-relaxed font- মাঝারি text-lg">
                    Forget endless scrolling through generic job boards. We match you with specific "returnship" 
                    programs and inclusive companies actively looking for professionals ready to restart their careers.
                  </p>
                </div>
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-10 h-10 text-accent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 mesh-bg relative overflow-hidden z-0">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />
        <div className="container text-center relative z-10">
          <motion.div
            className="glass-card max-w-4xl mx-auto p-12 md:p-16 border-white/60"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Restart Your Career?</h2>
            <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of women taking control of their career re-entry journey with data-driven AI coaching.
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentView('wizard')}
              className="btn-primary rounded-full text-lg px-12 py-7 font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
            >
              Start Your Free Assessment
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
