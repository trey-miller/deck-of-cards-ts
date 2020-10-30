import React from 'react';
import { Card } from '../cards/Card';
import styles from './Card.module.scss';

export interface ICardProps {
    /** if null, will only show the back of a card. */
    card: Card | null;
    faceDown?: boolean;
    className?: string;
}

export const CardElem = ({ card, faceDown, className }: ICardProps): JSX.Element => {
    const showBack = !card || faceDown;
    const rootClassName = styles.root + ` ${className || ''}`;
    return (
        <span className={rootClassName} style={{ color: showBack ? 'darkred' : card?.color }}>
            <span className={styles.outer}>
                <span className={styles.inner}>{showBack ? '\u{1F0A0}' : card?.unicode}</span>
            </span>
        </span>
    );
}