import clsx from "clsx";
import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { makeStyles } from "tss-react/mui";

import { IReduxState } from "../../../../app/types";
import DeviceStatus from "../../../../prejoin/components/web/preview/DeviceStatus";
import Toolbox from "../../../../toolbox/components/web/Toolbox";
import { getConferenceName } from "../../../conference/functions";
import {
    PREMEETING_BUTTONS,
    THIRD_PARTY_PREJOIN_BUTTONS,
} from "../../../config/constants";
import {
    getToolbarButtons,
    isToolbarButtonEnabled,
} from "../../../config/functions.web";
import { withPixelLineHeight } from "../../../styles/functions.web";

import ConnectionStatus from "./ConnectionStatus";
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import Preview from "./Preview";

interface IProps {
    /**
     * The list of toolbar buttons to render.
     */
    _buttons: Array<string>;

    /**
     * The branding background of the premeeting screen(lobby/prejoin).
     */
    _premeetingBackground: string;

    /**
     * The name of the meeting that is about to be joined.
     */
    _roomName: string;

    /**
     * Children component(s) to be rendered on the screen.
     */
    children?: ReactNode;

    /**
     * Additional CSS class names to set on the icon container.
     */
    className?: string;

    /**
     * The name of the participant.
     */
    name?: string;

    /**
     * Indicates whether the copy url button should be shown.
     */
    showCopyUrlButton?: boolean;

    /**
     * Indicates whether the device status should be shown.
     */
    showDeviceStatus: boolean;

    /**
     * The 'Skip prejoin' button to be rendered (if any).
     */
    skipPrejoinButton?: ReactNode;

    /**
     * Whether it's used in the 3rdParty prejoin screen or not.
     */
    thirdParty?: boolean;

    /**
     * Title of the screen.
     */
    title?: string;

    /**
     * True if the preview overlay should be muted, false otherwise.
     */
    videoMuted?: boolean;

    /**
     * The video track to render as preview (if omitted, the default local track will be rendered).
     */
    videoTrack?: Object;
}

const useStyles = makeStyles()((theme) => {
    return {
        container: {
            height: "100%",
            position: "absolute",
            inset: "0 0 0 0",
            display: "flex",
            flexDiredtion: "column",
            backgroundColor: theme.palette.ui01,
            zIndex: 252,
            "@media (max-width: 720px)": {
                flexDirection: "column",
            },
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
            boxSizing: "border-box",
            float: "none",
            margin: " 0 auto",
            marginTop: theme.spacing(3),
            width: "100%",
            maxWidth: "55%",
            padding: "24px 0 16px",
            position: "relative",
            borderRadius:"10px",
            background:"#000",
            height: "100%",
            zIndex: 252,

            "@media (max-width: 720px)": {
                height: "auto",
                margin: "0 auto",
            },
            "@media (max-width: 1240px)": {
                maxWidth: "90%",
            },
            // mobile phone landscape
            "@media (max-width: 420px)": {
                padding: "16px 16px 0 16px",
                width: "100%",
            },

            "@media (max-width: 400px)": {
                padding: "16px",
            },
        },
        contentControls: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign:"left",
            margin: "auto",
            width: "100%",
            justifyContent:"space-around"
        },
        title: {
            ...withPixelLineHeight(theme.typography.heading4),
            color: `${theme.palette.text01}!important`,
            marginBottom: theme.spacing(3),
            textAlign: "left",

            "@media (max-width: 400px)": {
                display: "none",
            },
        },
        roomName: {
            ...withPixelLineHeight(theme.typography.heading6),
            color: theme.palette.text01,
            // marginBottom: theme.spacing(4),
            overflow: "hidden",
            textAlign: "center",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            background:"#282828",
            marginLeft:theme.spacing(4),
            padding:"12px"
        },
        connectionView: {
            position: "absolute",

            width: "100%",
        },
        toolbarControls: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            float: "none",
            margin: " 0 auto",
            marginTop: theme.spacing(3),
            borderRadius:"10px",
            width: "100%",
            maxWidth: "55%",
            background: "#000",
            padding:"4px 0px",
            "@media (max-width: 1240px)": {
                maxWidth: "90%",
            },
        },
        contentControlsContents: {},
    };
});

const PreMeetingScreen = ({
    _buttons,
    _premeetingBackground,
    _roomName,
    children,
    className,
    showDeviceStatus,
    skipPrejoinButton,
    title,
    videoMuted,
    videoTrack,
}: IProps) => {
    
    const { classes } = useStyles();
    const style = _premeetingBackground
        ? {
              background: _premeetingBackground,
              backgroundPosition: "center",
              backgroundSize: "cover",
          }
        : {};

    return (
        <div
            className={clsx("premeeting-screen", classes.container, className)}
        >
            <div style={style} className={classes.connectionView}>
                <div className={classes.content}>
                    <ConnectionStatus />

                    <div className={classes.contentControls}>
                        <div className={classes.contentControlsContents}>
                            <h1 className={classes.title}>{title}</h1>
                            {showDeviceStatus && <DeviceStatus />}
                        </div>

                        {children}

                        {skipPrejoinButton}
                    </div>
                </div>

                <div className={classes.toolbarControls}>
                    {_roomName && (
                        <span className={classes.roomName}>{_roomName}</span>
                    )}
                    {_buttons.length && <Toolbox toolbarButtons={_buttons} />}
                </div>
            </div>

            <Preview videoMuted={videoMuted} videoTrack={videoTrack} />
        </div>
    );
};

/**
 * Maps (parts of) the redux state to the React {@code Component} props.
 *
 * @param {Object} state - The redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState, ownProps: Partial<IProps>) {
    const { hiddenPremeetingButtons, hideConferenceSubject } =
        state["features/base/config"];
    const toolbarButtons = getToolbarButtons(state);
    const premeetingButtons = (
        ownProps.thirdParty ? THIRD_PARTY_PREJOIN_BUTTONS : PREMEETING_BUTTONS
    ).filter((b: any) => !(hiddenPremeetingButtons || []).includes(b));

    const { premeetingBackground } = state["features/dynamic-branding"];

    return {
        // For keeping backwards compat.: if we pass an empty hiddenPremeetingButtons
        // array through external api, we have all prejoin buttons present on premeeting
        // screen regardless of passed values into toolbarButtons config overwrite.
        // If hiddenPremeetingButtons is missing, we hide the buttons according to
        // toolbarButtons config overwrite.
        _buttons: hiddenPremeetingButtons
            ? premeetingButtons
            : premeetingButtons.filter((b) =>
                  isToolbarButtonEnabled(b, toolbarButtons)
              ),
        _premeetingBackground: premeetingBackground,
        _roomName:
            (hideConferenceSubject ? undefined : getConferenceName(state)) ??
            "",
    };
}

export default connect(mapStateToProps)(PreMeetingScreen);
