<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Migrate Command
Artisan::command('migrate:fresh', function () {
    $this->comment('migrate:fresh is not allowed.');
})->describe('Override default command in production.');
Artisan::command('migrate:refresh', function () {
    $this->comment('migrate:refresh is not allowed.');
})->describe('Override default command in production.');
Artisan::command('migrate:reset', function () {
    $this->comment('migrate:reset is not allowed.');
})->describe('Override default command in production.');
Artisan::command('migrate:rollback', function () {
    $this->comment('migrate:rollback is not allowed.');
})->describe('Override default command in production.');
