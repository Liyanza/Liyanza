import { Container } from "@/components/ui/Container";
import { LegalSection } from "./LegalSection";

/**
 * English version of the Privacy policy. Section ids match the French version
 * (PrivacyPolicyContent.tsx) so anchors stay stable. Translation provided for
 * convenience: have it reviewed by a legal professional before relying on it.
 */
export const privacyPolicySectionsEn = [
  { id: "introduction", title: "Introduction and data controller" },
  { id: "donnees-collectees", title: "Data we collect" },
  { id: "origine-donnees", title: "How we collect this data" },
  { id: "finalites", title: "Why we use your data" },
  { id: "base-legale", title: "Legal basis for processing" },
  { id: "partage", title: "Who we share your data with" },
  { id: "transferts", title: "Data transfers outside your country" },
  { id: "duree-conservation", title: "Retention period" },
  { id: "securite", title: "Security of your data" },
  { id: "cookies", title: "Cookies and trackers" },
  { id: "droits", title: "Your rights" },
  { id: "mineurs", title: "Minors" },
  { id: "modification", title: "Changes to this policy" },
  { id: "contact", title: "Contact and complaints" },
];

export function PrivacyPolicyContentEn() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-4">
        <LegalSection id="introduction" title="1. Introduction and data controller">
          <p>
            This Privacy policy explains how <strong>Kiyanza</strong>, whose registered office is
            located in <strong>Douala, Cameroon</strong>, reachable at <strong>696370479</strong>{" "}
            (&ldquo;KIYANZA&rdquo;, &ldquo;we&rdquo;), as data controller, collects, uses and
            protects the personal data of users (&ldquo;you&rdquo;) of the KIYANZA platform.
          </p>
          <p>
            It applies to anyone who creates an account or uses the Service, whether they signed up by
            email or through Google/Facebook.
          </p>
        </LegalSection>

        <LegalSection id="donnees-collectees" title="2. Data we collect">
          <h3>Account data</h3>
          <p>
            First name, last name, email address, phone number (optional), password (stored in
            encrypted form, never in plain text) and, for accounts created through Google or Facebook,
            the identifier provided by that service.
          </p>
          <h3>Company data</h3>
          <p>
            When your account is attached to a company: company name, billing information, and the
            role and access level of associated users.
          </p>
          <h3>Campaign data and content</h3>
          <p>
            Marketing campaign information, distribution channels, uploaded media and visuals, proof
            of execution of field services, and conversations with the intelligent assistant.
          </p>
          <h3>Connected social account data</h3>
          <p>
            If you link a Facebook/Instagram account to run digital campaigns, we keep (in encrypted
            form) the access tokens required for this integration, as well as the identifiers of the
            linked pages/accounts.
          </p>
          <h3>Technical data</h3>
          <p>
            IP address, connection and activity logs, device and browser type, for security purposes
            and to keep the Service running properly.
          </p>
        </LegalSection>

        <LegalSection id="origine-donnees" title="3. How we collect this data">
          <ul>
            <li>directly, when you create an account, fill in a form or use the Service;</li>
            <li>
              through Google or Facebook, when you choose to sign in with one of these accounts — we
              only receive the information you authorise (identifier, email, name) and never receive
              your Google/Facebook password;
            </li>
            <li>automatically, as you browse the Service (technical data, cookies — see the dedicated section).</li>
          </ul>
        </LegalSection>

        <LegalSection id="finalites" title="4. Why we use your data">
          <ul>
            <li>to provide, operate and secure the Service;</li>
            <li>to create and authenticate your account, including through Google/Facebook;</li>
            <li>to manage your marketing campaigns and publish them on your connected social accounts;</li>
            <li>
              to send you service-related communications (password reset emails, notifications, task
              reminders);
            </li>
            <li>to generate recommendations and simulations through our intelligent assistant;</li>
            <li>to keep the Service secure and prevent fraud or abuse;</li>
            <li>to meet our legal and regulatory obligations.</li>
          </ul>
        </LegalSection>

        <LegalSection id="base-legale" title="5. Legal basis for processing">
          <p>Depending on the case, our processing is based on:</p>
          <ul>
            <li>
              the <strong>performance of the contract</strong> between us (providing the Service you
              signed up for);
            </li>
            <li>
              our <strong>legitimate interest</strong> (security, improving the Service, fraud
              prevention);
            </li>
            <li>
              your <strong>consent</strong>, in particular for signing in with Google/Facebook and for
              non-essential communications (e.g. newsletter);
            </li>
            <li>
              compliance with a <strong>legal obligation</strong> applicable to KIYANZA.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="partage" title="6. Who we share your data with">
          <p>
            We never sell your personal data. It may be shared, only to the extent strictly necessary,
            with:
          </p>
          <ul>
            <li>
              our <strong>technical processors</strong>: application and database hosting provider,
              media storage provider, transactional email provider;
            </li>
            <li>
              <strong>Google</strong> and <strong>Meta (Facebook/Instagram)</strong>, strictly for
              authentication and, if you enable it, for running your digital campaigns on your own
              accounts;
            </li>
            <li>
              <strong>other users in your company</strong>, within the limits of their role and access
              level;
            </li>
            <li>any <strong>competent authority</strong>, where required by law.</li>
          </ul>
        </LegalSection>

        <LegalSection id="transferts" title="7. Data transfers outside your country">
          <p>
            Some of our providers (hosting, storage, email delivery, Google/Meta authentication
            providers) may process data outside your country of residence. Where this is the case, we
            ensure that such transfers are covered by appropriate safeguards (standard contractual
            clauses or equivalent).
          </p>
        </LegalSection>

        <LegalSection id="duree-conservation" title="8. Retention period">
          <p>
            Your account data is kept for as long as your account is active, then archived or deleted
            within a reasonable period after it is closed, subject to retention periods required by law
            (for example for accounting purposes). Technical logs are kept for a limited period
            necessary for the security of the Service.
          </p>
        </LegalSection>

        <LegalSection id="securite" title="9. Security of your data">
          <p>
            We implement appropriate technical and organisational measures to protect your data:
            passwords never stored in plain text, encryption of access tokens for connected social
            accounts, encrypted communications (HTTPS), and internal access restricted on a
            least-privilege basis.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title="10. Cookies and trackers">
          <p>
            The Service uses cookies that are strictly necessary for it to work (keeping you signed in,
            security). Audience measurement or personalisation cookies may be used with your consent,
            which you can withdraw at any time. For more details, see our Cookies page once it is
            available, or contact us.
          </p>
        </LegalSection>

        <LegalSection id="droits" title="11. Your rights">
          <p>
            In accordance with applicable data protection regulations (including the GDPR if you live
            in the European Union), you have the following rights:
          </p>
          <ul>
            <li>the right to access your data;</li>
            <li>the right to rectify inaccurate data;</li>
            <li>the right to erasure (&ldquo;right to be forgotten&rdquo;);</li>
            <li>the right to data portability;</li>
            <li>the right to object to and restrict certain processing;</li>
            <li>the right to withdraw your consent at any time, where processing is based on it.</li>
          </ul>
          <p>
            To exercise these rights, contact us at the address given in the &ldquo;Contact&rdquo;
            section. You also have the right to lodge a complaint with the competent data protection
            authority (<strong>competent supervisory authority — APDP</strong>).
          </p>
        </LegalSection>

        <LegalSection id="mineurs" title="12. Minors">
          <p>
            The Service is intended for professionals and is not intended for minors. We do not
            knowingly collect data about minors.
          </p>
        </LegalSection>

        <LegalSection id="modification" title="13. Changes to this policy">
          <p>
            We may update this Privacy policy, in particular to reflect changes to the Service or to
            regulations. Any material change will be notified to you before it takes effect.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="14. Contact and complaints">
          <p>
            For any question about this Policy or to exercise your rights, contact us at:{" "}
            <strong>contact@kiyanza.com</strong>.
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
