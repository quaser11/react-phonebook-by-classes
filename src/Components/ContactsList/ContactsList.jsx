import React, {Component} from 'react';
import {List, Item, Delete, Number} from './ContactsList.styled';

export class ContactsList extends Component {

    render() {
        const contacts = this.props.contacts;
        const {onDeleteContact, onToggleClick} = this.props;
        return <List>
            {contacts.map(contact => {
                const {name, number, id} = contact
                return <Item
                    key={id}
                    onClick={(e) => onToggleClick(e, id)}>
                    <span>
                        {name}
                    </span>
                    <Number>
                        {`(${number.slice(0, 3)})-${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`}
                    </Number>
                    <Delete onClick={() => onDeleteContact(id)}>Delete</Delete>
                </Item>
            })}
        </List>
    }
}

export default ContactsList