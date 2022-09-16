import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, ProfileType, savePhoto, saveProfile, setStatus, updateStatus} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        let userID = this.props.match.params.userID
        if (!userID) {
            userID = this.props.authorizedUserId as string
            if (!userID) {
                this.props.history.push("/login")
            }
        }

        this.props.getUserProfile(userID)
        this.props.getStatus(userID)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userID !== prevProps.match.params.userID) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    isOwner={!this.props.match.params.userID}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }

};

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: null | number | string
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
    getStatus: (userID: string) => void
    updateStatus: (newStatus: string) => void
    savePhoto:(photo:File) => void
    saveProfile:(formData:ProfileType) => Promise<{}>
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.id
})

type PathParamsType = {
    userID: string
}

type ProfilePropsType = RouteComponentProps<PathParamsType> & mapStateToPropsType & mapDispatchToPropsType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)