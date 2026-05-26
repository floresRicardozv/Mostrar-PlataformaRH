// ⚠️ Login deshabilitado temporalmente: no se conecta al backend.
// Cualquier email/contraseña válida en formato será aceptada.
// Para reactivar el login real, restaurar la versión que usaba api.post('/auth/login', ...).

export interface AuthResponse {
  user: { id: string; email: string; name: string; role: string };
  token: string;
}

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.bypass.fake-signature';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(
  email: string,
  _password: string,
): Promise<AuthResponse> {
  // Pequeño delay para mantener el feedback visual del botón "Cargando..."
  await delay(300);

  const namePart = email.includes('@') ? email.split('@')[0] : email;
  const name = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : 'Usuario DYLO';

  return {
    user: {
      id: 'bypass-user',
      email: email || 'demo@dylo.com',
      name,
      role: 'admin',
    },
    token: FAKE_TOKEN,
  };
}
