import { CategoryModel } from "./CategoryModel";
import { SourceModel } from "./SourceModel"

export class EventModel {
    id?: string;
    title?: string;
    link?: string;
    closed?: Date | null;
    categories?: CategoryModel[];
    sources?: SourceModel[];
    //TODO: Add categories, sources, geometries
}