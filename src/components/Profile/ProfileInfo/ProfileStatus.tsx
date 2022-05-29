import React from 'react';

type ProfileStatusType = {
    status:string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode:false
    }

    activateEditMode = () => {
        debugger
        this.setState({
                editMode:true
            })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode ?
                    <div>
                        <input type="text" value={this.props.status} onBlur={this.deactivateEditMode} autoFocus/>
                    </div>
                    :
                    <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
            </div>
        );
    };
}

