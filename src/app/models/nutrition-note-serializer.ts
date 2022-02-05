import { DocumentData } from '@angular/fire/firestore';
import { NutritionNoteDocument } from '../types/nutrition-note-document.interface';
import { NutritionSerializer } from './nutrition-serializer';

export class NutritionNoteDocumentSerializer extends NutritionSerializer<
  NutritionNoteDocument,
  DocumentData
> {
  public constructor(protected document: DocumentData) {
    super(document);
  }

  public get nutritionNoteDocument(): NutritionNoteDocument {
    return {
      noteId: this.serialize('noteId', this.stringGuard),
      title: this.serialize('title', this.stringGuard),
      nutrition: this.serialize<Array<number>>('nutrition', this.arrayGuard),
    };
  }
}
