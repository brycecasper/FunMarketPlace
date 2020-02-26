import React, {Component} from 'react';
import axios from 'axios';

class Artists extends Component {
    constructor(){
        super();
        this.state = {
            artists: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get('/api/artists')
        .then(res => this.setState({artists: res.data}))
        .catch(err => console.log(err))
    }

    render(){
        const mappedArtists = this.state.artists.map((artists, index) => {
            return(
                <div key={index}>
                    {artists}
                </div>
            )
        })

        return(
            <section>

                <div>
                    {mappedArtists}
                </div>

            </section>
        );
    };
}

export default Artists;