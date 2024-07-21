import {Component} from 'react'
import {v4 as uuidv4} from 'uuid';
import iziToast from "izitoast";
import {Field, Form, Formik} from "formik";
import styled from "@emotion/styled";
import "izitoast/dist/css/iziToast.min.css";
import * as yup from 'yup'
import EOTranslator from "eo-translatorjs";

const PhoneBookForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap:10px;
    margin:30px auto;
    width:200px;
    padding:10px;
    border-radius:5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`

const Input = styled(Field)`
    padding:10px;
    border-radius:5px;
    outline:none;
    border:none;
    transition:border 250ms ease-in-out; 
`

const Description = styled(Field)`
    padding:10px;
    border-radius:5px;
    height:50px;
    outline:none;
    border:none;
    resize:none;
    transition:border 250ms ease-in-out; 
`

const Submit = styled.button`
    height:50px;
    outline:none;
    border:none;
    border-radius:10px;
    cursor:pointer;
    transition:background 250ms ease-in-out;
    
       &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
       }
`

const dict = {
    ua: {'number must be at most 10 characters': 'Номер має бути не довшим за 10 символів',
        'number must be at least 10 characters':'Номер має бути не коротшим за 10 символів',
        'already exists!': '{name} вже є у списку',
    }
}
const translator = new EOTranslator(dict, 'ua');

class PhoneForm extends Component {
    // state = {
    //     name: '',
    //     number: '',
    //     id: ''
    // }

    // onHandleChange = (e) => {
    //     this.setState({[e.target.name]: e.target.value});
    // }
    //
    // onHandleSubmit = async (e) => {
    //     e.preventDefault()
    //     const {addContact, contacts} = this.props
    //     const {name} = this.state
    //
    //     let contactExist = false;
    //     contacts.forEach(contact => {
    //         if (contact.name.toLowerCase().includes(name.toLowerCase())) {
    //             contactExist = true
    //             iziToast.show({
    //                 message: `${name} already exists!`,
    //                 color: 'red'
    //             })
    //             return;
    //         }
    //     })
    //
    //     if (contactExist) {
    //         return;
    //     }

    //     const id = uuidv4()
    //     await this.setState({id})
    //
    //     addContact(this.state)
    //
    //     this.setState({name: '', number: '', id: ''})
    // }

    initialValues = {
        name: '',
        number: '',
        description: ''
    }

    schema = yup.object({
        name: yup.string().required(),
        number: yup.string().min(10).max(10).required()
    })

    onSubmit = async (values, actions) => {
        try {
            await this.schema.validate(values, {abortEarly: false})
            const {addContact, contacts} = this.props
            const {name} = values

            let contactExist = false;
            contacts.forEach(contact => {
                if (contact.name.toLowerCase().includes(name.toLowerCase())) {
                    contactExist = true
                    this.ErrorMessage('already exists!', name)
                    return;
                }
            })

            if (contactExist) {
                return;
            }

            const id = uuidv4()
            values.id = id
            addContact(values)
            actions.resetForm()
        } catch (errors){
            errors.inner.forEach(error => this.ErrorMessage(error.message))
        }
    }

    ErrorMessage = (error, name) => {
        iziToast.show({
            message: name ? translator.translate(error, {params: {name}}) : translator.translate(error),
            color: 'red',
            position:'topRight',
        });
    }


    render() {

        return <Formik initialValues={this.initialValues} onSubmit={this.onSubmit}>
            <PhoneBookForm>

                <label htmlFor='name'>Name</label>
                <Input
                    type="text"
                    name="name"
                    id='name'
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    placeholder='Enter Name'
                    required
                />
                <label htmlFor='number'>Number</label>
                <Input
                    type='tel'
                    name="number"
                    id='number'
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    placeholder='Put your number'
                    required
                />
                <Description as='textarea' name='description' id='description' placeholder='Enter Description' />
                <Submit type='submit'>Add Contact</Submit>
            </PhoneBookForm>
        </Formik>
    }
}

export default PhoneForm