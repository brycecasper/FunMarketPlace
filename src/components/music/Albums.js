import React, {Component} from 'react';
import axios from 'axios';

class Albums extends Component {
    constructor(){
        super();
        this.state = {
            albums: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get('/api/albums')
        .then(res => this.setState({albums: res.data}))
        .catch(err => console.log(err))
    }

    render(){
        const mappedAlbums = this.state.albums.map((albums, index) => {
            return(
                <div key={index}>
                    {albums}
                </div>
            )
        })

        return(
            <section>

                <div>
                    {mappedAlbums}
                </div>

            </section>
        );
    };
}

export default Albums;