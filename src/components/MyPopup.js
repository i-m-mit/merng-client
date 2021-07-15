import { Popup } from 'semantic-ui-react';

function MyPopup({ content, children }) {
    return <Popup content={content} trigger={children} inverted></Popup>;
}

export default MyPopup;
