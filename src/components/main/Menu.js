import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {


    render(){  
        const {hideMenu} = this.props;

        return(
            <section className='menu-display'>

                <button className='hide-menu-button' onClick={hideMenu}>
                    <div className='bar' id='bar-one'></div>
                    <div className='bar' id='bar-two'></div>
                    <div className='bar' id='bar-three'></div>
                </button>

                <div className='menu-content'>
                    <h1 className='menu-content-placeholder'>Shop by:</h1>
                    <h1 className='menu-content-links'> 
                        <Link to='/electronics' className='link'> Electronics </Link> 
                    </h1>
                    <h1 className='menu-content-links'> 
                        <Link to='/clothing' className='link'> Clothing </Link> 
                    </h1>
                    <h1 className='menu-content-links'> 
                        <Link to='/homeshop' className='link'> Home </Link> 
                    </h1>
                    <h1 className='menu-content-links'> 
                        <Link to='/outdoor' className='link'> Outdoor </Link> 
                    </h1>
                </div>

            </section>
        );
    };
}

export default Menu;