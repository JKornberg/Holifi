import { PartType, QuoteType } from "../types/firebase_types";

interface NamedParameters {
    quote?: QuoteType;
    email?: string,
    company?: string
}

export class Quote {
    id: string | null;
    shipment: string;
    created: number;
    modified: number;
    status: string;
    name: string;
    parts: PartType[];
    email: string;
    company: string;
    thumbnail_data: string;


    constructor({quote, email, company} : NamedParameters) {
        this.id = quote?.id ?? null
        this.shipment = quote?.shipment ?? "Standard";
        this.created = quote?.created ?? Date.now().valueOf();
        this.modified = quote?.modified ?? Date.now().valueOf();
        this.status = quote?.status ?? "Temporary";
        this.name = quote?.name ?? "My Quote";
        this.parts = quote?.parts ?? [];
        this.thumbnail_data = quote?.thumbnail_data ?? "";
        this.email = quote?.email ?? email ?? "";
        this.company = quote?.company ?? company ?? "";
    }

    getPrimaryThumbnailPath(): string {
        //Return thumbnail path of first part or empty string if no parts
        if (this.parts.length > 0) {
            return this.parts[0].thumbnail_path;
        }
        return "";
    }

    toObjectForFirebase() {
        //leave out id as this is not a field in firebase
        return {
            shipment: this.shipment,
            created: this.created,
            modified: this.modified,
            status: this.status,
            name: this.name,
            parts: this.parts,
            thumbnail_data: this.thumbnail_data ?? '',
            email: this.email,
            company: this.company
        }
    }
    toObject() {
        //leave out id as this is not a field in firebase
        return {
            id: this.id ?? "",
            shipment: this.shipment,
            created: this.created,
            modified: this.modified,
            status: this.status,
            name: this.name,
            parts: this.parts,
            thumbnail_data: this.thumbnail_data ?? '',
            email: this.email,
            company: this.company
        }
    }
    addPart(part: PartType) {
        this.parts.push(part);
    }

}