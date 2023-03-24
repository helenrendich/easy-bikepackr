import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";
import {Route, Routes} from "react-router-dom";


function App() {
    const {checklists, addChecklist, deleteChecklist} = useChecklistsApi()
    return (
        <>
            <Routes>
                <Route path="/"
                       element={<ChecklistGallery checklists={checklists} deleteChecklist={deleteChecklist}/>}/>
                <Route path="/add" element={<AddChecklist addChecklist={addChecklist}/>}/>
            </Routes>
        </>
    );
}

export default App;
