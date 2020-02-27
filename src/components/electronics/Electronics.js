import React, {Component} from 'react';
import axios from 'axios';
import Header from '../main/Header';
import Footer from '../main/Footer';
import {connect} from 'react-redux';

class Electronics extends Component {
    constructor(props){
        super(props);
        this.state = {
            electronics: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        axios.get('/api/electronics')
        .then(res => {this.setState({electronics: res.data})})
        .catch(err => console.log(err));
    }

    addToCart = (products_id, price) => {
        axios.post('/api/post-cart', {
                cart_id: this.props.user.cart_id,
                products_id, 
                price
        }).then(res => {window.alert('Item added to cart')})
        .catch(err => console.log(err))
    }

    render(){
        const mappedProducts = this.state.electronics.map((products, i) => {
            return(
                <div key={i}>
                <section className='product-card'>

                    <img src={products.img} alt={products.name} className='product-image' />

                <div className='flex-product-info'>
                    <div className='product-name'>
                    {products.name}
                    </div>

                    <div className='product-description'>
                    {products.description}
                    </div>

                    <div className='product-price'>
                    ${products.price}
                    </div>

                    <button className='add-cart-button' 
                        onClick={() => this.addToCart(products.products_id, products.price)}>
                    Add to cart
                    </button>
                </div>
                </section>
                
                <div className='product-line'></div>
                </div>
            )
        });

        return(
            <section>

                <Header />

            <section className='products-main'>

                <div className='display-products'>
                    {mappedProducts}
                </div>

            </section>

                <Footer />

            </section>
        );
    };
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps)(Electronics);