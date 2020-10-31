<?php

use Illuminate\Support\Facades\Route;

Route::post('file', 'Common\UploadController@upload');