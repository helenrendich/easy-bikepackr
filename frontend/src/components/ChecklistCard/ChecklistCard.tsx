import React from "react";
import {Checklist} from "../../models/Checklist";
import './ChecklistCard.css'

type ChecklistCardProps = {
    checklist: Checklist
}

function ChecklistCard(props: ChecklistCardProps) {

    return (
        <div className="gallery__card" id={props.checklist.id}>
            <h2 className="gallery__card--title">{props.checklist.destination}</h2>
            <h3 className="gallery__card--date">{props.checklist.startDate.getDate()}</h3>
        </div>
    )
}

export default ChecklistCard
