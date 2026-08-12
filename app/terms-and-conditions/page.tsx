import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export default function TermsAndConditionsPage() {
  return <LegalPageTemplate page={legalPages.terms} />;
}