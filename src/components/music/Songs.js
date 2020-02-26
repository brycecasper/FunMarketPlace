import React, {Component} from 'react';
import axios from 'axios';

class Songs extends Component {
    constructor(){
        super();
        this.state = {
            songs: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get('/api/songs')
        .then(res => this.setState({songs: res.data}))
        .catch(err => console.log(err))
    }

    render(){
        const mappedSongs = this.state.songs.map((songs, index) => {
            return(
                <div key={index}>
                    {songs}
                </div>
            )
        })

        return(
            <section>
                
                <div>
                    {mappedSongs}
                </div>

            </section>
        );
    };
}

export default Songs;