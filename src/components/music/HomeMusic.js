import React, {Component} from 'react';
import axios from 'axios';

class HomeMusic extends Component {
    constructor(){
        super();
        this.state = {
            featured: [],
            discover: [],
            top: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        this.featuredFn();
        this.discoverFn();
        this.topFn();
    }

    featuredFn = () => {
        axios.get('/api/featured')
        .then(res => this.setState({featured: res.data}))
        .catch(err => console.log(err))
    }

    discoverFn = () => {
        axios.get('/api/discover')
        .then(res => this.setState({discover: res.data}))
        .catch(err => console.log(err))
    }

    topFn = () => {
        axios.get('/api/top')
        .then(res => this.setState({top: res.data}))
        .catch(err => console.log(err))
    }

    render(){
        const mappedFeatured = this.state.featured.map((featured, index) => {
            return(
                <div key={index} className='flex-music-info'>
                    <img src={featured.img} alt={featured.song} className='album-img' />
                    <div className='song-title'>{featured.song}</div>
                    <div className='artist-title'>{featured.artist}</div>
                    <div className='album-title'>{featured.album}</div>
                </div>
            )
        });
        const mappedDiscover = this.state.discover.map((discover, index) => {
            return(
                <div key={index} className='flex-music-info'>
                    <img src={discover.img} alt={discover.song} className='album-img' />
                    <div>{discover.song}</div>
                    <div>{discover.artist}</div>
                    <div>{discover.album}</div>
                </div>
            )
        });
        const mappedTop = this.state.top.map((top, index) => {
            return(
                <div key={index} className='flex-music-info'>
                    <img src={top.img} alt={top.song} className='album-img' />
                    <div>{top.song}</div>
                    <div>{top.artist}</div>
                    <div>{top.album}</div>
                </div>
            )
        });

        return(
            <section className='home-music-display'>

                <p className='music-word'>Featured</p>
                <div className='mapped-display'>
                    {mappedFeatured}
                </div>

                <p className='music-word'>Discover</p>
                <div className='mapped-display'>
                    {mappedDiscover}
                </div>

                <p className='music-word'>Top Charts</p>
                <div className='mapped-display'>
                    {mappedTop}
                </div>

            </section>
        );
    };
}

export default HomeMusic;