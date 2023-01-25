import React from 'react';
import './userLine.css'
import {useAppSelector} from "../../../../hooks/hooks";

type UserLineProps = {
    name: string,
    scrum?: number
}

function UserLine ({name, scrum}:UserLineProps) {

    const isHidden = useAppSelector(state => state.roomReducer.scramPointIsHidden)
    const scoreStyle = isHidden ? 'score-blur' : '';

    return (
        <div className={'user-line-root'}>
            <div>{name}</div>
            <div className={scoreStyle}>{scrum}</div>
        </div>
    )
}

export default UserLine;