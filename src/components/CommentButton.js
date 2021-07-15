import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MyPopup from '../components/MyPopup';

function CommentButton({ commentCount, id }) {
    return (
        <MyPopup content="Comment on post">
            <Button
                labelPosition="right"
                as={id ? Link : 'div'}
                to={`/posts/${id}`}
            >
                <Button color="blue" basic>
                    <Icon name="comments" />
                </Button>
                <Label basic color="teal" pointing="left">
                    {commentCount}
                </Label>
            </Button>
        </MyPopup>
    );
}

export default CommentButton;
