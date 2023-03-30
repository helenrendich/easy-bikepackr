import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {Checklist} from "../../../models/Checklist";
import {Button, CardContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

type EditHeadlineCardProps = {
    checklist: Checklist,
    editChecklist: (updatedChecklist: Checklist) => void
}

function EditHeadlineCard(props: EditHeadlineCardProps) {
    const [updatedDestination, setUpdatedDestination] = useState<string>("")
    const [updatedStartDate, setUpdatedStartDate] = useState<string>("")

    function handleDestinationChange(event: ChangeEvent<HTMLInputElement>) {
        setUpdatedDestination(event.target.value)
    }

    function handleUpdateSave() {
        //setIsUpdateVisible(false);
        props.editChecklist({...props.checklist, destination: updatedDestination})
    }

    return (
        <CardContent>
            <TextField
                sx={
                    {margin: 1}
                }
                id="filled-basic"
                label="Destination"
                variant="filled"
                required
                value={updatedDestination} onChange={handleDestinationChange}/>
            <Button onClick={handleUpdateSave}>
                <SaveIcon color="action"/>
            </Button>
        </CardContent>
    )

}

export default EditHeadlineCard