<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SrcProInvCheckHistory extends Model
{
    use HasFactory;

    protected $table = 'src_pro_inv_check_history';
    protected $primaryKey = 'check_id';
    protected $fillable = ['id', 'inv_id', 'inv_sn', 'inv_name', 'fiscal_year', 'check_flg', 'dispense_flg', 'building_code', 'building_name', 'floor_code', 'floor_no', 'room_id', 'room_name', 'remarks', 'owner_emp_id', 'division_id', 'sub_division_id', 'created_by', 'updated_by', 'active_flg'];
    // protected $guarded = [];
    public $sequences = 'src_pro_inv_check_history_seq';

    public function proInvInfo()
    {
        return $this->belongsTo(proInvInfo::class);
    }

    public function glbDivOrganization()
    {
        return $this->belongsTo(GlbOrganization::class, 'division_id', 'org_id');
    }

    public function glbSubDivOrganization()
    {
        return $this->belongsTo(GlbOrganization::class, 'sub_division_id', 'org_id');
    }

    public function hrEmployee()
    {
        return $this->belongsTo(HrEmployee::class, 'owner_emp_id', 'emp_id');
    }
}
