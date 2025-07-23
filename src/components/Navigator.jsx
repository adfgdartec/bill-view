import { useNavigate } from 'react-router-dom';
import { Children, cloneElement, isValidElement } from 'react';

export default function Navigator(props) {
    const navigate = useNavigate();

    function handleClick(event) {
        if (props.onClick) {
            props.onClick(event);
        }
        navigate(props.location);
    }

    // Expecting only one child (like a button, p, span, etc.)
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
