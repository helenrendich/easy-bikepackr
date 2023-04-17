import axios from 'axios'
import {useEffect, useState} from "react";
import {Checklist, NewChecklist} from "../models/Checklist";
import {Item, NewItem} from "../models/Item";

const apiUrlSlug = '/api/easy-bikepackr/lists'

function useChecklistsApi() {
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        fetchChecklists()
    }, [])

    function fetchChecklists() {
        setLoading(true)
        axios
            .get(apiUrlSlug)
            .then((response) => response.data)
            .then((incomingChecklists) => {
                setChecklists(incomingChecklists)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    function addChecklist(checklist: NewChecklist) {
        setLoading(true)
        return axios
            .post(apiUrlSlug, checklist)
            .then((response) => response.data)
            .then((incomingChecklist) => {
                setChecklists([...checklists, incomingChecklist])
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    function deleteChecklist(id: string) {
        setLoading(true)
        axios
            .delete(apiUrlSlug + '/' + id)
            .then((response) => response.data)
            .then((checklistToDelete: Checklist): Checklist[] => {
                return checklists.filter(checklist => (checklist.id !== checklistToDelete.id))
            })
            .then((newChecklistArray: Checklist[]): void => {
                setChecklists(newChecklistArray)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    function editChecklist(updatedChecklist: Checklist) {
        setLoading(true)
        axios
            .put(apiUrlSlug, updatedChecklist)
            .then((response) => response.data)
            .then((incomingChecklist: Checklist) => {
                setChecklists([...checklists.filter((checklist) => checklist.id !== incomingChecklist.id), incomingChecklist])
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function editItem(listId: string, updatedItem: Item) {
        setLoading(true)
        axios
            .put(apiUrlSlug + '/' + listId + '/items', updatedItem)
            .then((response) => response.data)
            .then((incomingChecklist: Checklist) => {
                setChecklists([...checklists.filter((checklist) => checklist.id !== incomingChecklist.id), incomingChecklist])
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function addItem(listId: string, itemToAdd: NewItem) {
        setLoading(true)
        axios
            .post(apiUrlSlug + '/' + listId + '/items', itemToAdd)
            .then((response) => response.data)
            .then((incomingChecklist: Checklist) => {
                setChecklists([...checklists.filter((checklist) => checklist.id !== incomingChecklist.id), incomingChecklist])
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function deleteItem(listId: string, itemId: string) {
        setLoading(true)
        axios
            .delete(apiUrlSlug + '/' + listId + '/items/' + itemId)
            .then((response) => response.data)
            .then((incomingChecklist: Checklist) => {
                setChecklists([...checklists.filter((checklist) => checklist.id !== incomingChecklist.id), incomingChecklist])
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return {loading, checklists, addChecklist, deleteChecklist, editChecklist, editItem, addItem, deleteItem}
}

export default useChecklistsApi
