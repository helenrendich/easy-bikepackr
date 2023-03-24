import React from "react";
import {Checklist} from "../../models/Checklist";
import ChecklistCard from "../ChecklistCard/ChecklistCard";
import {Box, IconButton, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";


type ChecklistGalleryProps = {
    checklists: Checklist[]
}


function ChecklistGallery(props: ChecklistGalleryProps) {
    return (
        <>
            <Box display="flex"
                 justifyContent="center">
                <Typography variant="h2"> Adventure Checklists</Typography>
            </Box>
            {props.checklists.map((checklist) => (
                <ChecklistCard key={checklist.id} checklist={checklist}/>
            ))}
            <Box display="flex"
                 justifyContent="center">
                <Link to="add">
                    <IconButton color="inherit">
                        <AddCircle/>
                    </IconButton>
                </Link>
            </Box>
        </>
    )
}

export default ChecklistGallery
