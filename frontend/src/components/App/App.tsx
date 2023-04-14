import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";
import {Route, Routes} from "react-router-dom";
import ChecklistDetails from "../ChecklistDetails/ChecklistDetails";
import {createTheme, ThemeProvider} from "@mui/material";
import {amber, teal} from "@mui/material/colors";


function App() {
    const {checklists, addChecklist, deleteChecklist, editChecklist, editItem, addItem} = useChecklistsApi()
    const theme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
        },
        typography: {
            fontFamily: [
                'Verdana',
            ].join(','),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/"
                       element={<ChecklistGallery checklists={checklists} deleteChecklist={deleteChecklist}/>}/>
                <Route path="/add" element={<AddChecklist addChecklist={addChecklist}/>}/>
                <Route path="/details/:id"
                       element={<ChecklistDetails checklists={checklists} editChecklist={editChecklist}
                                                  editItem={editItem} addItem={addItem}/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
