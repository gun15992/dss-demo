<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProInvBuilding extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_building';
    protected $primaryKey = 'building_code';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvFloors()
    {
        return $this->hasMany(ProInvFloor::class, 'building_code');
    }

    public function proInvMoveHistories()
    {
        return $this->hasMany(ProInvMoveHistory::class, 'id');
    }
}
