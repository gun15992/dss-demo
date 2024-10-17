<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrEmployee extends Model
{
    use HasFactory;

    protected $table = 'hr_employee';
    protected $primaryKey = 'emp_id';
    // protected $fillable = [];
    // protected $guarded = [];
    // public $sequences = '';

    public function proInvMoveHistories()
    {
        return $this->hasMany(ProInvMoveHistory::class, 'owner_emp_id');
    }

    public function srcProInvCheckHistories()
    {
        return $this->hasMany(SrcProInvCheckHistory::class, 'owner_emp_id');
    }
}
