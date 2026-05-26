import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { login } from '../services/authService';
import {
  validateLoginForm,
  type ValidationErrors,
} from '../utils/validators';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, setAuth } = useAuthStore();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('Ocurrió un error inesperado. Intente nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <img src="/Logo_Dylo.svg" alt="DYLO HR" className="h-16" />
        </div>

        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-dylo-orange focus:ring-2 focus:ring-dylo-orange-light focus:outline-none disabled:bg-gray-100"
              placeholder="admin@dylo.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-dylo-orange focus:ring-2 focus:ring-dylo-orange-light focus:outline-none disabled:bg-gray-100"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-dylo-orange via-dylo-orange to-dylo-orange-darker py-2.5 text-sm font-semibold text-white transition hover:from-dylo-orange hover:via-dylo-orange-hover hover:to-dylo-orange-hover-dark focus:ring-2 focus:ring-dylo-orange focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};
