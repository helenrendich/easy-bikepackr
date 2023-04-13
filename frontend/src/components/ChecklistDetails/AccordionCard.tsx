import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Box, Button, CardActions, Checkbox, TextField} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import {Checklist} from "../../models/Checklist";
import {Item} from "../../models/Item";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type AccordionCardProps = {
    checklist: Checklist
    category: string
    editItem: (listId: string, updatedItem: Item) => void
}

function AccordionCard(props: AccordionCardProps) {

    const [isEditItemMode, setIsEditItemMode] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<string>("");
    const [updatedTitle, setUpdatedTitle] = useState<string>("");

    useEffect(() => {
        const currentItem = props.checklist.items.find(item => item.id === editingItemId);
        if (isEditItemMode && currentItem) {
            setUpdatedTitle(currentItem.title);
        }
    }, [isEditItemMode, editingItemId, props.checklist.items]);

    function handleEditClick(itemId: string) {
        setIsEditItemMode(true);
        setEditingItemId(itemId);
    }

    function handleEditCancel() {
        setIsEditItemMode(false);
        setEditingItemId("");
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setUpdatedTitle(event.target.value)
    }

    function handleTitleSave(item: Item) {
        setIsEditItemMode(false);
        setEditingItemId("");
        props.editItem(props.checklist.id, {
            id: item.id,
            title: updatedTitle,
            isTickedOff: item.isTickedOff,
            category: item.category
        })
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: Item) => {
        if (item.isTickedOff) {
            props.editItem(props.checklist.id, {
                id: item.id,
                title: item.title,
                isTickedOff: false,
                category: item.category
            });
        } else {
            props.editItem(props.checklist.id, {
                id: item.id,
                title: item.title,
                isTickedOff: true,
                category: item.category
            });
        }
    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography fontSize={"h6"}>{props.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.checklist?.items
                    .filter(item => item.category.includes(props.category))
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(item =>
                        isEditItemMode && item.id === editingItemId ?
                            <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between"
                                 margin={1}>
                                <TextField value={updatedTitle} onChange={handleTitleChange}/>
                                <CardActions>
                                    <Button onClick={() => handleTitleSave(item)}>
                                        <CheckIcon color="action"/>
                                    </Button>
                                    <Button onClick={handleEditCancel}>
                                        <CloseIcon color="action"/>
                                    </Button>
                                </CardActions>
                            </Box>
                            :
                            <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between"
                                 margin={1}>
                                <Box display="flex" alignItems="center">
                                    <Checkbox
                                        checked={item.isTickedOff}
                                        onChange={(event) => handleCheckboxChange(event, item)}
                                    />
                                    <Typography fontSize={"h7"}>{item.title}</Typography>
                                </Box>
                                <CardActions>
                                    <Button onClick={() => handleEditClick(item.id)}>
                                        <BorderColorIcon color="action"/>
                                    </Button>
                                </CardActions>
                            </Box>
                    )}
            </AccordionDetails>
        </Accordion>
    );
}

export default AccordionCard