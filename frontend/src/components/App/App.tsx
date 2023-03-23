import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";
import AddChecklist from "../AddChecklist/AddChecklist";


function App() {
    const {loading, checklists, addChecklist} = useChecklistsApi()
    return (
        <>
            {!loading && <ChecklistGallery checklists={checklists}/>}
            {<AddChecklist addChecklist={addChecklist}/>}
        </>
    );
}

export default App;
