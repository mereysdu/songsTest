<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    public $timestamps = false;
    public function songs()
    {
        return $this->hasMany('App\Song');
    }
}
