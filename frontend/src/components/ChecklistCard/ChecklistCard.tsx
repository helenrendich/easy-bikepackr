import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Checklist} from "../../models/Checklist";
import {Button, CardActions} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Link} from "react-router-dom";

type ChecklistCardProps = {
    checklist: Checklist
    deleteChecklist: (id: string) => void
}

function ChecklistCard(props: ChecklistCardProps) {
    const dateString = props.checklist.startDate;
    const dateDate = new Date(dateString);

    function handleDelete() {
        props.deleteChecklist(props.checklist.id)
    }

    const card = (
        <React.Fragment>
            <Link to={"details/" + props.checklist.id} style={{textDecoration: 'none'}}>
                <CardContent style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Typography fontSize={"h4"} component="div" color={"primary"}>
                        {props.checklist.destination}
                    </Typography>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography fontSize={"h7"} color="text.secondary" style={{marginRight: "5px"}}>
                            <CalendarMonthIcon color={"primary"}/>
                        </Typography>
                        <Typography fontSize={"h7"} color="text.secondary" gutterBottom>
                            {dateDate.toLocaleDateString("en-GB")}
                        </Typography>
                    </div>
                </CardContent>
            </Link>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <Button size="small" onClick={handleDelete} variant="contained" startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="10vh">
            <Card sx={{width: 400, textAlign: 'center', margin: 1}}>{card}</Card>
        </Box>
    );
}

export default ChecklistCard
