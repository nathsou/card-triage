import React from 'react';

export type Arrythmias = 'AFib' | 'AV Block' | 'Pause' | 'PSVC' | 'PVC';
export type Status = 'PENDING' | 'REJECTED' | 'DONE';

export interface CardProps {
    id: number,
    arrhythmias: Arrythmias[],
    created_date: Date,
    patient_name: string,
    status: Status
};

export const Card = (props: CardProps) => {
    return <div key={props.id}>
        <ul>
            <li>Arrhythmias: {props.arrhythmias.join(', ')}</li>
            <li>Created date: {props.created_date.toDateString()}</li>
            <li>Name: {props.patient_name}</li>
            <li>Status: {props.status}</li>
        </ul>
    </div>;
};