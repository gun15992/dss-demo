<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SrcProInvCheckHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'check_id' => $this->check_id,
            'inv_id' => $this->inv_id,
            'inv_sn' => $this->inv_sn,
            'inv_name' => $this->inv_name,
            'fiscal_year' => $this->fiscal_year,
            'building_code' => $this->building_code,
            'building_name' => $this->building_name,
            'floor_code' => $this->floor_code,
            'floor_no' => $this->floor_no,
            'room_id' => $this->room_id,
            'room_name' => $this->room_name,
            'check_location' => $this->building_name . ' ชั้น ' . $this->floor_no . ' ' . $this->room_name,
            'owner_emp_id' => $this->owner_emp_id,
            'division_id' => $this->division_id,
            'sub_division_id' => $this->sub_division_id,
            'check_flg' => $this->check_flg,
            'dispense_flg' => $this->dispense_flg,
            'active_flg' => $this->active_flg,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_by' => $this->updated_by,
            'updated_at' => $this->updated_at,
            'employee' => new HrEmployeeResource($this->hrEmployee),
            'division' => new GlbOrganizationResource($this->glbDivOrganization),
            'sub_division' => new GlbOrganizationResource($this->glbSubDivOrganization)
        ];
    }
}
