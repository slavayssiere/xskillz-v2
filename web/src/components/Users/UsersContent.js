import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import UserItem from './UserItem';

import CircularProgress from 'material-ui/CircularProgress';

class UsersContent extends Component {

    constructor(props) {
        super(props);

        this.onNewRequest = this.onNewRequest.bind(this);

        this.search = true;
    }

    componentDidMount() {
        const { loaded } = this.props.users;
        if (!loaded) {
            this.props.fetchUsers();
        } else {
            this.componentDidUpdate();
        }
    }

    componentDidUpdate() {
        const { name } = this.props.location.query;
        const { loaded } = this.props.users;

        if (loaded && name && this.search) {
            this.onNewRequest(name);
            this.search = false;
        }
    }

    onNewRequest(name) {
        var user = _.find(this.props.users.list, (s) => s.name === name);
        if (user) {
            this.props.getUserById(user.id, name);
        }
    }

    render() {

        const { loaded } = this.props.users;
        const { onUserClick, onSkillClick } = this.props;

        if (!loaded) {
            return (
                <CircularProgress style={{position: 'absolute', top: '10rem', margin: 'auto', left: 0, right: 0}}/>
            );
        }

        const users = this.props.users.list;

        return (
            <div className="content">
                {users.map((user, index) => <UserItem user={user} onUserClick={onUserClick}
                                                      onSkillClick={onSkillClick} key={index}/>)}
            </div>
        )
    }

}

export default UsersContent;