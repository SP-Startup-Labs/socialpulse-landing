export type Language = 'en' | 'es';

export const roleOptions = [
  'Angel Investor',
  'VC',
  'Corporate VC',
  'Family Office',
  'Press',
  'Strategic Partner',
  'Advisor',
  'Other'
] as const;

export const checkSizeOptions = ['<50k', '50k-100k', '100k-250k', '250k+', 'Exploring'] as const;

export const stageOptions = ['Pre-seed', 'Seed', 'Exploring'] as const;

export const copy = {
  en: {
    ctaPrimary: 'Request Investor / Press Access',
    success: 'Thanks - we will reach out shortly.',
    formCommon: {
      select: 'Select',
      submitting: 'Submitting...'
    },
    formErrors: {
      required: 'Required',
      email: 'Valid email required',
      phone: 'Valid phone required',
      submission: 'Submission failed, please try again.'
    },
    formLabels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      org: 'Organization / Fund name',
      role: 'Role',
      check: 'Estimated Check Size',
      stage: 'Investment Stage Interest',
      message: 'Short message',
      submit: 'Submit request'
    }
  },
  es: {
    ctaPrimary: 'Solicitar acceso para inversion / prensa',
    success: 'Gracias - te contactaremos pronto.',
    formCommon: {
      select: 'Seleccionar',
      submitting: 'Enviando...'
    },
    formErrors: {
      required: 'Requerido',
      email: 'Email valido requerido',
      phone: 'Telefono valido requerido',
      submission: 'Error en el envio. Intenta nuevamente.'
    },
    formLabels: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo electronico',
      phone: 'Telefono',
      org: 'Organizacion / Nombre del fondo',
      role: 'Rol',
      check: 'Ticket estimado',
      stage: 'Interes por etapa de inversion',
      message: 'Mensaje breve',
      submit: 'Enviar solicitud'
    }
  }
} as const;
