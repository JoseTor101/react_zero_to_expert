import React from 'react'
import { useCalendarStore } from "../../hooks";


export const FabDelete = () => {
    const {startDeletingEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent()
    };


    return(
        <button
        onClick={handleDelete}
        aria-label='btn-delete'
        className="btn btn-danger fab-danger"
        style={{
            display: hasEventSelected ? '' : 'none'
        }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
};