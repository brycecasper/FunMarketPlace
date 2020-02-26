import React, {Component} from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import axios from 'axios';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {PUBLISHABLE_KEY} from './Stripe';
import {getUser} from '../../redux/userReducer';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: [], 
            totalPrice: 0
        }
    }

    componentDidMount(){
        this.getCart();
    }

    getCart = () => {
        axios.get(`/api/cart/${this.props.user.cart_id}`)
        .then(res => {
            this.setState({cart: res.data})
            this.getTotal()
        })
        .catch(err => console.log(err))
    }

    removeFromCart = order_products_id => {
        axios.delete(`/api/cart/${order_products_id}`)
        .then(res => this.setState({cart: res.data}))
        .catch(err => console.log(err))

        this.componentDidMount();
    }
 
    onToken = token => {
        const {totalPrice} = this.state
        axios.post('/api/payment', {token, totalPrice, cart_id: this.props.user.cart_id, fun_marketplace_user_id: this.props.user.fun_marketplace_user_id, email: this.props.user.email})
        .then(res => {
            window.alert('Payment successful')
            this.props.getUser(res.data)
            this.getCart();
        })
        .catch(err => console.log(err))
    }

    getTotal = () => {
        const {cart} = this.state
        const total = cart.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.price), 0)
        this.setState({totalPrice: total})
    }
    
    render(){
        const {cart, totalPrice} = this.state 
       
        const mappedCart = cart.map((products, i) => {
            return(
                <div key={i}>
                <div className='cart-card'>
                    <img src={products.img} alt={products.name} className='cart-img' />
                    <p className='cart-product-name'>{products.name}</p>
                    <p className='cart-product-price'>${products.price}</p>
                    <button className='remove-cart'
                        onClick={() => this.removeFromCart(products.order_products_id)}>Remove
                    </button>
                    <div className='cart-line'></div>
                </div>
                </div>
            )
        })
        return(
            <section>

                <Header />

            <section className='cart-main'>

            <p className='summary'>Summary:</p>

            <div className='display-cart'>
                {mappedCart}
            </div>

            <p className='total'> Total: ${totalPrice.toFixed(2)} </p>

        <StripeCheckout
          name='bankname'
          description='making a payment'
          stripeKey={PUBLISHABLE_KEY}
          token={this.onToken}
          amount={totalPrice*100}
          panelLabel="Submit Payment"
          allowRememberMe={true}
          billingAddress={false}
          zipCode={false}
        >
          <button className='checkout-button'>Checkout</button>
        </StripeCheckout>
            
            </section>

                <Footer />

            </section>
        );
    };

}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, {getUser})(Cart);