<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SongController extends Controller
{
    public function songs(){
        $faker = \Faker\Factory::create();

        echo $faker->firstName.' '.$faker->lastName;
    }
}
