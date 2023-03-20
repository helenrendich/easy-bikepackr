import axios from 'axios'
import {useEffect, useState} from "react";
import {Checklist} from "../../models/Checklist";

const apiUrl = '/api/easy-bikepackr/lists/'

function useChecklistsApi() {
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        fetchBikes()
    }, [])

    function fetchBikes() {
        setLoading(true)
        axios
            .get(apiUrl)
            .then((response) => response.data)
            .then((incomingChecklists) => {
                setChecklists(incomingChecklists)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    return {loading, checklists}
}

export default useChecklistsApi
