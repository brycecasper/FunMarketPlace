import React, {Component} from 'react';
import Menu from './Menu';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: false,
            search: '',
            searchResults: []
        }
    }

    displayMenu = () => {
        this.setState({
            menu: true
        });
    }

    hideMenu = () => {
        this.setState({
            menu: false
        });
    }

    logout = () => {
        axios.post('/auth/logout')
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    setSearch = e => {
        this.setState({search: e.target.value});
    }

    searchFn = () => {
        const {search} = this.state
        axios.get('/api/search', {search})
        .then(res => {this.setState({searchResults: res.data})})
        .catch(err => console.log(err))
    }

    render(){
        const {menu} = this.state;

        return(
            <section className='header-main'>
                <menu>

                {
                    menu
                    ?
                        <Menu
                            hideMenu={this.hideMenu}
                        />
                    :
                    <button className='menu-button' onClick={this.displayMenu}>
                        <div className='bar'></div>
                        <div className='bar'></div>
                        <div className='bar'></div>
                    </button>
                }

                </menu>

                <input className='search-bar' placeholder='search' 
                    value={this.state.search} onChange={this.setSearch} onKeyPress={() => this.searchFn()}
                />

                <div>{this.state.searchResults}</div>

                <div className='header-options'>
                    <span> <Link to='/homemain' className='link'> Home </Link> </span>
                    <span> <Link to='/cart' className='link'> Cart </Link> </span>
                    <span> <Link to='/account' className='link'> Account </Link> </span>
                    <span> <Link to='/' className='link' onClick={this.logout}> Logout </Link> </span>
                </div>
            </section>
        );
    };
}

export default withRouter(Header);