<?php

namespace App\Http\Resources;

use App\Models\ProInvMoveHistory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvMoveHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $buildingName = $this->proInvBuilding ? $this->proInvBuilding->building_name : 'ไม่ระบุ';
        $buildingCode = $this->proInvBuilding ? $this->proInvBuilding->building_code : 'ไม่ระบุ';

        return [
            'id' => $this->id,
            'inv_id' => $this->inv_id,
            'detail' => $this->detail,
            'floor' => $this->floor,
            'room_number' => $this->room_number,
            'building_id' => $this->building_id,
            'building_code' => $buildingCode,
            'building_name' => $buildingName,
            'location' => $buildingName . ' ชั้น ' . $this->floor . ' ' . $this->room_number,
            'owner_emp_id' => $this->owner_emp_id,
            'sub_division_id' => $this->sub_division_id,
            'move_date' => $this->move_date,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_by' => $this->updated_by,
            'updated_at' => $this->updated_at,
            'active_flg' => $this->active_flg,
            'employee' => new HrEmployeeResource($this->hrEmployee),
            'sub_division' => new GlbOrganizationResource($this->glbOrganization),
        ];
    }
}
