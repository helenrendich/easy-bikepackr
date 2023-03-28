import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";
import {Route, Routes} from "react-router-dom";
import ChecklistDetails from "../ChecklistDetails/ChecklistDetails";


function App() {
    const {checklists, addChecklist, deleteChecklist, fetchSingleChecklist, checklist} = useChecklistsApi()
    return (
        <>
            <Routes>
                <Route path="/"
                       element={<ChecklistGallery checklists={checklists} deleteChecklist={deleteChecklist}
                                                  fetchSingleChecklist={fetchSingleChecklist}/>}/>
                <Route path="/add" element={<AddChecklist addChecklist={addChecklist}/>}/>
                <Route path="/details" element={<ChecklistDetails checklistById={checklist}/>}/>
            </Routes>
        </>
    );
}

export default App;
