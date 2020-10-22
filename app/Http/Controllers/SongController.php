<?php


namespace App\Http\Controllers;

use App\Genre;
use App\Singer;
use App\Song;

class SongController extends Controller
{
    public function read()
    {
        return view('welcome');
    }

    public function getGenres()
    {
        $genres = Genre::all();

        return json_encode($genres);
    }
    public function getSingers()
    {
        $singers = Singer::all();

        return json_encode($singers);
    }

    public function create()
    {
        $songs = Song::with('singer')->with('genre')->get();
        $res[] = [];
        foreach ($songs as $song) {
            $data = [];
            $data['id'] = $song->id;
            $data['title'] = $song->title;
            $data['year'] = $song->year;
            $data['genre'] = $song->genre->name;
            $data['singer'] = $song->singer->name;
            array_push($res, $data);
        }
        return $res;
    }
}
