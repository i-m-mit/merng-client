import { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Image, Card, Form } from 'semantic-ui-react';
import moment from 'moment';

import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from '../utils/graphql';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');
    const { loading, data } = useQuery(FETCH_POST_QUERY, {
        variables: { postId },
    });

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: {
            postId,
            body: comment,
        },
        update: () => {
            setComment('');
            commentInputRef.current.blur();
        },
    });

    const deleteCallback = () => {
        props.history.push(`/`);
    };

    let postMarkup;
    if (loading) {
        postMarkup = <p>Loading...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            likes,
            likeCount,
            comments,
            commentCount,
        } = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                                <br />
                                <Card.Content extra>
                                    <LikeButton
                                        user={user}
                                        post={{ id, likeCount, likes }}
                                    />
                                    <CommentButton
                                        commentCount={commentCount}
                                    />
                                    {user && user.username === username && (
                                        <DeleteButton
                                            postId={id}
                                            callback={deleteCallback}
                                        />
                                    )}
                                </Card.Content>
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment..."
                                                value={comment}
                                                name="comment"
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            />
                                            <button
                                                className="ui button teal"
                                                disabled={comment.trim() === ''}
                                                type="submit"
                                                onClick={createComment}
                                                ref={commentInputRef}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments &&
                            comments.length > 0 &&
                            comments.map((comment) => (
                                <Card key={comment.id} fluid>
                                    <Card.Content>
                                        {user &&
                                            user.username ===
                                                comment.username && (
                                                <DeleteButton
                                                    postId={id}
                                                    commentId={comment.id}
                                                />
                                            )}
                                        <Card.Header>
                                            {comment.username}
                                        </Card.Header>
                                        <Card.Meta>
                                            {moment(
                                                comment.createdAt
                                            ).fromNow()}
                                        </Card.Meta>
                                        <Card.Description>
                                            {comment.body}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;
