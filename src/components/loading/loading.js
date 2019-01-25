import React from 'react';
import { Spinner } from 'reactstrap';
import './loading.css';

const Loading = () => (
    <div className="loader">
        <Spinner color="primary" type="grow" style={{ width: '5rem', height: '5rem' }} />
    </div>
);

export default Loading;


