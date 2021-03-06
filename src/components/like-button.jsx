import { useState } from 'react';

const LikeButton = ({
    isLikedDefault,
    likedText = 'εζΆ',
    unLikedText = 'ηΉθ΅',
}) => {
    const [isLiked, setIsLiked] = useState(isLikedDefault);
    const handleClickOnLikeButton = () => {
        setIsLiked(!isLiked);
    };

    return (
        <button onClick={handleClickOnLikeButton}>
            {isLiked ? unLikedText : likedText} π
        </button>
    );
};

export default LikeButton;
