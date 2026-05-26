export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

const VALID_EMAIL = 'admin@dylo.com';
const VALID_PASSWORD = 'admin123';

const MOCK_USER = {
  id: '1',
  email: VALID_EMAIL,
  name: 'Admin DYLO',
  role: 'admin',
};

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBkeWxvLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjAwMDAwMH0.mock-signature';

function randomDelay(): Promise<void> {
  const ms = Math.floor(Math.random() * 501) + 500; // 500–1000ms
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  await randomDelay();

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return { user: { ...MOCK_USER }, token: MOCK_TOKEN };
  }

  throw new Error('Credenciales inválidas');
}
