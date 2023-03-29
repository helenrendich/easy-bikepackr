import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Checklist} from "../../models/Checklist";
import {Button, CardActions, Link} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
            <Link href={"details/" + props.checklist.id} underline={'none'}>
                <CardContent>
                    <Typography variant="h5" component="div" margin={2}>
                        {props.checklist.destination}
                    </Typography>
                    <Typography sx={{fontSize: 17}} color="text.secondary" gutterBottom>
                        {dateDate.toLocaleDateString("en-GB")}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <Button size="small" onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon/>}>
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
            <Card variant="outlined"
                  sx={{width: 400, textAlign: 'center', margin: 1}}>{card}</Card>
        </Box>
    );
}

export default ChecklistCard
