import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (newStatus: string) => void
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusType> = (props) => {

    const [isEditMode, setIsEditMode] = useState(false)

    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => setIsEditMode(true)

    const deactivateEditMode = () => {
        setIsEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (event:ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value)
    }

    return (
        <div>
            {isEditMode ?
                <div>
                    <input type="text" onChange={onStatusChange} value={status}
                           onBlur={deactivateEditMode} autoFocus/>
                </div>
                :
                <div>
                    <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || "---"}</span>
                </div>
            }
        </div>
    );

}

