import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import {NewChecklist} from "../../models/Checklist";
import dayjs from 'dayjs';
import {Box, Container, FormControlLabel, Switch, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Layout from "../Layout/Layout";

type AddChecklistProps = {
    addChecklist: (checklist: NewChecklist) => Promise<void>
}

function AddChecklist(props: AddChecklistProps) {
    const [inputDestination, setInputDestination] = useState<string>("")
    const [inputStartDate, setInputStartDate] = useState<string>("")
    const [isChecked, setIsChecked] = useState<boolean>(false);

    function handleDestinationChange(event: ChangeEvent<HTMLInputElement>) {
        setInputDestination(event.target.value)
    }

    function handleDateChange(date: Date | null) {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        setInputStartDate(formattedDate);
    }

    function handleSubmit() {
        const newChecklist: NewChecklist = {
            destination: inputDestination,
            startDate: inputStartDate,
            isCamping: isChecked
        }
        console.log(isChecked)
        props.addChecklist(newChecklist).then(r => setInputDestination(""))
    }

    function handleSwitchChange() {
        setIsChecked(!isChecked);
    }

    return (
        <Layout>
            <Container
                maxWidth="lg"
                style={{height: "800px"}}
            >
                <Box display="flex" flexDirection="column">

                    <Typography variant="h5" sx={{textAlign: 'center', margin: 3}}>Plan your next Adventure</Typography>

                    <TextField
                        sx={
                            {margin: 1}
                        }
                        id="filled-basic"
                        label="Destination"
                        variant="filled"
                        required
                        value={inputDestination} onChange={handleDestinationChange}/>


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={
                                {margin: 1}
                            }
                            label="Select Start Date"
                            format="DD/MM/YYYY"
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>

                    <FormControlLabel control={<Switch
                        checked={isChecked}
                        onChange={handleSwitchChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />} label="Camping"/>


                    <Link to="/">
                        <Button sx={
                            {height: '55px', margin: 1}
                        }
                                onClick={handleSubmit} variant="contained">
                            Create Checklist
                        </Button>
                    </Link>

                </Box>
            </Container>
        </Layout>
    );
}


export default AddChecklist
