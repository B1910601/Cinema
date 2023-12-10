import React from 'react'
import usersApi from '../../api/usersApi';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

export default function ButtonDelete({ onDeleted, maGhe, onEdit, nguoiDungItem }) {
    return (
        <>
            <Tooltip title="Xóa">
                <IconButton color="primary" style={{ color: "#f50057" }} onClick={() => onDeleted(maGhe)} >
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>

           
        </>
    )
}