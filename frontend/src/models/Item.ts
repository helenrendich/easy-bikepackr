export type Item = {
    id: string
    title: string
    isTickedOff: boolean
    category: string
}

export type NewItem = Omit<Item, "id" | "isTickedOff">