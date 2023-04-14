import {Item} from "./Item";

export type Checklist = {
    id: string
    destination: string
    startDate: string
    items: Item[]
    isCamping: boolean
}

export type NewChecklist = Omit<Checklist, "id" | "items">