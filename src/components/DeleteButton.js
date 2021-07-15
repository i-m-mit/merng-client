import { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import {
    DELETE_POST_MUTATION,
    FETCH_POSTS_QUERY,
    DELETE_COMMENT_MUTATION,
} from '../utils/graphql';
import MyPopup from '../components/MyPopup';

function DeleteButton({ postId, callback, commentId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        variables: { postId, commentId },
        update: (proxy) => {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
                const newData = data.getPosts.filter(
                    (post) => post.id !== postId
                );
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        ...data,
                        getPosts: { newData },
                    },
                });
            }
            if (callback) {
                callback();
            }
        },
    });

    return (
        <>
            <MyPopup content={commentId ? 'Delete Comment' : 'Delete Post'}>
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} color="white" />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    );
}

export default DeleteButton;
