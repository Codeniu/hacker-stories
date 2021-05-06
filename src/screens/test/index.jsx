import LikeButton from '@/components/like-button';

const Test = () => {
    return (
        <>
            <LikeButton isLikedDefault={true} likedText={'已赞'} />
            <LikeButton isLikedDefault={false} />
        </>
    );
};
export default Test;
