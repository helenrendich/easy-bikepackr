import * as React from 'react';
import {useState} from 'react';
import Typography from '@mui/material/Typography';
import Layout from "../Layout/Layout";
import {useParams} from "react-router-dom";
import {Checklist} from "../../models/Checklist";
import {Box, Button, Card, CardActions, CardContent} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditHeadlineCard from "./EditChecklistDetails/EditHeadlineCard";
import AccordionCard from "./AccordionCard";

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

    const accordionCardBikeGear = checklist ?
        <AccordionCard checklist={checklist} category={"Bike Gear"}/> : null;
    const accordionCardFoodDrinks = checklist ?
        <AccordionCard checklist={checklist} category={"Food & Drinks"}/> : null;
    const accordionCardClothing = checklist ?
        <AccordionCard checklist={checklist} category={"Clothing"}/> : null;
    const accordionCardHygiene = checklist ?
        <AccordionCard checklist={checklist} category={"Hygiene/Toiletries"}/> : null;
    const accordionCardAdditionalItems = checklist ?
        <AccordionCard checklist={checklist} category={"Additional Items"}/> : null;


    return (
        <div>
            <Layout>
                <Card>
                    {isEditMode ? (headlineCardEditMode) : headlineCard}
                </Card>
                <Typography gutterBottom variant="h6" margin={1}>Checklist</Typography>
                {accordionCardBikeGear}
                {accordionCardFoodDrinks}
                {accordionCardClothing}
                {accordionCardHygiene}
                {accordionCardAdditionalItems}
            </Layout>
        </div>
    );
}

export default ChecklistDetails