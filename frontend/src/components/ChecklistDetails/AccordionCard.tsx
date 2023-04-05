import * as React from 'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Box, Checkbox} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import {Checklist} from "../../models/Checklist";

type AccordionCardProps = {
    checklist: Checklist
    category: string
}

function AccordionCard(props: AccordionCardProps) {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{props.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.checklist?.items
                    .filter(item => item.category.includes(props.category))
                    .map(item =>
                        <Box key={item.id} display="flex" alignItems="center">
                            <Checkbox/>
                            <Typography>{item.title}</Typography>
                        </Box>)}
            </AccordionDetails>
        </Accordion>
    );
}

export default AccordionCard