import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {NewChecklist} from "../../models/Checklist";
import dayjs from 'dayjs';
import {Box} from "@mui/material";

type AddChecklistProps = {
    addChecklist: (checklist: NewChecklist) => Promise<void>
}

function AddChecklist(props: AddChecklistProps) {
    const [inputDestination, setInputDestination] = useState<string>("")
    const [inputStartDate, setInputStartDate] = useState<string>("")

    function handleDestinationChange(event: ChangeEvent<HTMLInputElement>) {
        setInputDestination(event.target.value)
    }

    function handleDateChange(date: Date | null) {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        setInputStartDate(formattedDate);
    }

    function handleSubmit() {
        const newChecklist: NewChecklist = {destination: inputDestination, startDate: inputStartDate}
        props.addChecklist(newChecklist).then(r => setInputDestination(""))
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off">

            <TextField
                id="filled-basic"
                label="Destination"
                variant="filled"
                required
                value={inputDestination} onChange={handleDestinationChange}/>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Select Start Date"
                            format="DD/MM/YYYY"
                            onChange={handleDateChange}
                />
            </LocalizationProvider>

            <Button sx={
                {height: '55px'}
            }
                    onClick={handleSubmit} variant="contained">
                Create Checklist
            </Button>

        </Box>
    );
}


export default AddChecklist
