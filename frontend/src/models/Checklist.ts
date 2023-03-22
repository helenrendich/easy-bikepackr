export type Checklist = {
    id: string
    destination: string
    startDate: string
}

export type NewChecklist = Omit<Checklist, "id">