import { useUiStore } from "../../hooks";

export const FabAddNew = () => {
    const {openDateModal} = useUiStore();

    const handleClickNew = () => {
        openDateModal();
    };


    return(
        <button
        onClick={handleClickNew}
        className="btn btn-primary fab"
        >
            <i className="fas fa-plus"></i>
        </button>
    )
};