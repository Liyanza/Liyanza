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
            We never sell your personal data. It is shared, only as far as
            necessary, with:
          </p>
          <ul>
            <li>
              our <strong>technical processors</strong>:{" "}
              <strong>Amazon Web Services</strong> (hosting of the API, database,
              AI assistant and backups, on servers located in Paris, France),{" "}
              <strong>Vercel</strong> (website hosting), <strong>Brevo</strong>{" "}
              (transactional emails);
            </li>
            <li>
              <strong>Google</strong> (Gemini AI models): the questions you ask the
              assistant and the campaign data needed to answer are sent to it to
              generate analyses and recommendations;
            </li>
            <li>
              <strong>Chariow</strong>, our payment provider: when you subscribe,
              your name, email and phone number are sent to it. Payment (Mobile
              Money or card) happens on its secure page: we never receive your card
              details or Mobile Money codes;
            </li>
            <li>
              <strong>OpenStreetMap (Nominatim)</strong>, to turn the addresses you
              search on the map into coordinates;
            </li>
            <li>
              <strong>Google</strong> and <strong>Meta (Facebook/Instagram)</strong>,
              strictly for sign-in and, if you connect your pages, to read their
              statistics;
            </li>
            <li>
              the <strong>other users of your company</strong>, within the limits
              of their role and access level;
            </li>
            <li>
              any <strong>competent authority</strong>, where the law requires it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="transferts"
          title="7. Transfers of data outside your country"
        >
          <p>
            Your data is mainly hosted in France (Amazon Web Services, Paris
            region). Some providers (Vercel, Google, Meta, Brevo, Chariow) may
            process it in other countries, notably in the United States or the
            European Union.
          </p>
          <p>
            These transfers are covered by these providers&apos; contractual data
            protection commitments and, for users located in Cameroon, carried out
            in compliance with Law No.&nbsp;2024/017 of 23 December 2024 on the
            protection of personal data.
          </p>
        </LegalSection>

        <LegalSection id="duree-conservation" title="8. Retention period">
          <ul>
            <li>
              Account and campaign data: as long as your account is active, then
              deleted within 3 months of its closure.
            </li>
            <li>Database backups: 30 days, then deleted automatically.</li>
            <li>
              Payment and subscription history: 10 years, the retention period for
              accounting records set by the OHADA Uniform Act on accounting law.
            </li>
            <li>
              Technical logs: a limited period necessary for the security of the
              Service.
            </li>
          </ul>
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
            Under Cameroonian Law No.&nbsp;2024/017 of 23 December 2024 on the
            protection of personal data (and the GDPR if you live in the European
            Union), you have the following rights:
          </p>
          <ul>
            <li>right of access to your data;</li>
            <li>right to rectify inaccurate data;</li>
            <li>right to erasure (&quot;right to be forgotten&quot;);</li>
            <li>right to data portability;</li>
            <li>right to object to and restrict certain processing;</li>
            <li>
              right to withdraw your consent at any time, where processing is based
              on it.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at the address given in the
            &quot;Contact&quot; section; we answer within one month. You may also
            lodge a complaint with Cameroon&apos;s personal data protection
            authority (APDP) or, if you live in the European Union, with your
            country&apos;s data protection authority.
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
            For any question about this Policy or to exercise your rights, write to
            us at <a href="mailto:contact@kiyanza.com">contact@kiyanza.com</a>.
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
