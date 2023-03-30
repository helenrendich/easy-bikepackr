import * as React from 'react';
import {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from "../Layout/Layout";
import {useParams} from "react-router-dom";
import {Checklist} from "../../models/Checklist";
import {Box, Button, Card, CardActions, CardContent} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditHeadlineCard from "./EditChecklistDetails/EditHeadlineCard";

type ChecklistDetailsProps = {
    checklists: Checklist[]
    editChecklist: (updatedChecklist: Checklist) => void
}

function ChecklistDetails(props: ChecklistDetailsProps) {
    const [isEditMode, setIsEditMode] = useState(false);

    const {id} = useParams<{ id: string }>()
    const checklist = (!!id && (props.checklists.find((checklist: Checklist) => checklist.id === id) as Checklist)) || null
    const dateString = checklist?.startDate;
    const dateDate = dateString ? new Date(dateString) : null;

    function handleUpdateClick() {
        setIsEditMode(true);
    }

    const headlineCard = (
        <CardContent>
            <Box display="flex" flexDirection="row" alignItems="flex-end">
                <Typography gutterBottom variant="h5" component="div">
                    {checklist?.destination}
                </Typography>
                <CardActions>
                    <Button onClick={handleUpdateClick}>
                        <EditIcon color="action"/>
                    </Button>
                </CardActions>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {dateDate?.toLocaleDateString("en-GB")}
            </Typography>
        </CardContent>
    );

    const headlineCardEditMode = checklist ?
        <EditHeadlineCard checklist={checklist} editChecklist={props.editChecklist} isEditMode={isEditMode}
                          setIsEditMode={setIsEditMode}/> : null;


    return (
        <div>
            <Layout>
                <Card>
                    {isEditMode ? (headlineCardEditMode) : headlineCard}
                </Card>
                <Typography gutterBottom variant="h6" margin={1}>Checklist</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Bike Gear</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Bike Gear Items
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Food & Drinks</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Food & Drinks Items
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Clothing</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Clothing Items
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography>Hygiene/ Toiletries</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Hygiene/ Toiletries Items
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Layout>
        </div>
    );
}

export default ChecklistDetails