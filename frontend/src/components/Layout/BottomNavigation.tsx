import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Paper} from "@mui/material";
import {Link} from "react-router-dom";

function SimpleBottomNavigation() {

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 80}} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction component={Link} to="add" label="Add" icon={<AddTaskIcon fontSize={"large"}/>}/>
                <BottomNavigationAction component={Link} to="/" label="Overview"
                                        icon={<ChecklistIcon fontSize={"large"}/>}/>
            </BottomNavigation>
        </Paper>
    );
}

export default SimpleBottomNavigation