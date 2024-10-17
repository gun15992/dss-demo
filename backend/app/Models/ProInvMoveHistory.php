<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProInvMoveHistory extends Model
{
    use HasFactory;

    protected $table = 'pro_inv_move_history';
    protected $primaryKey = 'id';
    protected $fillable = ['inv_id', 'detail', 'floor', 'room_number', 'building_id', 'move_date', 'sub_division_id', 'owner_emp_id', 'created_by', 'created_at', 'updated_by', 'updated_at', 'active_flg'];
    // protected $guarded = [];
    public $sequences = 'pro_inv_move_history_seq';

    public function proInvInfo()
    {
        return $this->belongsTo(proInvInfo::class);
    }

    public function glbOrganization()
    {
        return $this->belongsTo(GlbOrganization::class, 'sub_division_id', 'org_id');
    }

    public function proInvBuilding()
    {
        return $this->belongsTo(ProInvBuilding::class, 'building_id', 'id');
    }

    public function hrEmployee()
    {
        return $this->belongsTo(HrEmployee::class, 'owner_emp_id', 'emp_id');
    }
}
