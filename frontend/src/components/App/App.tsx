import React from 'react';
import './App.css';

import ChecklistGallery from "../ChecklistGallery/ChecklistGallery";
import useChecklistsApi from "../hooks/useChecklistsApi";


function App() {
    const {loading, checklists} = useChecklistsApi()
    return (
        <div id="app">
            <main className="main">
                {!loading && <ChecklistGallery checklists={checklists}/>}
            </main>
        </div>
    );
}

export default App;
