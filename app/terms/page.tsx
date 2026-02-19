import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | thelaunch.space",
  description: "Terms and Conditions for thelaunch.space — the rules governing use of our services.",
  alternates: { canonical: "https://thelaunch.space/terms" },
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors">
          &larr; thelaunch.space
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-text-secondary mb-10">Last updated: February 19, 2026</p>

        <div className="border-t border-border-color my-12" />

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Agreement to Terms</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            By accessing or using thelaunch.space, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or services. These terms constitute a legally binding agreement between you and <strong className="text-text-primary">VAMIX Technologies Private Limited</strong> (CIN: U62013KA2025PTC206643), Bangalore, India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Services</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            thelaunch.space provides AI-powered employee teams for businesses, handling content creation, SEO, and operational tasks. Our services include but are not limited to AI agent setup, content automation, and strategic consulting for small businesses and founders.
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Service scope, deliverables, and timelines are defined on a per-engagement basis and communicated to you before work begins.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">AI-Generated Content</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Portions of the content on this website, including blog posts, are generated or assisted by artificial intelligence. While we review AI-generated content for accuracy and quality, we do not guarantee that all information is error-free. AI-generated content is provided for informational purposes and should not be taken as professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Payments &amp; Refunds</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            All payments for our services are non-refundable unless otherwise stated in a specific service agreement. Payment terms, amounts, and schedules will be communicated before any engagement begins. By making a payment, you acknowledge and accept our no-refund policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Intellectual Property</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            All content, branding, design, and code on thelaunch.space is owned by VAMIX Technologies Private Limited unless otherwise noted. You may not reproduce, distribute, or create derivative works from our content without written permission.
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            For paid engagements, intellectual property rights for deliverables are transferred to you upon full payment, unless otherwise specified in the service agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">User Responsibilities</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            You agree to provide accurate information when using our forms and services. You are responsible for maintaining the confidentiality of any account credentials. You agree not to use our website or services for any unlawful purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Limitation of Liability</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            To the maximum extent permitted by applicable law, VAMIX Technologies Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of our website or services.
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Our total liability for any claim arising from or related to these terms or our services shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Disclaimer</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Our services and website are provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Changes to Terms</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website or services after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Governing Law</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Contact</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            For questions about these Terms &amp; Conditions, contact us at{" "}
            <a href="mailto:krishna@thelaunch.space" className="text-accent-blue hover:underline">krishna@thelaunch.space</a>.
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            VAMIX Technologies Private Limited<br />
            Bangalore, India
          </p>
        </section>
      </main>
    </div>
  );
}
