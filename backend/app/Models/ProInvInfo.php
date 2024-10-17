<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProInvInfo extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_info';
    // protected $primaryKey = '';
    protected $fillable = ['check_fiscal_year', 'dispense_flg'];
    // protected $guarded = [];
    public $sequences = 'pro_inv_info_seq';

    const CREATED_AT = 'create_date';
    const UPDATED_AT = 'last_update_date';

    public function glbOrganization()
    {
        return $this->belongsTo(GlbOrganization::class, 'org_org_id', 'org_id');
    }

    public function proInvInfoImages()
    {
        return $this->hasMany(ProInvInfoImage::class, 'pro_inv_info_id');
    }

    public function srcProInvCheckHistories()
    {
        return $this->hasMany(SrcProInvCheckHistory::class, 'inv_id');
    }

    public function proInvMoveHistories()
    {
        return $this->hasMany(ProInvMoveHistory::class, 'inv_id');
    }
}
