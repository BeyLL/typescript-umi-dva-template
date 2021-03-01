import React, { ComponentProps } from 'react';
import { connect,Dispatch } from 'dva'
// import {ReactComponentProps} from 'umi/router'
import { Form, Button, Input, Checkbox, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form';
// import {} from '@/models/connect'
import FormData from '@/components/Form/FormData'
import { deleteNull } from '@/utils'
import _style from './index.less'

interface LoginProps {
    form: FormComponentProps['form'];
    dispatch: Dispatch<any>
}
const Login: React.FC<LoginProps> = props => {
    const { form, dispatch } = props;
    const { getFieldDecorator, validateFields } = form;
    //提交表单
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        validateFields((err: any, values: object) => {
            if (!err) {
                deleteNull(values)
                dispatch({ type: 'login/loginInfo', payload: values })
            }
        })

    }

    //表单数据
    const formProps = {
        formColumns: [
            {

                placeholder: '请输入用户名',
                field: 'user',
                ruleValue: {
                    rules: [
                        {
                            required: true,
                            message: '请输入用户名',
                        }
                    ],
                },
                prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
                formItemLayout: {
                    labelCol: {
                        xs: { span: 0 },
                        sm: { span: 0 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 24 },
                    },
                },
            },
            {
                type: 'input',
                placeholder: '请输入密码',
                field: 'password',
                ruleValue: {
                    rules: [
                        {
                            required: true,
                            message: '请输入密码',
                        }
                    ],
                },
                inputType: 'password',
                formItemLayout: {
                    labelCol: {
                        xs: { span: 0 },
                        sm: { span: 0 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 24 },
                    },
                },
                prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
            },
            {
                type: 'check',
                field: 'forget',
                labelText: '记住密码',

            },
            {
                type: 'btn',

                btnLists: [
                    {
                        title: '登录',
                        type: 'primary',

                        clickFuc: `onSubmitValues`,
                    }
                ],
            },
        ],
        formValue: (values:object) => {
            dispatch({ type: 'login/login', payload: {values} });
        },
    };


    return (
        <div className={_style.loginContainer}>
            <div className={_style.subForm}>
                <FormData {...formProps} />
            </div>
        </div>
    );
}

export default connect()(Form.create()(Login));
