'use client';

import { FormEvent, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Language, checkSizeOptions, copy, roleOptions, stageOptions } from '@/lib/content';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  checkSize: string;
  stageInterest: string;
  message: string;
};

const initialState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  role: '',
  checkSize: '',
  stageInterest: '',
  message: ''
};

export function LeadModal({ isOpen, onClose, lang }: Props) {
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const labels = copy[lang].formLabels;
<<<<<<< ours
<<<<<<< ours
  const common = copy[lang].formCommon;
  const errorsText = copy[lang].formErrors;
=======
>>>>>>> theirs
=======
>>>>>>> theirs

  const title = useMemo(() => copy[lang].ctaPrimary, [lang]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
<<<<<<< ours
<<<<<<< ours
    if (!form.firstName.trim()) nextErrors.firstName = errorsText.required;
    if (!form.lastName.trim()) nextErrors.lastName = errorsText.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = errorsText.email;
    if (!/^[0-9+()\-\s]{7,}$/.test(form.phone)) nextErrors.phone = errorsText.phone;
=======
=======
>>>>>>> theirs
    if (!form.firstName.trim()) nextErrors.firstName = 'Required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Valid email required';
    if (!/^[0-9+()\-\s]{7,}$/.test(form.phone)) nextErrors.phone = 'Valid phone required';
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess('');
    if (!validate()) return;

    setIsSubmitting(true);
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setIsSubmitting(false);

    if (response.ok) {
      setForm(initialState);
      setErrors({});
      setSuccess(copy[lang].success);
      return;
    }

<<<<<<< ours
<<<<<<< ours
    setErrors((prev) => ({ ...prev, email: errorsText.submission }));
=======
    setErrors((prev) => ({ ...prev, email: 'Submission failed, please try again.' }));
>>>>>>> theirs
=======
    setErrors((prev) => ({ ...prev, email: 'Submission failed, please try again.' }));
>>>>>>> theirs
  };

  const setField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

<<<<<<< ours
<<<<<<< ours
  const fieldBase =
    'mt-2 w-full rounded-xl border border-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-[#AAB4C2] transition focus:outline-none';
  const fieldChrome =
    'bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))_padding-box,linear-gradient(120deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))_border-box]';
  const focusChrome =
    'focus:bg-[linear-gradient(rgba(255,255,255,0.08),rgba(255,255,255,0.08))_padding-box,linear-gradient(120deg,#F2398A,#9A33FF,#246BFF)_border-box]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B16]/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#091426] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:p-7">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-[#9A33FF]/25 blur-3xl" />
        <div className="relative mb-6 flex items-start justify-between">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg border border-white/10 p-1.5 text-[#AAB4C2] transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="relative grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit} noValidate>
=======
=======
>>>>>>> theirs
  const inputClasses = 'mt-2 w-full rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-brand-muted focus:border-brand-cyan focus:outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-brand-dark p-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded p-1 text-brand-muted hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit} noValidate>
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
          {([
            ['firstName', labels.firstName],
            ['lastName', labels.lastName],
            ['email', labels.email],
            ['phone', labels.phone],
            ['organization', labels.org]
          ] as const).map(([key, label]) => (
            <label key={key} className={key === 'organization' ? 'md:col-span-2' : ''}>
<<<<<<< ours
<<<<<<< ours
              <span className="text-sm text-[#AAB4C2]">{label}</span>
              <input
                className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
=======
              <span className="text-sm text-brand-muted">{label}</span>
              <input
                className={inputClasses}
>>>>>>> theirs
=======
              <span className="text-sm text-brand-muted">{label}</span>
              <input
                className={inputClasses}
>>>>>>> theirs
                value={form[key]}
                onChange={(e) => setField(key, e.target.value)}
                aria-invalid={Boolean(errors[key])}
                required={['firstName', 'lastName', 'email', 'phone'].includes(key)}
              />
              {errors[key] && <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>}
            </label>
          ))}

          <label>
<<<<<<< ours
<<<<<<< ours
            <span className="text-sm text-[#AAB4C2]">{labels.role}</span>
            <select
              className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
              value={form.role}
              onChange={(e) => setField('role', e.target.value)}
            >
              <option value="">{common.select}</option>
=======
            <span className="text-sm text-brand-muted">{labels.role}</span>
            <select className={inputClasses} value={form.role} onChange={(e) => setField('role', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
=======
            <span className="text-sm text-brand-muted">{labels.role}</span>
            <select className={inputClasses} value={form.role} onChange={(e) => setField('role', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
              {roleOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label>
<<<<<<< ours
<<<<<<< ours
            <span className="text-sm text-[#AAB4C2]">{labels.check}</span>
            <select
              className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
              value={form.checkSize}
              onChange={(e) => setField('checkSize', e.target.value)}
            >
              <option value="">{common.select}</option>
=======
            <span className="text-sm text-brand-muted">{labels.check}</span>
            <select className={inputClasses} value={form.checkSize} onChange={(e) => setField('checkSize', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
=======
            <span className="text-sm text-brand-muted">{labels.check}</span>
            <select className={inputClasses} value={form.checkSize} onChange={(e) => setField('checkSize', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
              {checkSizeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2">
<<<<<<< ours
<<<<<<< ours
            <span className="text-sm text-[#AAB4C2]">{labels.stage}</span>
            <select
              className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
              value={form.stageInterest}
              onChange={(e) => setField('stageInterest', e.target.value)}
            >
              <option value="">{common.select}</option>
=======
            <span className="text-sm text-brand-muted">{labels.stage}</span>
            <select className={inputClasses} value={form.stageInterest} onChange={(e) => setField('stageInterest', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
=======
            <span className="text-sm text-brand-muted">{labels.stage}</span>
            <select className={inputClasses} value={form.stageInterest} onChange={(e) => setField('stageInterest', e.target.value)}>
              <option value="">Select</option>
>>>>>>> theirs
              {stageOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2">
<<<<<<< ours
<<<<<<< ours
            <span className="text-sm text-[#AAB4C2]">{labels.message}</span>
            <textarea
              className={`${fieldBase} ${fieldChrome} ${focusChrome} min-h-28 resize-y`}
              value={form.message}
              onChange={(e) => setField('message', e.target.value)}
            />
          </label>
          <div className="pt-1 md:col-span-2">
            <button
              disabled={isSubmitting}
              className="button-primary w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? common.submitting : labels.submit}
=======
=======
>>>>>>> theirs
            <span className="text-sm text-brand-muted">{labels.message}</span>
            <textarea className={`${inputClasses} min-h-28`} value={form.message} onChange={(e) => setField('message', e.target.value)} />
          </label>
          <div className="md:col-span-2">
            <button disabled={isSubmitting} className="w-full rounded-lg bg-brand-gradient px-4 py-3 text-sm font-semibold text-white">
              {isSubmitting ? 'Submitting...' : labels.submit}
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
            </button>
            {success && <p className="mt-3 text-sm text-emerald-300">{success}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
