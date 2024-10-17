<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvInfoImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'image_id' => $this->image_id,
            'pro_inv_info_id' => $this->pro_inv_info_id,
            'image_name' => $this->image_name,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'image_url' => 'http://inventory.dss.local/storage/images/' . $this->pro_inv_info_id . '/' . $this->image_name
        ];
    }
}
