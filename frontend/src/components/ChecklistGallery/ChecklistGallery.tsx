import React from "react";
import {Checklist} from "../../models/Checklist";
import ChecklistCard from "../ChecklistCard/ChecklistCard";
import {Box, Typography} from "@mui/material";


type ChecklistGalleryProps = {
    checklists: Checklist[]
}


function ChecklistGallery(props: ChecklistGalleryProps) {
    return (
        <>
            <Box display="flex"
                 justifyContent="center">
                <Typography variant="h1"> Adventure Checklists</Typography>
            </Box>
            {props.checklists.map((checklist) => (
                <ChecklistCard key={checklist.id} checklist={checklist}/>
            ))}
        </>
    )
}

export default ChecklistGallery
