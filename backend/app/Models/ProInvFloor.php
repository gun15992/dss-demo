<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProInvFloor extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_floor';
    protected $primaryKey = 'floor_code';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvBuilding()
    {
        return $this->belongsTo(ProInvBuilding::class);
    }

    public function proInvRooms()
    {
        return $this->hasMany(ProInvRoom::class, 'floor_code');
    }
}
