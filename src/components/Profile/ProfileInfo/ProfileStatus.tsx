import React, { ChangeEvent } from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (newStatus: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
       this.setState({
           status:e.currentTarget.value
       })
    }

    render() {
        return (
            <div>
                {this.state.editMode ?
                    <div>
                        <input type="text" onChange={this.onStatusChange} value={this.state.status}
                               onBlur={this.deactivateEditMode} autoFocus/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "---"}</span>
                    </div>
                }
            </div>
        );
    };
}

