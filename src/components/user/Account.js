import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '../main/Header';
import Footer from '../main/Footer';
import {getUser} from '../../redux/userReducer';

const Account = props => {
    const [emailInput, setEmailInput] = useState('');

    const updateEmail = () => {
        axios.put(`/auth/email/${props.user.fun_marketplace_user_id}`, {email: emailInput})
        .then(res => {props.getUser(res.data)})
        .catch(err => console.log(err))
    }

    return (
        <section>

                <Header />

            <section className='account-main'>

                <p className='p-username'>Current email: </p>
                <div className='current-username'>{props.user.email}</div>

            <input type='text' placeholder='New email' className='update-username-input'
                value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

            <button onClick={() => updateEmail()} className='update-username-button'>Update</button>

            </section>

                <Footer />

            </section>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, {getUser})(Account);