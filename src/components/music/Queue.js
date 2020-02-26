import React, {Component} from 'react';
import axios from 'axios';

class Queue extends Component {
    constructor(){
        super();
        this.state = {
            songQueue: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get('/api/queue')
        .then(res => this.setState({songQueue: res.data}))
        .catch(err => console.log(err))
    }

    render(){
        const mappedQueue = this.state.songQueue.map((music_queue, index) => {
            return(
                <div key={index}>
                    {music_queue}
                </div>
            )
        })

        return(
            <section>

                <div>
                    {mappedQueue}
                </div>

            </section>
        );
    };
}

export default Queue;