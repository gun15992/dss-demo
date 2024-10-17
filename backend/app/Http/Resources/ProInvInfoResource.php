<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'inv_id' => (string) $this->id,
            'inv_sn' => $this->pfix_inv_no . $this->inv_no1 . '-' . $this->inv_no2 . '-' . $this->inv_no3 . '/' . $this->inv_no4 . ' ' . $this->fiscal_year,
            'inv_sn_old' => $this->pfix_inv_no_old . $this->inv_no1 . '-' . $this->inv_no2 . '-' . $this->inv_no3 . '/' . $this->inv_no4 . ' ' . $this->fiscal_year,
            'inv_name' => $this->inv_name,
            'inv_name_eng' => $this->inv_name_eng,
            'pfix_inv_no' => $this->pfix_inv_no,
            'pfix_inv_no_old' => $this->pfix_inv_no_old,
            'inv_no1' => $this->inv_no1,
            'inv_no2' => $this->inv_no2,
            'inv_no3' => $this->inv_no3,
            'inv_no4' => $this->inv_no4,
            'fiscal_year' => $this->fiscal_year,
            'check_fiscal_year' => $this->check_fiscal_year,
            'inv_no' => $this->inv_no,
            'inv_no_old' => $this->inv_no_old,
            'reg_date' => $this->reg_date,
            'general_spec' => $this->general_spec,
            'prod_sn' => $this->prod_sn,
            'price' => $this->price,
            'remarks' => $this->remarks,
            'org_org_id' => $this->org_org_id,
            'created_by' => $this->create_by,
            'create_date' => $this->create_date,
            'last_updated_by' => $this->last_updated_by,
            'last_update_date' => $this->last_update_date,
            'gs_inv_subexpt_id' => $this->gs_inv_subexpt_id,
            'inv_uom' => $this->inv_uom,
            'prod_no' => $this->prod_no,
            'dispense_flg' => $this->dispense_flg,
            'expire_date' => $this->expire_date,
            'model' => $this->model,
            'spec_detail' => $this->spec_detail,
            'dispense_date' => $this->dispense_date,
            'band' => $this->band,
            'inv_detail' => $this->inv_detail,
            'ga_asset_info_id' => $this->ga_asset_info_id,
            'sub_remarks' => $this->sub_remarks,
            'inv_asset_flg' => $this->inv_asset_flg,
            'group_type_id' => $this->group_type_id,
            'classify_inv_type' => $this->classify_inv_type,
            'active_flg' => $this->active_flg,
            'car_number' => $this->car_number,
            'org' => new GlbOrganizationResource($this->glbOrganization),
            'images' => ProInvInfoImageResource::collection($this->proInvInfoImages),
            'move_histories' => ProInvMoveHistoryResource::collection($this->proInvMoveHistories->sortByDesc('id')),
            'check_histories' => SrcProInvCheckHistoryResource::collection($this->srcProInvCheckHistories->sortByDesc('fiscal_year')),
            'status' => '200 OK'
        ];
    }
}
