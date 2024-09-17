/**
 * Les décorateurs, pour la plupart, fonctionnent sur le principe de métadonnée.
 * La requête HTTP est stockée dans un objet Request. Les décorateurs viennent simplement y ajouter des métadonnées. Typiquement @Public va simplement ajouter un flag « isPublic » à true.
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IsPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
