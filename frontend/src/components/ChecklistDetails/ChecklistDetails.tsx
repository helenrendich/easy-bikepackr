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
import {Item, NewItem} from "../../models/Item";

type ChecklistDetailsProps = {
    checklists: Checklist[]
    editChecklist: (updatedChecklist: Checklist) => void
    editItem: (listId: string, updatedItem: Item) => void
    addItem: (listId: string, itemToAdd: NewItem) => void
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
            <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="space-between">
                <Typography fontSize={"h4"} gutterBottom variant="h5" component="div">
                    {checklist?.destination}
                </Typography>
                <CardActions>
                    <Button onClick={handleUpdateClick}>
                        <EditIcon color="action"/>
                    </Button>
                </CardActions>
            </Box>
            <Typography fontSize={"body"} variant="body2" color="text.secondary">
                {dateDate?.toLocaleDateString("en-GB")}
            </Typography>
        </CardContent>
    );

    const headlineCardEditMode = checklist ?
        <EditHeadlineCard checklist={checklist} editChecklist={props.editChecklist} isEditMode={isEditMode}
                          setIsEditMode={setIsEditMode}/> : null;

    const accordionCardBikeGear = checklist ?
        <AccordionCard checklist={checklist} category={"Bike Gear"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;
    const accordionCardCamping = checklist ?
        <AccordionCard checklist={checklist} category={"Camping"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;
    const accordionCardFoodDrinks = checklist ?
        <AccordionCard checklist={checklist} category={"Food & Drinks"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;
    const accordionCardClothing = checklist ?
        <AccordionCard checklist={checklist} category={"Clothing"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;
    const accordionCardHygiene = checklist ?
        <AccordionCard checklist={checklist} category={"Hygiene/Toiletries"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;
    const accordionCardAdditionalItems = checklist ?
        <AccordionCard checklist={checklist} category={"Additional Items"} editItem={props.editItem}
                       addItem={props.addItem}/> : null;


    return (
        <div>
            <Layout>
                <Card>
                    {isEditMode ? (headlineCardEditMode) : headlineCard}
                </Card>
                {accordionCardBikeGear}
                {checklist?.isCamping && accordionCardCamping}
                {accordionCardFoodDrinks}
                {accordionCardClothing}
                {accordionCardHygiene}
                {accordionCardAdditionalItems}
            </Layout>
        </div>
    );
}

export default ChecklistDetails