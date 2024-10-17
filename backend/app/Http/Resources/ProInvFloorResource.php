<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvFloorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'floor_code' => $this->floor_code,
            'floor_no' => $this->floor_no,
            'rooms' => ProInvRoomResource::collection($this->proInvRooms)
        ];
    }
}
