import React from "react";
import { makeStyles } from "tss-react/mui";

import { withPixelLineHeight } from "../../../base/styles/functions.web";
import { VideoQualityLabel } from "../../../video-quality/components";
import { IDisplayProps } from "../ConferenceTimer";

const useStyles = makeStyles()((theme) => {
    return {
        timerContainer:{
            position:"absolute",
            right:"1px",
            top:"34px",
            background:"#000",
            padding:"6px 20px",
            display:"flex"
        },
        timer: {
            ...withPixelLineHeight(theme.typography.labelRegular),
            color: theme.palette.text01,
            padding: "6px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            boxSizing: "border-box",
            height: "28px",
            borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
            marginRight: "2px",

            "@media (max-width: 300px)": {
                display: "none",
            },
        },
    };
});

/**
 * Returns web element to be rendered.
 *
 * @returns {ReactElement}
 */
export default function ConferenceTimerDisplay({
    timerValue,
    textStyle: _textStyle,
}: IDisplayProps) {
    const { classes } = useStyles();

    return (
        <div className={classes.timerContainer}>
            <span className={classes.timer}>{timerValue}</span>
            <div>
                <VideoQualityLabel />
            </div>
        </div>
    );
}
