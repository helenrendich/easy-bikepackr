import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Box, Button, IconButton, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {NewItem} from "../../models/Item";
import {Checklist} from "../../models/Checklist";

type AddProps = {
    checklist: Checklist
    category: string
    addItem: (listId: string, itemToAdd: NewItem) => void
}

function AddItem(props: AddProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState<string>("");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setUpdatedTitle(event.target.value)
    }

    function handleSave() {
        props.addItem(props.checklist.id, {
            title: updatedTitle,
            category: props.category
        })
        setAnchorEl(null);
        setUpdatedTitle("");
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Box display="flex" alignItems="center">
                <IconButton color={"primary"} aria-describedby={id} onClick={handleClick}>
                    <AddBoxIcon/>
                </IconButton>
                <Typography color={"grey"}>Add Item...</Typography>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <TextField value={updatedTitle} onChange={handleTitleChange}/>
                <Button onClick={() => handleSave()}>
                    <CheckIcon color="action"/>
                </Button>
                <Button onClick={handleClose}>
                    <CloseIcon color="action"/>
                </Button>
            </Popover>
        </div>
    );
}

export default AddItem