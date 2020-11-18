import React from 'react';
import '../styles/card.css';
import { formatDate } from '../Utils/DateUtils';
import { TagList } from './TagList';

export type Arrythmias = 'AFib' | 'AV Block' | 'Pause' | 'PSVC' | 'PVC';
export type Status = 'PENDING' | 'REJECTED' | 'DONE';

export interface CardProps {
    id: number,
    arrhythmias: Arrythmias[],
    created_date: string,
    patient_name: string,
    status: Status
};

// const statusColorMap: { [key in Status]: string } = {
//     'PENDING': 
// };

export const Card = (props: CardProps) => {
    return <div key={props.id} className='card'>
        <h2>{props.patient_name}</h2>
        <TagList tags={props.arrhythmias}/>
        <b>{formatDate(props.created_date)}</b>

        <ul>
            <li>Status: {props.status}</li>
        </ul>
    </div>;
};