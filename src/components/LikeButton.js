import { useState, useEffect } from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LIKE_POST_MUTATION } from '../utils/graphql';
import MyPopup from '../components/MyPopup';

function LikeButton({ post: { id, likes, likeCount }, user }) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    );
    return (
        <MyPopup content={liked ? 'Unlike the post' : 'Like the post'}>
            <Button as="div" labelPosition="right" onClick={likePost}>
                {likeButton}
                <Label basic color="teal" pointing="left">
                    {likeCount}
                </Label>
            </Button>
        </MyPopup>
    );
}

export default LikeButton;
