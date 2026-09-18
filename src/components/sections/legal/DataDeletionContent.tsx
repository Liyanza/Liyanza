import { Container } from "@/components/ui/Container";
import { LegalSection } from "./LegalSection";

export function DataDeletionContent() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-4">
        <LegalSection id="objet" title="1. Objet">
          <p>
            Cette page explique comment demander la suppression de vos
            données à caractère personnel de la plateforme KIYANZA,
            conformément à notre{" "}
            <a href="/politique-confidentialite">
              Politique de confidentialité
            </a>
            , y compris lorsque votre compte a été créé via Google ou
            Facebook.
          </p>
        </LegalSection>

        <LegalSection id="donnees-supprimees" title="2. Données concernées">
          <p>
            Une demande de suppression entraîne l&apos;effacement de vos
            données de compte (nom, prénom, email, mot de passe, identifiants
            Google/Facebook liés), ainsi que des jetons d&apos;accès à vos
            comptes sociaux connectés.
          </p>
          <p>
            Les données de campagnes rattachées à une <strong>entreprise</strong>{" "}
            (et non à vous personnellement) sont conservées, sauf demande de
            l&apos;administrateur de cette entreprise, car elles appartiennent
            au compte professionnel et peuvent être partagées avec
            d&apos;autres utilisateurs de la même organisation.
          </p>
          <p>
            Certaines données peuvent être conservées au-delà de la
            suppression lorsque la loi nous l&apos;impose (par exemple des
            obligations comptables), pour la durée strictement nécessaire.
          </p>
        </LegalSection>

        <LegalSection id="comment-demander" title="3. Comment demander la suppression">
          <p>
            Envoyez une demande à l&apos;adresse{" "}
            <strong>contact@kayanza.com</strong> depuis
            l&apos;adresse email associée à votre compte KIYANZA, avec pour
            objet «&nbsp;Demande de suppression de données&nbsp;». Nous
            pouvons vous demander de confirmer votre identité avant de
            procéder, afin d&apos;éviter qu&apos;un tiers ne supprime vos
            données à votre place.
          </p>
        </LegalSection>

        <LegalSection id="delai" title="4. Délai de traitement">
          <p>
            Nous traitons les demandes de suppression dans un délai maximum
            de <strong>30 jours</strong> à compter de leur réception, et vous
            confirmons par email une fois la suppression effectuée.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="5. Contact">
          <p>
            Pour toute question sur ce processus, contactez-nous à
            l&apos;adresse&nbsp;:{" "}
            <strong>contact@kayanza.com</strong>. Voir
            aussi nos <a href="/politique-confidentialite">
              droits en matière de données
            </a>{" "}
            pour les autres actions possibles (accès, rectification,
            portabilité).
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
