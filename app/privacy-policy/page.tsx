import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export default function PrivacyPolicyPage() {
  return <LegalPageTemplate page={legalPages.privacy} />;
}