import React, { useState } from 'react';

//component
import AuthRouter from '../AuthRouter'

const BasicLayout: React.FC = props => {

    return (<AuthRouter {...props} />);
};

export default BasicLayout;
