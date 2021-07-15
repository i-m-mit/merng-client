import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        body: '',
    });
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        onError: (error) => console.log(error),
        update: (proxy, { data: { createPost: post } }) => {
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
            const newData = [post, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: { newData },
                },
            });
            values.body = '';
        },
    });

    function createPostCallback() {
        try {
            createPost();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}.</li>
                    </ul>
                </div>
            )}
        </>
    );
}
export default PostForm;
