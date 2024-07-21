import {PureComponent} from 'react';
import PhoneForm from "./Form";
import ContactsList from "./ContactsList";
import Filter from "./Filter";
import Modal from "./Modal";
import {Container} from "./App.styled";

class App extends PureComponent {
    state = {
        contacts: [],
        filter: '',
        showModal: false,
        modalPosition:{
            top:'',
            left:''
        },
        currentDescription: ''
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("contacts"))

        if(data){
            this.setState({contacts: data})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    addContact = contact => {
        this.setState(prevState => ({contacts: [...prevState.contacts, contact]}));
    }

    onFilter = value => {
        this.setState({filter: value.toLowerCase()})

    }

    filteredArray = () => {
        const {contacts, filter} = this.state
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter));
    }

    deleteContact = id => {
        this.setState(prevState => ({
            contacts:prevState.contacts.filter(contact => contact.id !== id)
        }))
    }

    toggleModal = (e, id) => {
        if(e && e.target.nodeName === "BUTTON"){
            return
        }
        if(e){
            const {top, left} = e.currentTarget.getBoundingClientRect()
            this.setState({modalPosition: {top: top, left: left}})
        }

        if(e){
            this.getIdAndRenderDescription(id)
        }
        this.setState((prevState) => {
            return {showModal: !prevState.showModal}
        });
    }

    getIdAndRenderDescription = (id) => {
           const currentContact = this.state.contacts.filter(contact => contact.id === id)[0].description

            this.setState({currentDescription: currentContact})
    }

    render() {
        return <Container>
            {this.state.showModal && <Modal onToggleClick={this.toggleModal} position={this.state.modalPosition}>
                {this.state.currentDescription}
            </Modal>}
            <PhoneForm addContact={this.addContact} contacts={this.state.contacts} />
            {this.state.contacts.length > 0 ? <Filter onFilter={this.onFilter}/> : null}
            <ContactsList contacts={this.filteredArray()} onDeleteContact={this.deleteContact} onToggleClick={this.toggleModal}/>
        </Container>
    }
}

export default App;