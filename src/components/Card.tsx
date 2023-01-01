import classNames from "classnames";
import React from "react";
import { Card, CardColor } from "../cards/Card";
import styles from "./Card.module.scss";

export interface ICardProps {
    /** if null, will only show the back of a card. */
    card: Card | null;
    backColor?: string;
    faceDown?: boolean;
    invertColor?: boolean;
    className?: string;
}

export const CardElem = ({
    card,
    backColor = "darkred",
    invertColor,
    faceDown,
    className,
}: ICardProps): JSX.Element => {
    const showBack = !card || faceDown;
    return (
        <span
            className={classNames(styles.root, className, { [styles.invert]: invertColor, [styles.black]: card?.color === CardColor.Black, [styles.red]: card?.color === CardColor.Red })}
            style={{
                color: showBack && !invertColor ? backColor : undefined,
                backgroundColor: showBack && invertColor ? backColor : undefined,
            }}
        >
            <span className={styles.outer}>
                <span className={styles.inner}>{showBack ? "\u{1F0A0}" : card?.unicode}</span>
            </span>
        </span>
    );
};
