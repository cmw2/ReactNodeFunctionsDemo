import React from "react";
import { Link, useLocation } from "react-router-dom";
import './menu.css'

const items = [{
    path: '/',
    text: 'Home'
}, {
    path: '/about',
    text: 'About'
}, {
    path: '/contact',
    text: 'Contact'
}, {
    path: '/orders',
    text: 'Orders'
}];

export default function Menu() {
    return (
        <ul className="menu">
            {items.map(item => (
                <li key={item.path} className={useLocation.path === item.path ? 'menu_item menu_item_active' : 'menu_item'}>
                <Link to={item.path}>{item.text}</Link>
                </li>
            ))}
        </ul>
    );
}
