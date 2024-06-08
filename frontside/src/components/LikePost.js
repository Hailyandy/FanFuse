import React from 'react';
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikePost = ({ isLike, handleLike, handleUnLike }) => {
    return (
        <div>
            {
                isLike
                    ? <FavoriteIcon onClick={handleUnLike} style={{ color: 'purple' }} />
                    : <FavoriteIconOutlined onClick={handleLike} style={{ color: 'black' }} /> // Sửa đổi biểu tượng
            }
        </div>
    )
}

export default LikePost;
