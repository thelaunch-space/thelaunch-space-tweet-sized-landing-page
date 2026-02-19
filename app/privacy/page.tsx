import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | thelaunch.space",
  description: "Privacy Policy for thelaunch.space — how we collect, use, and protect your data.",
  alternates: { canonical: "https://thelaunch.space/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors">
          &larr; thelaunch.space
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Privacy Policy</h1>
        <p className="text-sm text-text-secondary mb-10">Last updated: February 19, 2026</p>

        <div className="border-t border-border-color my-12" />

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Who We Are</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            thelaunch.space is operated by <strong className="text-text-primary">VAMIX Technologies Private Limited</strong> (CIN: U62013KA2025PTC206643), a company registered in Bangalore, India. When we say &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our,&rdquo; we mean VAMIX Technologies Private Limited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">What Data We Collect</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            When you use our lead capture forms, we collect the information you provide directly:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg text-text-secondary leading-relaxed mb-6 space-y-2 pl-2">
            <li>Email address</li>
            <li>WhatsApp number</li>
            <li>Company or business name</li>
            <li>Website URL</li>
            <li>Project descriptions or messages you submit</li>
          </ul>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We also collect data automatically when you visit our site:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg text-text-secondary leading-relaxed mb-6 space-y-2 pl-2">
            <li><strong className="text-text-primary">Google Analytics 4:</strong> Anonymous usage data including pages visited, time on site, device type, and approximate location. Google Analytics uses cookies to distinguish users.</li>
            <li><strong className="text-text-primary">Geo-region cookie:</strong> We set a cookie to detect your general geographic region for content personalization. This does not track your precise location.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">How We Use Your Data</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We use the information you provide to respond to your inquiries, deliver the services you request, and communicate with you about our offerings. Analytics data helps us understand how visitors use our site so we can improve it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Where Your Data Goes</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Your form submissions are processed through the following services:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg text-text-secondary leading-relaxed mb-6 space-y-2 pl-2">
            <li><strong className="text-text-primary">Make.com:</strong> Our automation platform that routes form submissions to the right place. Data passes through Make.com&apos;s servers during processing.</li>
            <li><strong className="text-text-primary">Convex:</strong> Our database provider where form submissions are stored.</li>
            <li><strong className="text-text-primary">Google Analytics:</strong> Anonymous usage analytics are processed by Google.</li>
            <li><strong className="text-text-primary">Clerk:</strong> Used for admin authentication only. No visitor data is stored in Clerk.</li>
          </ul>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We do not sell your personal data to third parties. We share data only with the service providers listed above, who process it on our behalf.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Cookies</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We use cookies for Google Analytics (to understand site traffic) and a geo-region cookie (to personalize content). You can disable cookies in your browser settings, though some site features may not work as expected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Your Rights</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Depending on your location, you may have rights regarding your personal data under applicable laws including India&apos;s Digital Personal Data Protection Act (DPDPA) and the EU&apos;s General Data Protection Regulation (GDPR). These may include the right to access, correct, or delete your personal data.
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:krishna@thelaunch.space" className="text-accent-blue hover:underline">krishna@thelaunch.space</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Data Retention</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We retain your personal data for as long as necessary to provide our services and fulfill the purposes described in this policy. You can request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Changes to This Policy</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Contact</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            If you have questions about this Privacy Policy or how we handle your data, reach out to us at{" "}
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
