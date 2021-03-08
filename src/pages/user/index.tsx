import React, { useEffect } from 'react';
import { connect, Dispatch } from 'dva'

import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table';
import { userModelState } from '@/models/user'
interface UserProps {
    dispatch: Dispatch;
    user: userModelState;
    loading?: boolean
}


interface TableTypes {
    key: number,
    deviceName: string,
    serialNum: number
}

const User: React.FC<UserProps> = ({ dispatch, user, loading }) => {
    const { userList, userListPages } = user;


    useEffect(() => {
        dispatch({ type: 'user/getUser', payload: { pageNum: 1, pageSize: 10 } })
    }, [])


    console.log(userListPages)
    const columns: ColumnProps<TableTypes>[] = [
        {
            key: 'serialNum',
            title: '编号',
            dataIndex: 'serialNum'
        },
        {
            key: 'deviceName',
            title: '地址',
            dataIndex: 'deviceName',
        }

    ]

    const dataSource: TableTypes[] = userList
    const tableProps = {
        columns,
        dataSource,
        rowKey: 'id',
        pagination: userListPages
    }

    return (
        <div>
            <Table<TableTypes> {...tableProps} />
        </div>
    );
}

export default connect(({ user, loading }: { user: userModelState, loading }) => ({ user, loading }))(User);
