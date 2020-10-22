<?php

use Illuminate\Database\Seeder;

class SingersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Singer::class, 20)->create()->each(function ($singer){
           $singer->songs()->save(factory(App\Song::class,140)->make());
        });
    }
}
