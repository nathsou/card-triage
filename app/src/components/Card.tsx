import React from 'react';
import '../styles/card.css';
import { formatDate } from '../Utils/StringUtils';
import { StatusTag } from './StatusTag';
import { TagList } from './TagList';

export type Arrythmias = 'AFib' | 'AV Block' | 'Pause' | 'PSVC' | 'PVC';
export type Status = 'PENDING' | 'REJECTED' | 'DONE';

export interface CardProps {
    id: number,
    arrhythmias: Arrythmias[],
    created_date: string,
    patient_name: string,
    status: Status,
    onStatusChanged: () => void
};

export const Card = (props: CardProps) => {
    return (
        <div key={props.id} className='card'>
            <div className='card-header'>
                <h2 style={{margin: '0'}}>{props.patient_name}</h2>
                <StatusTag status={props.status}/>
            </div>

            <p style={{color: '#525252'}}>Created on {formatDate(props.created_date)}</p>
            <TagList tags={props.arrhythmias}/>
        </div>
    );
};