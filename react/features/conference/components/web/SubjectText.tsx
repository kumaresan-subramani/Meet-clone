import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { getConferenceName } from '../../../base/conference/functions';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import { Tooltip } from '../../../base/tooltip';
import { Toolbox } from '../../../toolbox/components/web';
import ConferenceTimer from '../ConferenceTimer';

const useStyles = makeStyles()(theme => {
    return {
        // container: {
        //     ...withPixelLineHeight(theme.typography.bodyLongRegular),
        //     color: theme.palette.text01,
        //     padding: '2px 16px',
        //     backgroundColor: 'rgba(0, 0, 0, 0.6)',
        //     maxWidth: '324px',
        //     boxSizing: 'border-box',
        //     height: '28px',
        //     borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
        //     marginLeft: '2px',

        //     '@media (max-width: 300px)': {
        //         display: 'none'
        //     }
        // },
        mainContainer:{
            width:"588px",
            height:"125px",
            borderRadius:"24px",
            backgroundColor: theme.palette.ui01,
        },
        container: {
            height: "100%",
            // position: "absolute",
            inset: "0 0 0 0",
            display: "flex",
            flexDirection: "column",
            zIndex: 252,
            "@media (max-width: 720px)": {
                flexDirection: "column",
            },
        },
        content: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around",
            margin:"10px 0px 15px 0px"
        },
        sub:{},
        subText:{
            padding:"8px 25px",
            color:'#000',
            backgroundColor:"#fff",
            fontSize:"15px",
            borderRadius:"10px",
        },
    };
});

/**
 * Label for the conference name.
 *
 * @returns {ReactElement}
 */
const SubjectText = () => {
    const subject = useSelector(getConferenceName);
    const { classes } = useStyles();

    return (<>
        <div className={classes.mainContainer}>
        <div className = { classes.container }>
            <Tooltip
                content = { subject }
                position = 'bottom'>
                <div className = { clsx('subject-text--content', classes.content) }>
                    <div className={classes.sub}><h3>Subject :</h3></div>
                    <div className={classes.subText}>{subject}</div>
                </div>
            </Tooltip>
            <div style={{marginLeft:"20px"}}>
                    <Toolbox />
                </div>
        </div>
        </div>
        </>
    );
};

export default SubjectText;
