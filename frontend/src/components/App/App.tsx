import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";
import {Route, Routes} from "react-router-dom";
import ChecklistDetails from "../ChecklistDetails/ChecklistDetails";


function App() {
    const {checklists, addChecklist, deleteChecklist} = useChecklistsApi()
    return (
        <>
            <Routes>
                <Route path="/"
                       element={<ChecklistGallery checklists={checklists} deleteChecklist={deleteChecklist}/>}/>
                <Route path="/add" element={<AddChecklist addChecklist={addChecklist}/>}/>
                <Route path="/details/:id" element={<ChecklistDetails checklists={checklists}/>}/>
            </Routes>
        </>
    );
}

export default App;
