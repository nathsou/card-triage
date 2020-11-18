import React from 'react';
import '../styles/card.css';
import { Tag } from './Tag';

export interface TagListProps {
    tags: string[]
};

export const TagList = ({ tags }: TagListProps) => {
    return <div className='tag-list'>
        {tags.map((tag, index) => <Tag key={index} content={tag}/>)}
    </div>;
};
