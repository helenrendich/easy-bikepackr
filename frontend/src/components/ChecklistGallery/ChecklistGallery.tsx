import React from "react";
import {Checklist} from "../../models/Checklist";
import ChecklistCard from "../ChecklistCard/ChecklistCard";
import {Box, Container, IconButton, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Layout from "../Layout/Layout";


type ChecklistGalleryProps = {
    checklists: Checklist[]
    deleteChecklist: (id: string) => void
}


function ChecklistGallery(props: ChecklistGalleryProps) {
    return (
        <Layout>
            <Container
                maxWidth="lg"
                style={{height: "800px"}}
            >
                <Box display="flex"
                     justifyContent="center">
                    <Typography variant="h4"> Adventure Checklists</Typography>
                </Box>
                {props.checklists.map((checklist) => (
                    <ChecklistCard key={checklist.id} checklist={checklist} deleteChecklist={props.deleteChecklist}/>
                ))}
                <Box display="flex"
                     justifyContent="center">
                    <Link to="add">
                        <IconButton color="inherit">
                            <AddCircle/>
                        </IconButton>
                    </Link>
                </Box>
            </Container>
        </Layout>
    )
}

export default ChecklistGallery
