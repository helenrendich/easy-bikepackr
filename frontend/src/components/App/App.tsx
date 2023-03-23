import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";
import {Route, Routes} from "react-router-dom";


function App() {
    const {checklists, addChecklist} = useChecklistsApi()
    return (
        <>
            <Routes>
                <Route path="/" element={<ChecklistGallery checklists={checklists}/>}/>
                <Route path="/add" element={<AddChecklist addChecklist={addChecklist}/>}/>
            </Routes>
        </>
    );
}

export default App;
