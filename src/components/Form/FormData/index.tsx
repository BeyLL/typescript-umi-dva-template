/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-03-01 11:28:31
 * @Description: 
 * @LastEditTime: 2021-03-02 10:11:51
 */

// 'use strict';

import React, { createElement } from 'react';

//插件
import { Row, Col, Form, Input, Button, Select, DatePicker, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form'
import classnams from 'classnames';

//样式
import style from './index.less';

//常量
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item,
    { Option } = Select,
    c = createElement;

interface DefaltProps extends FormComponentProps {
    formClass?: string;
    formValue: (p: object) => void;
    formColumns: Array<any>
  }

export interface CommonOptions {
    placeholder: string|Array<string>[2];
    field: string;
    ruleValue: {
        rules: any[]
    };
    prefix: Element;
    inputType: string;
    selectLists: any[];
    btnLists: any[];
    labelText: string;
}

type FormProps = Partial<CommonOptions>

const FormData: React.FC<DefaltProps> = (props) => {
    const { formClass, formColumns, formValue, form } = props;
    const { getFieldDecorator, validateFields, resetFields } = form;

    let formItem = {
        labelCol: {
            xs: { span: 6 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 18 },
            sm: { span: 18 },
        },
    };

    //提交表单方法
    const btnFunction = {
        //提交表单
        onSubmitValues: (e: React.SyntheticEvent) => {
            e.preventDefault();
            validateFields((error, values) => {
                if (error) {
                    return;
                }
                formValue(values);
            });
        },

        //重置方法
        onReset: () => {
            resetFields();
        },
    };

    //表单样式
    const components = {
        //输入框
        input: (values: FormProps) => {
            const { placeholder, field, ruleValue = {}, prefix, inputType } = values;
            return getFieldDecorator(field, { ...ruleValue })(
                <Input placeholder={placeholder} prefix={prefix} type={inputType} />,
            );
        },

        //下拉框
        select: (values: FormProps) => {    
            const { placeholder, field, ruleValue = {}, selectLists = [] } = values;
            return getFieldDecorator(field, { ...ruleValue })(
                c(
                    Select,
                    { placeholder, onChange: () => { } },
                    selectLists.map(({ id, label }) => c(Option, { key: id, value: `${id}` }, label)),
                ),
            );
        },

        //日期
        date: (values: FormProps) => {
            const { placeholder, field, ruleValue = {} } = values;
            return getFieldDecorator(field, { ...ruleValue })(<DatePicker placeholder={placeholder} />);
        },
        
        range: (values: FormProps) => {
            const { placeholder, field, ruleValue = {} } = values;
            return getFieldDecorator(field, { ...ruleValue })(<RangePicker placeholder={placeholder} />);
        },

        //复选框
        check: (values: FormProps) => {
            const { labelText, field, ruleValue = {} } = values;
            return getFieldDecorator(field, { ...ruleValue })(<Checkbox>{labelText}</Checkbox>);
        },

        //操作按钮
        btn: (values: FormProps) => {
            const { btnLists = [] } = values;
            return btnLists.map(({ type, title, btnClass, clickFuc }, index) =>
                c(Button, { className: btnClass, onClick: btnFunction[clickFuc], type, key: index }, title),
            );
        },
    };

    return (
        <Form
            className={classnams(style.formStyle, formClass)}
            autoComplete="off"
        >
            <Row>
                {formColumns.map((columns, index) => {
                    let { type, label, formItemClass, formItemLayout, colSpan = 24 } = columns;
                    type = columns.type || 'input';
                    formItemLayout = formItemLayout || formItem;
                    return (
                        <Col span={colSpan} key={index}>
                            <FormItem {...formItemLayout} className={classnams(style.defaultItemStyle, formItemClass)} label={label}>
                                {components[type](columns)}
                            </FormItem>
                        </Col>
                    );
                })}
            </Row>
        </Form>
    );
};

export default Form.create<DefaltProps>()(FormData);
