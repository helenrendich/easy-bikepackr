import * as React from 'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Box, Button, CardActions, Checkbox} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import {Checklist} from "../../models/Checklist";
import {Item} from "../../models/Item";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type AccordionCardProps = {
    checklist: Checklist
    category: string
    editItem: (listId: string, updatedItem: Item) => void
}

function AccordionCard(props: AccordionCardProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: Item) => {
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
                <Typography fontSize={25}>{props.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.checklist?.items
                    .filter(item => item.category.includes(props.category))
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(item =>
                        <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" margin={1}>
                            <Box display="flex" alignItems="center">
                                <Checkbox
                                    checked={item.isTickedOff}
                                    onChange={(event) => handleChange(event, item)}
                                />
                                <Typography fontSize={20}>{item.title}</Typography>
                            </Box>
                            <CardActions>
                                <Button>
                                    <BorderColorIcon color="warning"/>
                                </Button>
                            </CardActions>
                        </Box>)}
            </AccordionDetails>
        </Accordion>
    );
}

export default AccordionCard