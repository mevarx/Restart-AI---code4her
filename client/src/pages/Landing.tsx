import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
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
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663430646065/dUX3ufqEwN3QkiacYKSsth/hero-background-nprpfz5LLUNQmZenSJtBzU.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Bridge Your Career Gap with Confidence
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              ReStart AI analyzes your past experience and generates a personalized re-entry roadmap, helping you return to the workforce with clarity and confidence.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setCurrentView('wizard')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-lg font-semibold flex items-center gap-2 group"
              >
                Create My Roadmap
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-lg font-semibold"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
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
                className="bg-card rounded-xl p-8 text-center card-hover border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-full p-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Restart Your Career?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of women taking control of their career re-entry journey
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentView('wizard')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-lg font-semibold"
            >
              Start Your Assessment
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
