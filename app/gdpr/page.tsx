import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export default function GdprPage() {
  return <LegalPageTemplate page={legalPages.gdpr} />;
}