import { Container } from "@/components/ui/Container";
import { LegalSection } from "./LegalSection";

export const privacyPolicySections = [
  { id: "introduction", title: "Introduction et responsable du traitement" },
  { id: "donnees-collectees", title: "Données que nous collectons" },
  { id: "origine-donnees", title: "Comment nous collectons ces données" },
  { id: "finalites", title: "Pourquoi nous utilisons vos données" },
  { id: "base-legale", title: "Base légale des traitements" },
  { id: "partage", title: "Avec qui nous partageons vos données" },
  { id: "transferts", title: "Transferts de données hors de votre pays" },
  { id: "duree-conservation", title: "Durée de conservation" },
  { id: "securite", title: "Sécurité de vos données" },
  { id: "cookies", title: "Cookies et traceurs" },
  { id: "droits", title: "Vos droits" },
  { id: "mineurs", title: "Mineurs" },
  { id: "modification", title: "Modifications de cette politique" },
  { id: "contact", title: "Contact et réclamations" },
];

export function PrivacyPolicyContent() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-4">
        <LegalSection
          id="introduction"
          title="1. Introduction et responsable du traitement"
        >
          <p>
            La présente Politique de confidentialité explique comment{" "}
            <strong>
              Kiyanza
            </strong>
            , dont le siège social est situé à{" "}
            <strong>Douala, Cameroun</strong>, joignable au{" "}
            <strong>696370479</strong>{" "}
            («&nbsp;KIYANZA&nbsp;», «&nbsp;nous&nbsp;»), responsable du
            traitement, collecte, utilise et protège les données à caractère
            personnel des utilisateurs («&nbsp;vous&nbsp;») de la plateforme
            KIYANZA.
          </p>
          <p>
            Elle s&apos;applique à toute personne créant un compte ou
            utilisant le Service, qu&apos;elle se soit inscrite par email ou
            via Google/Facebook.
          </p>
        </LegalSection>

        <LegalSection id="donnees-collectees" title="2. Données que nous collectons">
          <h3>Données de compte</h3>
          <p>
            Nom, prénom, adresse email, numéro de téléphone (facultatif),
            mot de passe (stocké sous forme chiffrée, jamais en clair), et,
            pour les comptes créés via Google ou Facebook, l&apos;identifiant
            fourni par ce service.
          </p>
          <h3>Données d&apos;entreprise</h3>
          <p>
            Lorsque votre compte est rattaché à une entreprise&nbsp;: nom de
            l&apos;entreprise, informations de facturation, rôle et niveau
            d&apos;accès des utilisateurs associés.
          </p>
          <h3>Données de campagnes et contenus</h3>
          <p>
            Informations de campagnes marketing, canaux de diffusion,
            médias et visuels importés, preuves d&apos;exécution de
            prestations terrain, conversations avec l&apos;assistant
            intelligent.
          </p>
          <h3>Données de comptes sociaux connectés</h3>
          <p>
            Si vous liez un compte Facebook/Instagram à des fins de diffusion
            de campagnes digitales, nous conservons (de façon chiffrée) les
            jetons d&apos;accès nécessaires à cette intégration, ainsi que
            les identifiants des pages/comptes liés.
          </p>
          <h3>Données techniques</h3>
          <p>
            Adresse IP, journaux de connexion et d&apos;activité, type
            d&apos;appareil et de navigateur, à des fins de sécurité et de
            bon fonctionnement du Service.
          </p>
        </LegalSection>

        <LegalSection
          id="origine-donnees"
          title="3. Comment nous collectons ces données"
        >
          <ul>
            <li>
              directement, lorsque vous créez un compte, remplissez un
              formulaire ou utilisez le Service&nbsp;;
            </li>
            <li>
              via Google ou Facebook, lorsque vous choisissez de vous
              connecter avec l&apos;un de ces comptes — nous ne recevons que
              les informations que vous autorisez (identifiant, email, nom)
              et ne recevons jamais votre mot de passe Google/Facebook&nbsp;;
            </li>
            <li>
              automatiquement, lors de votre navigation sur le Service
              (données techniques, cookies — voir section dédiée).
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="finalites" title="4. Pourquoi nous utilisons vos données">
          <ul>
            <li>fournir, exploiter et sécuriser le Service&nbsp;;</li>
            <li>
              créer et authentifier votre compte, y compris via Google/
              Facebook&nbsp;;
            </li>
            <li>
              permettre la gestion de vos campagnes marketing et la diffusion
              sur vos comptes sociaux connectés&nbsp;;
            </li>
            <li>
              vous envoyer des communications liées au service (email de
              réinitialisation de mot de passe, notifications, rappels de
              tâches)&nbsp;;
            </li>
            <li>
              générer des recommandations et simulations via notre assistant
              intelligent&nbsp;;
            </li>
            <li>
              assurer la sécurité du Service et prévenir la fraude ou les
              usages abusifs&nbsp;;
            </li>
            <li>
              répondre à nos obligations légales et réglementaires.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="base-legale" title="5. Base légale des traitements">
          <p>Selon les cas, nos traitements reposent sur&nbsp;:</p>
          <ul>
            <li>
              l&apos;<strong>exécution du contrat</strong> qui nous lie à
              vous (fourniture du Service auquel vous avez souscrit)&nbsp;;
            </li>
            <li>
              notre <strong>intérêt légitime</strong> (sécurité,
              amélioration du Service, prévention de la fraude)&nbsp;;
            </li>
            <li>
              votre <strong>consentement</strong>, notamment pour la
              connexion via Google/Facebook et pour l&apos;envoi de
              communications non essentielles (ex&nbsp;: newsletter)&nbsp;;
            </li>
            <li>
              le respect d&apos;une <strong>obligation légale</strong>{" "}
              applicable à KIYANZA.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="partage" title="6. Avec qui nous partageons vos données">
          <p>
            Nous ne vendons jamais vos données personnelles. Elles sont
            partagées, dans la stricte mesure nécessaire, avec&nbsp;:
          </p>
          <ul>
            <li>
              nos <strong>sous-traitants techniques</strong>&nbsp;:{" "}
              <strong>Amazon Web Services</strong> (hébergement de l&apos;API, de
              la base de données, de l&apos;assistant IA et des sauvegardes, sur
              des serveurs situés à Paris, France), <strong>Vercel</strong>{" "}
              (hébergement du site web), <strong>Brevo</strong> (envoi des emails
              transactionnels)&nbsp;;
            </li>
            <li>
              <strong>Google</strong> (modèles d&apos;IA Gemini)&nbsp;: les
              questions posées à l&apos;assistant et les données de campagne
              nécessaires à la réponse lui sont transmises pour générer les
              analyses et recommandations&nbsp;;
            </li>
            <li>
              <strong>Chariow</strong>, notre prestataire de paiement&nbsp;: lors
              d&apos;un abonnement, vos nom, email et numéro de téléphone lui sont
              transmis. Le paiement (Mobile Money ou carte) a lieu sur sa page
              sécurisée&nbsp;: nous ne recevons jamais vos données de carte ni vos
              codes Mobile Money&nbsp;;
            </li>
            <li>
              <strong>OpenStreetMap (Nominatim)</strong>, pour transformer en
              coordonnées les adresses que vous recherchez sur la carte&nbsp;;
            </li>
            <li>
              <strong>Google</strong> et <strong>Meta (Facebook/Instagram)</strong>,
              dans le cadre strict de l&apos;authentification et, si vous
              connectez vos pages, de la lecture de leurs statistiques&nbsp;;
            </li>
            <li>
              les <strong>autres utilisateurs de votre entreprise</strong>, dans
              la limite de leur rôle et niveau d&apos;accès&nbsp;;
            </li>
            <li>
              toute <strong>autorité compétente</strong>, si la loi nous y oblige.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="transferts"
          title="7. Transferts de données hors de votre pays"
        >
          <p>
            Vos données sont hébergées principalement en France (Amazon Web
            Services, région de Paris). Certains prestataires (Vercel, Google,
            Meta, Brevo, Chariow) peuvent les traiter dans d&apos;autres pays,
            notamment aux États-Unis ou dans l&apos;Union européenne.
          </p>
          <p>
            Ces transferts sont encadrés par les engagements contractuels de
            protection des données de ces prestataires et, pour les utilisateurs
            situés au Cameroun, effectués dans le respect de la loi
            n°&nbsp;2024/017 du 23 décembre 2024 relative à la protection des
            données à caractère personnel.
          </p>
        </LegalSection>

        <LegalSection id="duree-conservation" title="8. Durée de conservation">
          <ul>
            <li>
              Données de compte et de campagnes&nbsp;: tant que votre compte est
              actif, puis supprimées dans les 3 mois suivant sa clôture.
            </li>
            <li>
              Sauvegardes de la base de données&nbsp;: 30 jours, puis effacées
              automatiquement.
            </li>
            <li>
              Historique des paiements et abonnements&nbsp;: 10 ans, durée de
              conservation des pièces comptables prévue par l&apos;Acte uniforme
              OHADA relatif au droit comptable.
            </li>
            <li>
              Journaux techniques&nbsp;: durée limitée nécessaire à la sécurité
              du Service.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="securite" title="9. Sécurité de vos données">
          <p>
            Nous mettons en œuvre des mesures techniques et
            organisationnelles adaptées pour protéger vos données&nbsp;:
            mots de passe jamais stockés en clair, chiffrement des jetons
            d&apos;accès aux comptes sociaux connectés, communications
            chiffrées (HTTPS), et limitation des accès internes selon le
            principe du moindre privilège.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title="10. Cookies et traceurs">
          <p>
            Le Service utilise des cookies strictement nécessaires à son
            fonctionnement (maintien de votre session de connexion,
            sécurité). Des cookies de mesure d&apos;audience ou de
            personnalisation peuvent être utilisés avec votre consentement,
            que vous pouvez retirer à tout moment. Pour plus de détails,
            consultez notre page dédiée aux Cookies lorsqu&apos;elle sera
            disponible, ou contactez-nous.
          </p>
        </LegalSection>

        <LegalSection id="droits" title="11. Vos droits">
          <p>
            Conformément à la loi camerounaise n°&nbsp;2024/017 du 23 décembre
            2024 relative à la protection des données à caractère personnel (et
            au RGPD si vous résidez dans l&apos;Union européenne), vous disposez
            des droits suivants&nbsp;:
          </p>
          <ul>
            <li>droit d&apos;accès à vos données&nbsp;;</li>
            <li>droit de rectification des données inexactes&nbsp;;</li>
            <li>
              droit d&apos;effacement («&nbsp;droit à l&apos;oubli&nbsp;»)&nbsp;;
            </li>
            <li>droit à la portabilité de vos données&nbsp;;</li>
            <li>
              droit d&apos;opposition et de limitation de certains
              traitements&nbsp;;
            </li>
            <li>
              droit de retirer votre consentement à tout moment, lorsque le
              traitement en repose.
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à l&apos;adresse indiquée en
            section «&nbsp;Contact&nbsp;»&nbsp;; nous répondons dans un délai
            d&apos;un mois. Vous pouvez également introduire une réclamation
            auprès de l&apos;Autorité de protection des données à caractère
            personnel (APDP) du Cameroun ou, si vous résidez dans l&apos;Union
            européenne, auprès de l&apos;autorité de protection des données de
            votre pays.
          </p>
        </LegalSection>

        <LegalSection id="mineurs" title="12. Mineurs">
          <p>
            Le Service est destiné aux professionnels et n&apos;est pas
            destiné aux personnes mineures. Nous ne collectons pas
            sciemment de données concernant des mineurs.
          </p>
        </LegalSection>

        <LegalSection id="modification" title="13. Modifications de cette politique">
          <p>
            Nous pouvons mettre à jour cette Politique de confidentialité,
            notamment pour refléter une évolution du Service ou de la
            réglementation. Toute modification substantielle vous sera
            notifiée avant son entrée en vigueur.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="14. Contact et réclamations">
          <p>
            Pour toute question relative à cette Politique ou pour exercer vos
            droits, écrivez-nous à{" "}
            <a href="mailto:contact@kiyanza.com">contact@kiyanza.com</a>.
          </p>
        </LegalSection>
      </div>
    </Container>
  );
}
