import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppButton from "./AppButton";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Modalify(props) {
    const {header, text, ok, callback, state} = props
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const hide = () => {
        callback(false)
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{header}</h2>
            <span id="simple-modal-description">{text}</span>
            <div className='inrow'>
                <AppButton val='ok' click={ok||hide}/>
                <AppButton val='cancel' click={hide}/>
            </div>
        </div>
    );
    return <Modal
        open={state}
        onClose={hide}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        {body}
    </Modal>
}
