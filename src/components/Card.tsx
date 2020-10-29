import React from 'react';
import { Card } from '../cards/Card';
import styles from './Card.module.scss';

export interface ICardProps {
    card: Card;
    faceDown?: boolean;
}

export const CardElem = ({ card, faceDown }: ICardProps): JSX.Element => {

    return (
        <span className={styles.root} style={{ color: faceDown ? 'darkred' : card.color }}>
            <span className={styles.outer}>
                <span className={styles.inner}>{faceDown ? '\u{1F0A0}' : card.unicode}</span>
            </span>
        </span>
    );
}