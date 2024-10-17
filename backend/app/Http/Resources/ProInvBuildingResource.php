<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvBuildingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'building_id' => $this->id,
            'building_code' => $this->building_code,
            'building_name' => $this->building_name,
            'floors' => ProInvFloorResource::collection($this->proInvFloors)
        ];
    }
}
