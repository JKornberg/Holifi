import { AdditionalFileType, PartType } from "../types/firebase_types";

export class Part {
    name : string;
    model_path : string;
    thumbnail_path : string;
    additional_files : AdditionalFileType[];
    notes : string;
    color : string;
    material : string;
    process : string;
    resolution : string;
    finish: string;
    thumbnail_data : string;
    dimensions : number[];
    unit: string;
    quantity: number;
    cost: number;
    metricVolume: number;
    imperialVolume: number;
    
    
    constructor(part? : PartType) {
        this.name = part?.name ?? "";
        this.model_path = part?.model_path ?? "";
        this.thumbnail_path = part?.thumbnail_path ?? "";
        this.additional_files = part?.additional_files ?? [];
        this.notes = part?.notes ?? "";
        this.color = part?.color ?? "Black";
        this.material = part?.material ?? "Nylon 12";
        this.process = part?.process ?? "SLS";
        this.resolution = part?.resolution ?? "0.100mm";
        this.finish = part?.finish ?? "Standard";
        this.thumbnail_data = part?.thumbnail_data ?? "";
        this.dimensions = part?.dimensions ?? [0,0,0];
        this.unit = part?.unit ?? "mm";
        this.quantity = part?.quantity ?? 1;
        this.cost = part?.cost ?? 5; // Add default cost until we have formula
        this.metricVolume = part?.metricVolume ?? 0;
        this.imperialVolume = part?.imperialVolume ?? 0;
    }

    toObject(){
        return {
            name: this.name,
            model_path: this.model_path,
            thumbnail_path: this.thumbnail_path,
            additional_files: this.additional_files,
            notes: this.notes,
            color: this.color,
            material: this.material,
            process: this.process,
            resolution: this.resolution,
            finish: this.finish,
            thumbnail_data: this.thumbnail_data,
            dimensions: this.dimensions,
            unit: this.unit,
            quantity: this.quantity,
            cost: this.cost,
            metricVolume: this.metricVolume,
            imperialVolume: this.imperialVolume
        }
    }
}