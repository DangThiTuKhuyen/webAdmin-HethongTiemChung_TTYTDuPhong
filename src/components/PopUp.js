import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    // const classes = useStyles();
    
    return (
        <Dialog open={openPopup} maxWidth="md" >
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <button
                        color="secondary"

                        onClick={() => {
                            setOpenPopup(false);
                            props.handleReloadComponent();
                           
                        }}>
                        <CloseIcon />
                    </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
