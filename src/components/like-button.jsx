import { useState } from 'react';

const LikeButton = ({
    isLikedDefault,
    likedText = '取消',
    unLikedText = '点赞',
}) => {
    const [isLiked, setIsLiked] = useState(isLikedDefault);
    const handleClickOnLikeButton = () => {
        setIsLiked(!isLiked);
    };

    return (
        <button onClick={handleClickOnLikeButton}>
            {isLiked ? unLikedText : likedText} 👍
        </button>
    );
};

export default LikeButton;
