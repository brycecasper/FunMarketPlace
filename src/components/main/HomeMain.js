import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class HomeMain extends Component {

    render(){
        return(
            <section>

                <Header />

            <section className='sidescroll-main'>

                <Link to='/electronics' className='link-sidescroll'>
                <div className='scroll-content'>
                    <div>Electronics</div>
                    <img className='images-main' src='https://images.pexels.com/photos/705164/computer-laptop-work-place-camera-705164.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='electronics'></img>
                </div>
                </Link>

                <Link to='/clothing' className='link-sidescroll'>
                <div className='scroll-content'>   
                    <div>Clothing</div>
                    <img className='images-main' src='https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='clothing'></img>
                </div>
                </Link>

                <Link to='/homeshop' className='link-sidescroll'>
                <div className='scroll-content'>
                    <div>Home</div>
                    <img className='images-main' src='https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='home'></img>
                </div>
                </Link>

                <Link to='/outdoor' className='link-sidescroll'>
                <div className='scroll-content'>
                    <div>Outdoor</div>
                    <img className='images-main' src='https://images.pexels.com/photos/547050/pexels-photo-547050.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='outdoor'></img>
                </div>
                </Link>

                <div className='scroll-end'/>

            </section>

                <Footer />

            </section>
        );
    };
}

export default HomeMain;