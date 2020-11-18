import React from 'react';
import { camelCasify } from '../Utils/StringUtils';
import { Status } from "./Card";

const statusColorMap: { [key in Status]: string } = {
    'PENDING': '#227093',
    'REJECTED': '#c23616',
    'DONE': '#218c74'
};

export const StatusTag = ({ status }: {status: Status}) => {
    const intentColor = statusColorMap[status];

    return (
        <div
            style={{
                border: `2px solid ${intentColor}`,
                borderRadius: '3px',
                width: 'max-content',
                padding: '2px 5px',
                backgroundColor: intentColor,
                color: 'white',
                fontWeight: 'bold'
            }}
        >
            {camelCasify(status)}
        </div>
    );
};