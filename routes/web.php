<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Projects
Route::resource('projects', ProjectController::class)
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->middleware(['auth']);

Route::get('/project/new', function () {
    return Inertia::render('Principal/Project/New');
})->middleware(['auth'])->name('new_project');

//Requirements
Route::controller(RequirementController::class)->group(function (){
    Route::get('/requirements/{id}', 'index')->name('requirements_index');
    Route::get('/requirements/new/{id}', 'create')->name('requirements_new');
    Route::post('/requirements/store', 'store')->name('requirements_store');
    Route::post('/requirements/update/{id}', 'update')->name('requirements_update');
    Route::delete('/requirements/destroy/{id}', 'destroy')->name('requirements_destroy');
})->middleware(['auth']);

//actors
Route::controller(ActorController::class)->group(function (){
    Route::get('/actors/{id}', 'index')->name('actors_index');
    Route::get('/actors/new/{id}', 'create')->name('actors_new');
    Route::post('/actors/store', 'store')->name('actors_store');
    Route::post('/actors/update/{id}', 'update')->name('actors_update');
    Route::delete('/actors/destroy/{id}', 'destroy')->name('actors_destroy');
})->middleware(['auth']);

//entities
Route::controller(EntityController::class)->group(function (){
    Route::get('/entity/{id}', 'index')->name('entities_index');
    Route::get('/entities/new/{id}', 'create')->name('entities_new');
    Route::post('/entities/store', 'store')->name('entities_store');
    Route::post('/entities/update/{id}', 'update')->name('entities_update');
    Route::delete('/entities/destroy/{id}', 'destroy')->name('entities_destroy');
})->middleware(['auth']);

//processes
Route::controller(ProcessController::class)->group(function (){
    Route::get('/process/{id}', 'index')->name('processes_index');
    Route::get('/processes/new/{id}', 'create')->name('processes_new');
    Route::post('/processes/store', 'store')->name('processes_store');
    Route::post('/processes/update/{id}', 'update')->name('processes_update');
    Route::delete('/processes/destroy/{id}', 'destroy')->name('processes_destroy');
})->middleware(['auth']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
