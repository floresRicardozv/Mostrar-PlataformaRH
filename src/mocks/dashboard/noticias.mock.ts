import type { NewsSlide } from '../../types/dashboard.types';

const BANNER_PATH = '/Plataforma_DYLO26/Fotografias/Banner Principal';

export const noticiasMock: NewsSlide[] = [
  {
    id: '1',
    title: 'Nuevo programa de bienestar',
    content: 'Conoce las actividades de bienestar que tenemos preparadas para este trimestre. Yoga, meditación y más.',
    imageUrl: `${BANNER_PATH}/1.png`,
  },
  {
    id: '2',
    title: 'Actualización de políticas internas',
    content: 'Se han actualizado las políticas de trabajo remoto. Consulta los nuevos lineamientos en el portal.',
    imageUrl: `${BANNER_PATH}/2.png`,
  },
  {
    id: '3',
    title: 'Resultados del Q1 2026',
    content: 'Celebramos un excelente primer trimestre. Gracias al esfuerzo de todos los equipos logramos superar las metas.',
    imageUrl: `${BANNER_PATH}/3.png`,
  },
];
