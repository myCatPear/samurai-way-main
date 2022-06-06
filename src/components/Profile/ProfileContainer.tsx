import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, ProfileType, setStatus, updateStatus} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userID = this.props.match.params.userID
        if (!userID) userID = '2'

        this.props.getUserProfile(userID)
        this.props.getStatus(userID)
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID)
        //     .then(response => {
        //         this.props.setUserProfile(response.data)
        //     })
    }

    render() {


        return (
            <div>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        )

    }

};

type mapStateToPropsType = {
    profile:ProfileType | null
    status:string
}

type mapDispatchToPropsType = {
    getUserProfile:(userID:string) => void
    getStatus:(userID:string) => void
    updateStatus:(newStatus:string) => void
}



const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status,
})

type PathParamsType = {
    userID:string
}

type ProfilePropsType = RouteComponentProps<PathParamsType> & mapStateToPropsType & mapDispatchToPropsType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus
    }),
    withRouter,
)(ProfileContainer)