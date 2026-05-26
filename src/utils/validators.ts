export interface ValidationErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return 'El correo electrónico es obligatorio';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'El formato del correo electrónico no es válido';
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password.trim()) {
    return 'La contraseña es obligatoria';
  }
  return undefined;
}

export function validateLoginForm(email: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}
