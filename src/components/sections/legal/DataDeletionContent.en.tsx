import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LegalSection } from "./LegalSection";

/**
 * English version of the data deletion page. Section ids match the French
 * version (DataDeletionContent.tsx). Translation provided for convenience:
 * have it reviewed by a legal professional before relying on it.
 */
export function DataDeletionContentEn() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-4">
        <LegalSection id="objet" title="1. Purpose">
          <p>
            This page explains how to request the deletion of your personal data from the KIYANZA
            platform, in accordance with our{" "}
            <Link href="/politique-confidentialite">Privacy policy</Link>, including when your account
            was created through Google or Facebook.
          </p>
        </LegalSection>

        <LegalSection id="donnees-supprimees" title="2. Data concerned">
          <p>
            A deletion request erases your account data (first name, last name, email, password, linked
            Google/Facebook identifiers), as well as the access tokens for your connected social
            accounts.
          </p>
          <p>
            Campaign data attached to a <strong>company</strong> (rather than to you personally) is kept
            unless that company&apos;s administrator requests otherwise, as it belongs to the business
            account and may be shared with other users in the same organisation.
          </p>
          <p>
            Some data may be kept after deletion where the law requires it (for example accounting
            obligations), for the strictly necessary period.
          </p>
        </LegalSection>

        <LegalSection id="comment-demander" title="3. How to request deletion">
          <p>
            Send a request to <strong>contact@kiyanza.com</strong> from the email address associated
            with your KIYANZA account, with the subject &ldquo;Data deletion request&rdquo;. We may ask
            you to confirm your identity before proceeding, to prevent a third party from deleting your
            data on your behalf.
          </p>
        </LegalSection>

        <LegalSection id="delai" title="4. Processing time">
          <p>
            We process deletion requests within a maximum of <strong>30 days</strong> of receipt, and
            confirm by email once the deletion is complete.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="5. Contact">
          <p>
            For any question about this process, contact us at: <strong>contact@kiyanza.com</strong>.
            See also your <Link href="/politique-confidentialite">data rights</Link> for the other
            actions available (access, rectification, portability).
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
