import { legalPages } from '../legal-content';
import { LegalPageTemplate } from '../legal-page-template';

export default function CookiePolicyPage() {
  return <LegalPageTemplate page={legalPages.cookies} />;
}