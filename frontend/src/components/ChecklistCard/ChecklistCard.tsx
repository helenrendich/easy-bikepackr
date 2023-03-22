import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Checklist} from "../../models/Checklist";

type ChecklistCardProps = {
    checklist: Checklist
}

function ChecklistCard(props: ChecklistCardProps) {
    const dateString = props.checklist.startDate;
    const dateDate = new Date(dateString);
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {dateDate.toLocaleDateString("en-GB")}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.checklist.destination}
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="10vh">
            <Card variant="outlined" sx={{width: 400, textAlign: 'center'}}>{card}</Card>
        </Box>
    );
}

export default ChecklistCard