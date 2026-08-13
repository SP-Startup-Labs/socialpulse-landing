'use client';

import { type FormEvent, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { copy, requestTypeOptions, roleOptions, stageOptions } from '@/lib/content';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  requestType: string;
  role: string;
  checkSize: string;
  stageInterest: string;
  message: string;
};

const defaultMessages: Record<string, string> = {
  Investor: 'I would like to receive the SocialPulse investor deck.',
  'Beta Access': 'I would like to get beta access to SocialPulse.',
  'General Inquiry': 'I would like to receive general information about SocialPulse.'
};

const initialState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  requestType: 'Investor',
  role: '',
  checkSize: '',
  stageInterest: '',
  message: defaultMessages.Investor
};


export function LeadModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [openSelect, setOpenSelect] = useState<'role' | 'stage' | null>(null);

  const labels = copy.en.formLabels;
  const common = copy.en.formCommon;
  const errorsText = copy.en.formErrors;
  const title = 'Get in touch';
  const isInvestorRequest = form.requestType === 'Investor';

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.firstName.trim()) nextErrors.firstName = errorsText.required;
    if (!form.lastName.trim()) nextErrors.lastName = errorsText.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = errorsText.email;
    if (!/^[0-9+()\-\s]{7,}$/.test(form.phone)) nextErrors.phone = errorsText.phone;
    if (!form.requestType.trim()) nextErrors.requestType = errorsText.required;

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
      setSuccess(copy.en.success);
      return;
    }

    setErrors((prev) => ({ ...prev, email: errorsText.submission }));
  };

  const setField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setRequestType = (requestType: string) => {
    setForm((prev) => ({
      ...prev,
      requestType,
      role: requestType === 'Request Investor Deck' ? prev.role : '',

      stageInterest: requestType === 'Request Investor Deck' ? prev.stageInterest : '',
      message: defaultMessages[requestType] ?? prev.message
    }));

    setErrors((prev) => ({ ...prev, requestType: undefined }));
  };

  const fieldBase =
    'mt-2 w-full rounded-xl border border-white/[0.08] bg-transparent px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#667085] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-[border-color,box-shadow] duration-200 focus:bg-transparent focus:outline-none [-webkit-tap-highlight-color:transparent]';

  const fieldChrome =
    'hover:border-white/[0.14] hover:bg-white/[0.015]';

  const focusChrome =
    'focus:border-[#8D6792]/70 focus:bg-transparent focus:ring-4 focus:ring-[#4B3B8E]/[0.08]';

  return (
    <div className="lead-modal-backdrop fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-[#050B16]/80 p-3 backdrop-blur-sm sm:p-4 md:items-center">
      <div className="lead-modal-panel relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#091426] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:p-7">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-[#9A33FF]/25 blur-3xl" />

        <div className="relative mb-6 flex items-start justify-between">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg border border-white/10 p-1.5 text-[#AAB4C2] transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-5 grid gap-2 sm:grid-cols-3">
          {requestTypeOptions.map((option) => {
            const isActive = form.requestType === option;

            return (
              <button
                key={option}
                type="button"
                data-active={isActive}
                aria-pressed={isActive}
                onClick={() => setRequestType(option)}
                className={`navbar-cta-button rounded-xl px-4 py-3.5 text-sm font-semibold ${
                  isActive
                    ? 'text-white'
                    : 'text-[#7F8998] hover:text-[#D9DEE6]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <form
          className="relative grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={onSubmit}
          noValidate
        >
          {([
            ['firstName', labels.firstName],
            ['lastName', labels.lastName],
            ['email', labels.email],
            ['phone', labels.phone],
            ['organization', labels.org]
          ] as const).map(([key, label]) => (
            <label
              key={key}
              className={key === 'organization' ? 'md:col-span-2' : ''}
            >
              <span className="text-sm text-[#AAB4C2]">{label}</span>

              <input
                className={`${fieldBase} ${fieldChrome} ${focusChrome}`}
                value={form[key]}
                onChange={(e) => setField(key, e.target.value)}
                aria-invalid={Boolean(errors[key])}
                placeholder={
                  key === 'firstName'
                    ? 'Name'
                    : key === 'lastName'
                      ? 'Surname'
                      : key === 'email'
                        ? 'example@gmail.com'
                        : key === 'phone'
                          ? '+34 666 777 888'
                          : 'SocialPulse / Company name'
                }
                required={['firstName', 'lastName', 'email', 'phone'].includes(key)}
              />

              {errors[key] && (
                <span className="mt-1 block text-xs text-red-300">
                  {errors[key]}
                </span>
              )}
            </label>
          ))}

          {isInvestorRequest ? (
            <>
              <label>
                <span className="text-sm text-[#AAB4C2]">{labels.role}</span>

                <div
                  className={`relative mt-2 ${
                    openSelect === 'role' ? 'z-30' : ''
                  }`}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setOpenSelect(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openSelect === 'role'}
                    onClick={() =>
                      setOpenSelect((current) =>
                        current === 'role' ? null : 'role'
                      )
                    }
                    className={`${fieldBase} ${fieldChrome} ${focusChrome} !mt-0 pr-10 text-left ${
                      openSelect === 'role'
                        ? 'border-[#8D6792]/70 ring-4 ring-[#4B3B8E]/[0.08]'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        form.role ? 'text-[#F5F7FA]' : 'text-[#667085]'
                      }
                    >
                      {form.role || common.select}
                    </span>
                  </button>

                  <ChevronDown
                    className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB4C2] transition-transform duration-200 ${
                      openSelect === 'role' ? 'rotate-180' : ''
                    }`}
                  />

                  {openSelect === 'role' ? (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 top-[calc(100%+6px)] max-h-52 overflow-y-auto rounded-xl border border-[#8D6792]/70 bg-[#091426] p-1 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={!form.role}
                        onClick={() => {
                          setField('role', '');
                          setOpenSelect(null);
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          !form.role
                            ? 'bg-[#4B3B8E]/20 text-[#F5F7FA]'
                            : 'text-[#AAB4C2] hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        {common.select}
                      </button>

                      {roleOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={form.role === opt}
                          onClick={() => {
                            setField('role', opt);
                            setOpenSelect(null);
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            form.role === opt
                              ? 'bg-[#4B3B8E]/20 text-[#F5F7FA]'
                              : 'text-[#AAB4C2] hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </label>

              <label>
                <span className="text-sm text-[#AAB4C2]">{labels.stage}</span>

                <div
                  className={`relative mt-2 ${
                    openSelect === 'stage' ? 'z-30' : ''
                  }`}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setOpenSelect(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openSelect === 'stage'}
                    onClick={() =>
                      setOpenSelect((current) =>
                        current === 'stage' ? null : 'stage'
                      )
                    }
                    className={`${fieldBase} ${fieldChrome} ${focusChrome} !mt-0 pr-10 text-left ${
                      openSelect === 'stage'
                        ? 'border-[#8D6792]/70 ring-4 ring-[#4B3B8E]/[0.08]'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        form.stageInterest
                          ? 'text-[#F5F7FA]'
                          : 'text-[#667085]'
                      }
                    >
                      {form.stageInterest || common.select}
                    </span>
                  </button>

                  <ChevronDown
                    className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB4C2] transition-transform duration-200 ${
                      openSelect === 'stage' ? 'rotate-180' : ''
                    }`}
                  />

                  {openSelect === 'stage' ? (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 top-[calc(100%+6px)] max-h-52 overflow-y-auto rounded-xl border border-[#8D6792]/70 bg-[#091426] p-1 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={!form.stageInterest}
                        onClick={() => {
                          setField('stageInterest', '');
                          setOpenSelect(null);
                        }}
                        className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          !form.stageInterest
                            ? 'bg-[#4B3B8E]/20 text-[#F5F7FA]'
                            : 'text-[#AAB4C2] hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        {common.select}
                      </button>

                      {stageOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={form.stageInterest === opt}
                          onClick={() => {
                            setField('stageInterest', opt);
                            setOpenSelect(null);
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            form.stageInterest === opt
                              ? 'bg-[#4B3B8E]/20 text-[#F5F7FA]'
                              : 'text-[#AAB4C2] hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </label>
            </>
          ) : null}

          <label className="md:col-span-2">
            <span className="text-sm text-[#AAB4C2]">{labels.message}</span>

            <textarea
              className={`${fieldBase} ${fieldChrome} ${focusChrome} min-h-28 resize-y`}
              value={form.message}
              onChange={(e) => setField('message', e.target.value)}
              placeholder={defaultMessages[form.requestType]}
            />
          </label>

          <div className="pt-1 md:col-span-2">
            <button
              disabled={isSubmitting}
              className="navbar-cta-button w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? common.submitting : labels.submit}
            </button>

            {success && (
              <p className="mt-3 text-sm text-emerald-300">{success}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}