import React from "react";
import './ChecklistGallery.css'
import {Checklist} from "../../models/Checklist";
import ChecklistCard from "../ChecklistCard/ChecklistCard";

type ChecklistGalleryProps = {
    checklists: Checklist[]
}


function ChecklistGallery(props: ChecklistGalleryProps) {
    return (
        <>
            <h1 className="gallery--title">Adventure Checklists</h1>
            <div className="gallery--body">
                {props.checklists.map((checklist) => (
                    <ChecklistCard key={checklist.id} checklist={checklist}/>
                ))}
            </div>
        </>
    )
}

export default ChecklistGallery
