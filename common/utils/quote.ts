import { PartType } from "../types/firebase_types";

export function getDimensionString(part: PartType): string {
    
    if (part != null && part.dimensions.length == 3) {
        return `[${part.dimensions[0]}${part.unit} , ${part.dimensions[1]}${part.unit}, ${part.dimensions[2]}${part.unit}]`;
    }
    return "";
}