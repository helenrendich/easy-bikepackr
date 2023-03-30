import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {Checklist} from "../../../models/Checklist";
import {Button, CardActions, CardContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from '@mui/icons-material/Clear';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';
import 'dayjs/locale/de';


type EditHeadlineCardProps = {
    checklist: Checklist,
    editChecklist: (updatedChecklist: Checklist) => void,
    isEditMode: boolean,
    setIsEditMode: (isEditMode: boolean) => void
}

function EditHeadlineCard(props: EditHeadlineCardProps) {
    const [updatedDestination, setUpdatedDestination] = useState<string>(props.checklist.destination)
    const [updatedStartDate, setUpdatedStartDate] = useState<string>(props.checklist.startDate)


    function handleDestinationChange(event: ChangeEvent<HTMLInputElement>) {
        setUpdatedDestination(event.target.value)
    }

    function handleDateChange(date: Date | null) {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        setUpdatedStartDate(formattedDate);
    }

    function handleUpdateSave() {
        props.setIsEditMode(false);
        props.editChecklist({...props.checklist, destination: updatedDestination, startDate: updatedStartDate})
    }

    function handleUpdateCancel() {
        props.setIsEditMode(false);
    }

    return (
        <CardContent>
            <TextField
                sx={
                    {margin: 1, width: '350px'}
                }
                id="filled-basic"
                variant="filled"
                value={updatedDestination} onChange={handleDestinationChange}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={
                        {margin: 1, width: '350px'}
                    }
                    format="DD/MM/YYYY"
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
            <CardActions sx={{justifyContent: "flex-end", color: "black"}}>
                <Button onClick={handleUpdateSave}>
                    <SaveIcon color="action"/>
                </Button>
                <Button onClick={handleUpdateCancel} sx={{color: 'black',}}>
                    <ClearIcon color="action"/>
                </Button>
            </CardActions>
        </CardContent>
    )

}

export default EditHeadlineCard