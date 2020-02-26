import React, {Component} from 'react';
import Songs from './Songs';
import Albums from './Albums';
import Artists from './Artists';
import HomeMusic from './HomeMusic';
import Playslists from './Playlists';
import Queue from './Queue';
import Header from '../main/Header';
import Footer from '../main/Footer';

class Music extends Component {
    constructor(){
        super();
        this.state = {
            home: true,
            songs: false,
            albums: false,
            artists: false,
            playlists: false
        }
    }

    showHome = () => {
        this.setState({
            home: true,
            songs: false,
            albums: false,
            artists: false,
            playlists: false
        });
    }

    showSongs = () => {
        this.setState({
            songs: true,
            home: false,
            albums: false,
            artists: false,
            playlists: false
        });
    }

    showAlbums = () => {
        this.setState({
            albums: true,
            home: false,
            songs: false,
            artists: false,
            playlists: false
        });
    }

    showArtists = () => {
        this.setState({
            artists: true,
            home: false,
            songs: false,
            albums: false,
            playlists: false
        });
    }

    showPlaylists = () => {
        this.setState({
            playlists: true,
            home: false,
            songs: false,
            albums: false,
            artists: false
        });
    }

    render(){
        return(
            <section>

                <Header />

            <section className='music-main'>

                <div className='music-options'>
                    <span className='music-options-links' onClick={this.showHome}>Home</span>
                    <span className='music-options-links' onClick={this.showSongs}>Songs</span>
                    <span className='music-options-links' onClick={this.showAlbums}>Albums</span>
                    <span className='music-options-links' onClick={this.showArtists}>Artists</span>
                </div>

                <div className='music-scroll'>
                    {
                        this.state.home
                        ?
                        <div className='music-home-main'>
                            <HomeMusic />
                        </div>
                        :
                        <></>
                    }
                    {
                        this.state.songs
                        ?
                        <div className='songs-main'>
                            <Songs />
                        </div>
                        :
                        <></>
                    }
                    {
                        this.state.albums
                        ?
                        <div className='albums-main'>
                            <Albums />
                        </div>
                        :
                        <></>
                    }
                    {
                        this.state.artists
                        ?
                        <div className='artists-main'>
                            <Artists />
                        </div>
                        :
                        <></>
                    }
                    {
                        this.state.playlists
                        ?
                        <div className='playlists-main'>
                            <Playslists />
                        </div>
                        :
                        <></>
                    }
                </div>

                <div className='music-queue'>
                    <p className='queue-word'>Queue:</p>
                    <Queue />
                </div>
                    
            </section>

                    <Footer />

            </section>
        );
    };
}

export default Music;