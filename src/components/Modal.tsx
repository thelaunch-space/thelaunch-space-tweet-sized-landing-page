import { X } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { sendLeadToWebhook } from '../lib/webhook';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [projectDescription, setProjectDescription] = useState('');
  const [email, setEmail] = useState('');
  const [preferWhatsApp, setPreferWhatsApp] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (projectDescription.length < 10) {
      setError("Please provide more details about what you're building");
      setIsSubmitting(false);
      return;
    }

    // Conditional validation
    if (preferWhatsApp && !whatsappNumber) {
      setError('Please enter your WhatsApp number');
      setIsSubmitting(false);
      return;
    }
    if (!preferWhatsApp && !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        project_description: projectDescription,
        prefer_whatsapp: preferWhatsApp,
        email: preferWhatsApp ? null : email,
        whatsapp_number: preferWhatsApp ? whatsappNumber : null,
      };

      console.log('Submitting lead with payload:', payload);

      const result = await sendLeadToWebhook(payload);

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit lead');
      }

      console.log('Lead submitted successfully');
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset state after a delay to allow for exit animation
        setTimeout(() => {
          setIsSuccess(false);
          setProjectDescription('');
          setEmail('');
          setPreferWhatsApp(false);
          setWhatsappNumber('');
        }, 300);
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      console.error('Error submitting lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border-color rounded-2xl shadow-2xl w-full max-w-[640px] p-8 md:p-12 relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Got it!</h3>
            <p className="text-text-secondary">You'll hear from us within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              What are you building?
            </h2>

            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder='A CRM for real estate agents" or "An AI tool that summarizes legal documents'
              className="w-full min-h-[120px] p-4 bg-border-color/50 border border-border-color rounded-lg text-base text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40 transition-all mb-4 resize-y"
              required
            />

            <div className="space-y-3 mb-6 text-sm md:text-base text-text-secondary">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>I'll record a personalized voice note within 24 hours</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Breaking down what you actually need</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Timeline + whether we're a fit</span>
              </div>
            </div>

            {!preferWhatsApp ? (
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-border-color/50 border border-border-color rounded-lg text-base text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40 transition-all"
                  required={!preferWhatsApp}
                />
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-text-secondary mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-4 bg-border-color/50 border border-border-color rounded-lg text-base text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40 transition-all"
                  required={preferWhatsApp}
                />
              </div>
            )}

            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferWhatsApp}
                  onChange={(e) => setPreferWhatsApp(e.target.checked)}
                  className="w-4 h-4 text-accent-blue bg-border-color border-border-color rounded focus:ring-2 focus:ring-accent-blue/40"
                />
                <span className="text-sm md:text-base text-text-secondary">
                  Prefer WhatsApp instead?
                </span>
              </label>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent-blue text-white font-medium text-base md:text-lg py-4 px-8 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isSubmitting ? 'Sending...' : 'Send →'}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
