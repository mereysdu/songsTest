<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    public $timestamps = false;
    public function singer()
    {
        return $this->belongsTo('App\Singer');
    }

    public function genre()
    {
        return $this->belongsTo('App\Genre');
    }
}
