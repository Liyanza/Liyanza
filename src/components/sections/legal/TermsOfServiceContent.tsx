import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { LegalSection } from "./LegalSection";

export const termsOfServiceSections = [
  { id: "objet", title: "Objet et champ d'application" },
  { id: "acceptation", title: "Acceptation des conditions" },
  { id: "description-service", title: "Description du service" },
  { id: "compte", title: "Création et gestion de compte" },
  { id: "comptes-entreprise", title: "Comptes entreprise et rôles" },
  { id: "connexion-tiers", title: "Connexion via Google et Facebook" },
  { id: "contenu-utilisateur", title: "Votre contenu et vos données" },
  { id: "obligations", title: "Obligations et usage autorisé" },
  { id: "propriete-intellectuelle", title: "Propriété intellectuelle" },
  { id: "tarifs", title: "Tarifs et facturation" },
  { id: "disponibilite", title: "Disponibilité et évolutions du service" },
  { id: "responsabilite", title: "Limitation de responsabilité" },
  { id: "suspension", title: "Suspension et résiliation" },
  { id: "modification", title: "Modification des présentes conditions" },
  { id: "droit-applicable", title: "Droit applicable et litiges" },
  { id: "contact", title: "Contact" },
];

export function TermsOfServiceContent() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-4">
        <LegalSection id="objet" title="1. Objet et champ d'application">
          <p>
            Les présentes Conditions d&apos;utilisation (les «&nbsp;Conditions&nbsp;»)
            régissent l&apos;accès et l&apos;utilisation de la plateforme KIYANZA
            (le «&nbsp;Service&nbsp;»), éditée par{" "}
            <strong>
              Kiyanza
            </strong>
            , dont le siège social est situé à{" "}
            <strong>Douala, Cameroun</strong>, joignable au{" "}
            <strong>696370479</strong>,
            immatriculée sous le numéro{" "}
            <strong>CM-DLA-01-2026-B12-00529</strong>{" "}
            (ci-après «&nbsp;KIYANZA&nbsp;», «&nbsp;nous&nbsp;»).
          </p>
          <p>
            Elles s&apos;appliquent à toute personne physique ou morale
            («&nbsp;vous&nbsp;», «&nbsp;l&apos;Utilisateur&nbsp;») accédant au
            Service, que ce soit via le site{" "}
            <strong>kiyanza.com</strong> ou toute application associée.
          </p>
        </LegalSection>

        <LegalSection id="acceptation" title="2. Acceptation des conditions">
          <p>
            La création d&apos;un compte, la connexion via Google ou Facebook,
            ou l&apos;utilisation du Service de quelque manière que ce soit
            vaut acceptation pleine et entière des présentes Conditions ainsi
            que de notre{" "}
            <Link href="/politique-confidentialite">
              Politique de confidentialité
            </Link>
            . Si vous n&apos;acceptez pas ces Conditions, vous ne devez pas
            utiliser le Service.
          </p>
          <p>
            Si vous créez un compte au nom d&apos;une entreprise ou d&apos;une
            organisation, vous déclarez disposer du pouvoir d&apos;engager
            cette entité, laquelle est alors réputée «&nbsp;Utilisateur&nbsp;»
            au sens des présentes Conditions.
          </p>
        </LegalSection>

        <LegalSection
          id="description-service"
          title="3. Description du service"
        >
          <p>
            KIYANZA est une plateforme de pilotage de campagnes marketing qui
            permet notamment de&nbsp;:
          </p>
          <ul>
            <li>
              créer, planifier et suivre des campagnes marketing (terrain et
              digitales) et leurs canaux de diffusion&nbsp;;
            </li>
            <li>
              connecter des comptes de réseaux sociaux (Facebook, Instagram)
              pour diffuser et suivre des campagnes digitales&nbsp;;
            </li>
            <li>
              recevoir des recommandations et simulations générées par un
              assistant intelligent&nbsp;;
            </li>
            <li>
              suivre l&apos;exécution de prestations terrain, avec preuves et
              validation par QR code&nbsp;;
            </li>
            <li>
              gérer des tâches, des notifications et des utilisateurs au sein
              d&apos;une même entreprise, avec des rôles et niveaux d&apos;accès
              différenciés.
            </li>
          </ul>
          <p>
            KIYANZA se réserve le droit de faire évoluer, ajouter ou retirer
            des fonctionnalités du Service à tout moment, notamment pour des
            raisons techniques, légales ou de sécurité.
          </p>
        </LegalSection>

        <LegalSection id="compte" title="4. Création et gestion de compte">
          <p>
            L&apos;accès à la plupart des fonctionnalités nécessite la création
            d&apos;un compte, par email et mot de passe ou via un fournisseur
            tiers (Google ou Facebook — voir la section dédiée ci-dessous).
          </p>
          <p>
            Vous vous engagez à fournir des informations exactes et à jour,
            et à maintenir la confidentialité de vos identifiants de
            connexion. Vous êtes responsable de toute activité réalisée
            depuis votre compte. Prévenez-nous sans délai à l&apos;adresse
            indiquée en section «&nbsp;Contact&nbsp;» en cas de suspicion
            d&apos;accès non autorisé.
          </p>
        </LegalSection>

        <LegalSection
          id="comptes-entreprise"
          title="5. Comptes entreprise et rôles"
        >
          <p>
            Un compte utilisateur peut être rattaché à une entreprise et se
            voir attribuer un rôle (par exemple administrateur) déterminant
            son niveau d&apos;accès aux données et fonctionnalités de cette
            entreprise. L&apos;administrateur d&apos;une entreprise est
            responsable de la gestion des accès de ses collaborateurs,
            notamment de la désactivation des comptes des personnes ayant
            quitté l&apos;organisation.
          </p>
          <p>
            KIYANZA n&apos;arbitre pas les litiges internes à une entreprise
            cliente quant à la répartition des rôles ou à l&apos;accès aux
            données&nbsp;: ces questions relèvent de l&apos;organisation
            concernée.
          </p>
        </LegalSection>

        <LegalSection
          id="connexion-tiers"
          title="6. Connexion via Google et Facebook"
        >
          <p>
            Vous pouvez créer un compte ou vous connecter en utilisant votre
            compte Google ou Facebook. Dans ce cas, nous recevons de ces
            fournisseurs les informations strictement nécessaires à la
            création de votre compte (identifiant, adresse email, nom et
            prénom) — voir notre{" "}
            <Link href="/politique-confidentialite">
              Politique de confidentialité
            </Link>{" "}
            pour le détail des données traitées.
          </p>
          <p>
            Votre utilisation de ces fournisseurs tiers reste soumise à
            leurs propres conditions d&apos;utilisation et politiques de
            confidentialité, sur lesquelles KIYANZA n&apos;a aucun contrôle.
          </p>
        </LegalSection>

        <LegalSection
          id="contenu-utilisateur"
          title="7. Votre contenu et vos données"
        >
          <p>
            Vous restez seul propriétaire des contenus que vous importez ou
            créez sur le Service (informations de campagnes, médias, preuves
            d&apos;exécution, etc. — le «&nbsp;Contenu&nbsp;»). Vous nous
            accordez uniquement le droit d&apos;héberger, stocker, afficher et
            traiter ce Contenu dans la stricte mesure nécessaire à la
            fourniture du Service.
          </p>
          <p>
            Vous garantissez disposer de tous les droits nécessaires sur le
            Contenu que vous importez (notamment les médias et visuels
            utilisés dans vos campagnes) et que celui-ci ne viole aucun droit
            de tiers ni aucune loi applicable.
          </p>
        </LegalSection>

        <LegalSection id="obligations" title="8. Obligations et usage autorisé">
          <p>Vous vous engagez à ne pas&nbsp;:</p>
          <ul>
            <li>
              utiliser le Service à des fins illégales, frauduleuses ou
              contraires aux présentes Conditions&nbsp;;
            </li>
            <li>
              tenter d&apos;accéder sans autorisation à des données ou comptes
              appartenant à d&apos;autres utilisateurs ou entreprises&nbsp;;
            </li>
            <li>
              perturber le fonctionnement du Service (introduction de
              logiciels malveillants, surcharge délibérée, contournement des
              mesures de sécurité)&nbsp;;
            </li>
            <li>
              utiliser les intégrations Google/Facebook du Service en
              violation des conditions de ces plateformes.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="propriete-intellectuelle"
          title="9. Propriété intellectuelle"
        >
          <p>
            La marque KIYANZA, le logo, l&apos;interface, le code source et
            l&apos;ensemble des éléments du Service (hors Contenu utilisateur)
            sont la propriété exclusive de KIYANZA ou de ses concédants et
            sont protégés par le droit de la propriété intellectuelle. Aucune
            disposition des présentes ne vous confère un quelconque droit sur
            ces éléments en dehors du droit d&apos;usage du Service accordé
            par les présentes Conditions.
          </p>
        </LegalSection>

        <LegalSection id="tarifs" title="10. Tarifs et facturation">
          <p>
            Les formules et tarifs du Service sont décrits sur notre page{" "}
            <Link href="/tarifs">Tarifs</Link>. Sauf mention contraire, les prix
            sont indiqués hors taxes et peuvent évoluer&nbsp;; toute
            modification tarifaire sera communiquée aux Utilisateurs
            concernés avant son entrée en vigueur pour les abonnements en
            cours.
          </p>
        </LegalSection>

        <LegalSection
          id="disponibilite"
          title="11. Disponibilité et évolutions du service"
        >
          <p>
            KIYANZA met en œuvre des moyens raisonnables pour assurer la
            disponibilité et la sécurité du Service, sans garantie
            d&apos;absence totale d&apos;interruption. Des opérations de
            maintenance planifiées ou d&apos;urgence peuvent entraîner des
            interruptions temporaires, dans la mesure du possible annoncées à
            l&apos;avance.
          </p>
        </LegalSection>

        <LegalSection id="responsabilite" title="12. Limitation de responsabilité">
          <p>
            Le Service est fourni «&nbsp;en l&apos;état&nbsp;». Dans les
            limites autorisées par la loi applicable, KIYANZA ne saurait être
            tenue responsable des dommages indirects (perte de chiffre
            d&apos;affaires, perte de données, perte d&apos;opportunité)
            résultant de l&apos;utilisation ou de l&apos;impossibilité
            d&apos;utiliser le Service, y compris lorsque cette
            indisponibilité résulte d&apos;un tiers (hébergeur, fournisseur
            d&apos;authentification, réseau social intégré).
          </p>
        </LegalSection>

        <LegalSection id="suspension" title="13. Suspension et résiliation">
          <p>
            Vous pouvez cesser d&apos;utiliser le Service et demander la
            suppression de votre compte à tout moment en nous contactant.
          </p>
          <p>
            KIYANZA peut suspendre ou résilier l&apos;accès d&apos;un compte,
            après notification lorsque cela est possible, en cas de
            violation des présentes Conditions, d&apos;usage frauduleux, ou
            sur demande d&apos;une autorité compétente.
          </p>
        </LegalSection>

        <LegalSection
          id="modification"
          title="14. Modification des présentes conditions"
        >
          <p>
            Nous pouvons modifier les présentes Conditions, notamment pour
            refléter une évolution du Service ou une exigence légale. Toute
            modification substantielle vous sera notifiée (par email ou via
            le Service) avant son entrée en vigueur. La poursuite de
            l&apos;utilisation du Service après notification vaut acceptation
            des Conditions modifiées.
          </p>
        </LegalSection>

        <LegalSection id="droit-applicable" title="15. Droit applicable et litiges">
          <p>
            Les présentes Conditions sont régies par le droit{" "}
            <strong>droit applicable — au Cameroun</strong>. Tout litige
            relatif à leur interprétation ou leur exécution relève de la
            compétence exclusive des tribunaux{" "}
            <strong>juridiction compétente — Cameroun</strong>, sauf
            disposition d&apos;ordre public contraire.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="16. Contact">
          <p>
            Pour toute question relative aux présentes Conditions, vous
            pouvez nous contacter à l&apos;adresse&nbsp;:{" "}
            <strong>adresse email de contact — contact@kiyanza.com</strong>.
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
