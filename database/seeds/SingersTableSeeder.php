<?php

use Illuminate\Database\Seeder;

class SingersTableSeeder extends Seeder
{
    private $data = [];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i=0; $i < 50; $i++) {
            $data[] = [
                'name' => $faker->userName.' '.$faker->lastName,
            ];
        }

        foreach ($data as $singer) {
            \App\Singer::insert($singer);
        }
    }
}
