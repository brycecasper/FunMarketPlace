import React, {Component} from 'react';
import Menu from './Menu';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu: false,
            searching: false,
            search: '',
            searchResults: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.searchFn()
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
        this.setState({
            search: e.target.value,
            searching: true
        });
    }

    searchFn = () => {
        const {search} = this.state;
        if(!search.length){
            this.setState({
                searchResults: [],
                searching: false
            })
        } else {
            axios.post('/api/look', {search})
            .then(res => {
                this.setState({searchResults: res.data})
            })
            .catch(err => console.log(err))
        }
    }

    render(){
        const {menu, searchResults, searching} = this.state;
        const mappedSearchResults = searchResults.map((products, i) => {
            return(
                <section key={i}>
                    <img src={products.img} alt={products.name} className='search-img' />
                    <h1 className='search-name'>{products.name}</h1>
                </section>
            )
        });

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

                <div className='flex-search'>
                <input className='search-bar' placeholder='search' 
                    value={this.state.search} onChange={this.setSearch} onKeyPress={() => this.componentDidMount()}
                />

                <div>
                {
                    searching
                    ?
                    <div className='search-results'>
                    {mappedSearchResults}
                    </div>
                    :
                    null
                }
                </div>
                </div>

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