import { NutritionNote } from './nutrition-note.interface';

export interface NutritionNoteDocument extends NutritionNote {
  readonly noteId: string;
}
