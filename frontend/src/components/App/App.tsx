import React from 'react';
import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";


function App() {
    const {loading, checklists} = useChecklistsApi()
    return (
        <div>
            <main className="main">
                {!loading && <ChecklistGallery checklists={checklists}/>}
            </main>
        </div>
    );
}

export default App;
