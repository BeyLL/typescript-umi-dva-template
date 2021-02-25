import React from 'react';
import { connect } from 'dva'
import { Form, Button, Input, Checkbox, Icon } from 'antd'
// import {} from '@/models/connect'
import _style from './index.less'


const Login: React.FC = props => {
    const { form, dispatch } = props;
    const { getFieldDecorator, validateFields } = form;
    //提交表单
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        validateFields((err: any, values: object) => {
            if (!err) {
                dispatch({ type: 'login/loginInfo', payload: values })
            }
        })

    }

    return (
        <div className={_style.loginContainer}>
            <div className={_style.subForm}>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator(`username`, {
                            // initialValue: this.state.username,
                            rules: [{ required: true, message: '用户名不能为空' }]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='username' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator(`password`, {
                            // initialValue: this.state.password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder='password' />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator(`remember`, {
                            valuePropName: 'checked',
                            // initialValue: this.state.remember,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={_style.loginFormButton}>登录</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

export default connect()(Form.create()(Login));
