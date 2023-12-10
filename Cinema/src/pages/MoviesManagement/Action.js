import React from 'react'

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

import UseApiCheckIsMaPhimSetShowtime from '../../utilities/useApiCheckIsMaPhimSetShowtime';

export default function ButtonDelete({ onDeleted, phimItem, onEdit }) {
    const isMovieSetShowtime = UseApiCheckIsMaPhimSetShowtime(phimItem.maPhim)
    const handleDeleteClick = () => {
        if (isMovieSetShowtime) {
            const canDelete = window.confirm(
                'Bạn có chắc chắn muốn xóa?'
            );

            if (canDelete) {
                onDeleted(phimItem.maPhim);
            }
        } else {
            alert('Phim đang có lịch chiếu không thể xóa');
        }
    };
    return (
        <>
            <Tooltip
                title={isMovieSetShowtime ? 'Xóa' : 'Xóa'}
            >
                <IconButton
                    color="primary"
                    style={{
                        color: isMovieSetShowtime ? '#f50057' : '#f50057',

                    }}
                    onClick={handleDeleteClick}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Chỉnh sửa">
                <IconButton
                    color="primary"
                    style={{ color: 'rgb(238, 130, 59)' }}
                    onClick={() => onEdit(phimItem)}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}
