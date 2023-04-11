import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {Paper} from "@mui/material";

function SimpleBottomNavigation() {

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 80}} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction href={"/add"} label="Add" icon={<AddTaskIcon fontSize={"large"}/>}/>
                <BottomNavigationAction href={"/"} label="Overview" icon={<ChecklistIcon fontSize={"large"}/>}/>
            </BottomNavigation>
        </Paper>
    );
}

export default SimpleBottomNavigation