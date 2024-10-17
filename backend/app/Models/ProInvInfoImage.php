<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProInvInfoImage extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_info_images';
    protected $primaryKey = 'image_id';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvInfo()
    {
        return $this->belongsTo(ProInvInfo::class);
    }
}
