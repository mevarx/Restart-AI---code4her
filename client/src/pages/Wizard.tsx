import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp, ProfileData } from '@/contexts/AppContext';
import { fetchAIRoadmap } from '@/lib/api';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Wizard() {
  const { setCurrentView, setProfileData, setRoadmapData, isLoading, setIsLoading } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>({
    previousRole: '',
    yearsExperience: 5,
    breakDuration: 2,
    breakReason: '',
    targetRole: '',
    workStyle: '',
  });

  const totalSteps = 3;

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.previousRole || !formData.targetRole || !formData.workStyle) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      setProfileData(formData);
      const roadmap = await fetchAIRoadmap(formData);
      setRoadmapData(roadmap);
      setCurrentView('dashboard');
    } catch (error) {
      toast.error('Failed to generate roadmap. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Career Assessment</h1>
          <p className="text-lg text-muted-foreground">
            Help us understand your background to create your personalized roadmap
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-card rounded-xl p-8 border border-border mb-8">
          {/* Step 1: Previous Role */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Previous Role</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="previousRole" className="text-base font-semibold mb-2 block">
                    Job Title *
                  </Label>
                  <Input
                    id="previousRole"
                    placeholder="e.g., Marketing Manager, Senior Developer"
                    value={formData.previousRole}
                    onChange={(e) => handleInputChange('previousRole', e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsExperience" className="text-base font-semibold mb-2 block">
                    Years of Experience
                  </Label>
                  <Select
                    value={formData.yearsExperience.toString()}
                    onValueChange={(value) => handleInputChange('yearsExperience', parseInt(value))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} {year === 1 ? 'year' : 'years'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Career Break */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Career Break</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="breakDuration" className="text-base font-semibold mb-2 block">
                    How long was your break? (in years)
                  </Label>
                  <Select
                    value={formData.breakDuration.toString()}
                    onValueChange={(value) => handleInputChange('breakDuration', parseInt(value))}
                  >
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5, '5+'].map((duration) => (
                        <SelectItem key={duration} value={duration.toString()}>
                          {duration} {typeof duration === 'number' && duration === 1 ? 'year' : 'years'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="breakReason" className="text-base font-semibold mb-2 block">
                    Reason for break (optional)
                  </Label>
                  <Select value={formData.breakReason} onValueChange={(value) => handleInputChange('breakReason', value)}>
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motherhood">Motherhood</SelectItem>
                      <SelectItem value="caregiving">Caregiving</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="education">Further Education</SelectItem>
                      <SelectItem value="personal">Personal Reasons</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Future Goals */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Future Goals</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="targetRole" className="text-base font-semibold mb-2 block">
                    Target Role *
                  </Label>
                  <Input
                    id="targetRole"
                    placeholder="e.g., Senior Marketing Manager, Product Manager"
                    value={formData.targetRole}
                    onChange={(e) => handleInputChange('targetRole', e.target.value)}
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="workStyle" className="text-base font-semibold mb-2 block">
                    Preferred Work Style *
                  </Label>
                  <Select value={formData.workStyle} onValueChange={(value) => handleInputChange('workStyle', value)}>
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select work style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Fully Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-6 py-3 text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Roadmap...
                </>
              ) : (
                <>
                  Generate My AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Loading Message */}
        {isLoading && (
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
              <div>
                <p className="font-semibold text-foreground">AI is analyzing your profile...</p>
                <p className="text-sm text-muted-foreground">Matching your skills with industry trends</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
