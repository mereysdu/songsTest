import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './song-listing.css';

export default class Counter extends Component {
    constructor() {
        super();
        this.state = {
            songs: [],
            genres: [],
            singers: [],
            genre: '',
            singer:'',
            url: '/songs',
            currentPage: 1,
            songsPerPage: 20,
            totalPage: 140,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleChangeSinger = this.handleChangeSinger.bind(this);
    }


    componentDidMount() {
        axios.post(this.state.url)
            .then(response => {
                this.setState({songs: response.data});
            });
        axios.get('/genres')
            .then(response => {
                this.setState({genres: response.data});
            });
        axios.get('/singers')
            .then(response => {
                this.setState({singers: response.data});
            });
    };

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    handleChangeGenre(event) {
        this.setState({
            genre: event.target.value
        });
    };

    handleChangeSinger(event) {
        this.setState({
            singer: event.target.value
        });
    };

    getSingers() {
        axios.post(this.state.url)
            .then(response => {
                return response.data;
            });
    };


    render() {
        const {currentPage, songsPerPage} = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * songsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - songsPerPage;
        const currentSongs = this.state.songs.slice(indexOfFirstTodo, indexOfLastTodo);
        const genre = this.state.genre;
        const singer = this.state.singer;
        let filterData = [];
        if (genre === '') {
            filterData = currentSongs
        } else {
            filterData = this.state.songs.filter(function (result) {
                return result.genre === genre;
            });
            if(singer !== '')
            filterData = this.state.songs.filter(function (result) {
                return result.singer === singer;
            });
        }
        const renderTodos =
            <div className='tableList'>
                <Table striped bordered hover id="table-songs">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Title</th>
                        <th>Singer</th>
                        <th>Genre</th>
                        <th>Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filterData.map(song => {
                            return (
                                <tr>
                                    <td>{song.id}</td>
                                    <td>{song.title}</td>
                                    <td>{song.singer}</td>
                                    <td>{song.genre}</td>
                                    <td>{song.year}</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </Table>
                <div id="select-filter">
                    <p>By Genre</p>
                    <select onChange={this.handleChangeGenre}>
                        {this.state.genres.map(function (item, i) {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                    <p>By Singer</p>
                    <select onChange={this.handleChangeSinger}>
                        {this.state.singers.map(function (item, i) {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
            </div>

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.songs.length / songsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {renderTodos}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );

    }
}

ReactDOM.render(<Counter/>, document.getElementById('counter'));
