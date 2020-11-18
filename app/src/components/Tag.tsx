import React from 'react';
import '../styles/card.css';

export interface TagProps {
    content: string
};

export const Tag = ({ content }: TagProps) => 
    <div className='tag'>
        { content }
    </div>;