import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal, onToggleDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        dispatch(onToggleDateModal());
    }

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
};