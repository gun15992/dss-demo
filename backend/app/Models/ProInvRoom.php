<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProInvRoom extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_room';
    protected $primaryKey = 'id';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvFloor()
    {
        return $this->belongsTo(ProInvFloor::class);
    }
}
