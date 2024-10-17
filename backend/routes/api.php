<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ReportController;
use App\Http\Controllers\HrEmployeeController;
use App\Http\Controllers\ProInvInfoController;
use App\Http\Controllers\ProInvLocationController;
use App\Http\Controllers\ProInvMoveHistoryController;
use App\Http\Controllers\SrcProInvCheckHistoryController;

Route::controller(ProInvInfoController::class)->name('Inventory.')->group(function() {
    Route::get('/getAllInventories', 'allIndex')->name('All-Index');
    Route::get('/getAllInventories/{id}', 'allShow')->name('All-Show');
    Route::get('/getInventories', 'index')->name('Index');
    Route::get('/getInventories/{id}', 'show')->name('Show');
    Route::get('/getQrCodeInventories', 'qrcodeIndex')->name('QRCode-Index');
    Route::get('/getCountInventories', 'count')->name('Count');
    Route::put('/putInventories/{id}', 'update')->name('Update');
});

Route::controller(SrcProInvCheckHistoryController::class)->name('Check-History.')->group(function() {
    Route::get('/getAllCheckHistories', 'allIndex')->name('All-Index');
    Route::get('/getAllCheckHistories/{id}', 'allShow')->name('All-Show');
    Route::get('/getCheckHistories', 'index')->name('Index');
    Route::get('/getCheckHistories/{id}', 'show')->name('Show');
    Route::post('/postCheckHistories', 'store')->name('Store');
    Route::put('/putCheckHistories/{id}', 'update')->name('Update');
    Route::delete('/deleteCheckHistories/{id}', 'destroy')->name('Destroy');
});

Route::controller(ProInvMoveHistoryController::class)->name('Move-History.')->group(function() {
    Route::get('/getAllMoveHistories', 'allIndex')->name('All-Index');
    Route::get('/getAllMoveHistories/{id}', 'allShow')->name('All-Show');
    Route::get('/getMoveHistories', 'index')->name('Index');
    Route::get('/getMoveHistories/{id}', 'show')->name('Show');
    Route::post('/postMoveHistories', 'store')->name('Store');

});

Route::controller(ProInvLocationController::class)->name('Location.')->group(function() {
    Route::get('/getLocations', 'index')->name('Index');
});

Route::controller(ReportController::class)->name('Report.')->group(function() {
    Route::get('/getReport', 'exportData')->name('Export');
});
