import React from 'react';
import './userLine.css'
import {useAppSelector} from "../../../../hooks/hooks";

function UserLine ({name, scram}:{name: string, scram?:number}) {

    const isHidden = useAppSelector(state => state.roomReducer.scramPointIsHidden)
    const scoreStyle = isHidden ? 'score-blur' : '';

    return (
        <div className={'user-line-root'}>
            <div>{name}</div>
            <div className={scoreStyle}>{scram}</div>
        </div>
    )
}

export default UserLine;