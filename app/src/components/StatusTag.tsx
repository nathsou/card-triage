import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { camelCasify } from '../utils/StringUtils';
import { Status } from "./Card";

const statusColorMap: { [key in Status]: string } = {
    'PENDING': '#227093',
    'REJECTED': '#c23616',
    'DONE': '#218c74'
};

export interface StatusTagProps {
    status: Status,
    onClick: () => void
    displayArrow: boolean
};

export const StatusTag = ({ status, onClick, displayArrow }: StatusTagProps) => {
    const intentColor = displayArrow ?
        statusColorMap[status === 'DONE' ? 'REJECTED' : 'DONE'] :
        statusColorMap[status];

    const body = displayArrow ? (status === 'DONE' ? 
            (<div>
                {
                    displayArrow &&
                    <FontAwesomeIcon
                        style={{marginRight: '5px'}}
                        icon='long-arrow-alt-left'
                    />
                }
                Reject
            </div>) :
            (<div>
                Accept
                {
                    displayArrow &&
                    <FontAwesomeIcon
                        style={{marginLeft: '5px'}}
                        icon='long-arrow-alt-right'
                    />
                }
            </div>)
     ) : camelCasify(status);

    return (
        <div
            className='status-tag'
            style={{
                borderColor: intentColor,
                backgroundColor: intentColor,
            }}
            onClick={onClick}
        >
            {body}
        </div>
    );
};