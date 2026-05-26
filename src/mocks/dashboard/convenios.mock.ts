import type { ConvenioCategory } from '../../types/dashboard.types';

const CONV = '/Plataforma_DYLO26/Fotografias/Convenios';

export const conveniosMock: ConvenioCategory[] = [
  { id: '1', name: 'Restaurantes',     imageUrl: `${CONV}/Restaurantes.png` },
  { id: '2', name: 'Cuidado Personal', imageUrl: `${CONV}/Cuidado personal.jpg` },
  { id: '3', name: 'Mascotas',         imageUrl: `${CONV}/Mascotas.jpg` },
  { id: '4', name: 'Entretenimiento',  imageUrl: `${CONV}/Entretenimiento.jpg` },
  { id: '5', name: 'Educación',        imageUrl: `${CONV}/Educacion.jpg` },
  { id: '6', name: 'Salud y Bienestar',imageUrl: `${CONV}/Salud y Bienestar.jpg` },
];
