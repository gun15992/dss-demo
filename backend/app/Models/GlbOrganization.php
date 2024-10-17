<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GlbOrganization extends Model
{
    use HasFactory;

    protected $table = 'glb_organization';
    protected $primaryKey = 'org_id';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvInfos()
    {
        return $this->hasMany(ProInvInfo::class, 'org_org_id');
    }

    public function proInvMoveHistories()
    {
        return $this->hasMany(ProInvMoveHistory::class, 'sub_division_id');
    }

    public function srcProInvCheckHistories()
    {
        return $this->hasMany(SrcProInvCheckHistory::class, 'sub_division_id');
    }
}
