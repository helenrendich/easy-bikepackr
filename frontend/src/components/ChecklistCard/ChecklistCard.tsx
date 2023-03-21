import React from "react";
import {Checklist} from "../../models/Checklist";
import './ChecklistCard.css'

type ChecklistCardProps = {
    checklist: Checklist
}

function ChecklistCard(props: ChecklistCardProps) {
    const dateString = props.checklist.startDate;
    const dateDate = new Date(dateString);

    return (
        <div className="gallery__card" id={props.checklist.id}>
            <h2 className="gallery__card--title">{props.checklist.destination}</h2>
            <h3 className="gallery__card--date">{dateDate.toLocaleDateString("en-GB")}</h3>
        </div>
    )
}

export default ChecklistCard
