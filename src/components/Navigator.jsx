import { useNavigate } from 'react-router-dom';
import { Children, cloneElement, isValidElement } from 'react';

export default function Navigator(props) {
    const navigate = useNavigate();

    function handleClick(event) {
        // console.log(props.location);
        if (props.onClick) {
            props.onClick(event);
        }
        console.log(props.location);
        navigate(props.location);
    }

    // Expecting only one child (like a button, p, span, etc.)
    // console.log(props.children);
    const child = Children.only(props.children);

    if (isValidElement(child)) {
        return cloneElement(child, {
            onClick: handleClick,
            className: props.className,
            ...child.props, // preserve any existing props
        });
    }

    return null;
}
