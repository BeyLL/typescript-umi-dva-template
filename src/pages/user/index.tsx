import React, { useEffect } from 'react';
import { connect, Dispatch } from 'dva'
import { userModelState } from '@/models/user'
interface UserProps {
    dispatch: Dispatch;
    user: userModelState;
    loading?: boolean
}
const User: React.FC<UserProps> = ({ dispatch, user, loading }) => {
    const { userList } = user;

    useEffect(() => {
        dispatch({ type: 'user/getUser', payload: {} })
    }, [])

    return (
        <div>
            User
        </div>
    );
}

export default connect(({ user,loading }: { user: userModelState,loading }) => ({ user,loading }))(User);
