import axios from 'axios'
import {useEffect, useState} from "react";
import {Checklist, NewChecklist} from "../../models/Checklist";

const apiUrlSlug = '/api/easy-bikepackr/lists'

function useChecklistsApi() {
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        fetchBikes()
    }, [])

    function fetchBikes() {
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

    return {loading, checklists, addChecklist}
}

export default useChecklistsApi
