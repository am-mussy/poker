import NeuButton from "../../shared/button/NeuButton";
import React from "react";
import {roomSlice} from "../../store/reducers/RoomSlice";
import {useAppDispatch} from "../../hooks/hooks";


const ClearVotesValue = () => {

    const dispatch = useAppDispatch();
    const { clearVotesValueAction } = roomSlice.actions;
    const clearVotesValue = () => dispatch(clearVotesValueAction())


    return (
        <div>
            <NeuButton
                className={"show-btn"}
                onClick={clearVotesValue}
                name={`${"Очистить"}`}
            />
        </div>
    );
};

export default ClearVotesValue;
