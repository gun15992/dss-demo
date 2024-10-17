<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ReportController extends Controller
{
    /**
     * @OA\Tag(
     *     name="Report",
     * )
     *
     * @OA\Get(
     *     path="/api/getReport",
     *     summary="GET: All Inventories Report Data",
     *     tags={"Report"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function exportData()
    {
        $response = Http::get('http://backoffice-api.dss.local/api/getOrganization');

        if ($response->successful()) {
            $organizations = $response->json();
        } else {
            return response()->json([
                'error' => 'ไม่สามารถดึงข้อมูลหน่วยงานจาก API ได้'
            ], 500);
        }

        $getOrganizationNames = function($divisionId, $subDivisionId, $organizations) {
            foreach ($organizations['data'] as $organization) {
                if (isset($organization['division_id']) && $organization['division_id'] == $divisionId) {
                    $divisionName = $organization['division_name'] ?? null;
                    if (isset($organization['sub']) && is_array($organization['sub'])) {
                        foreach ($organization['sub'] as $subDivision) {
                            if (isset($subDivision['sub_division_id']) && $subDivision['sub_division_id'] == $subDivisionId) {
                                return [
                                    'division_name' => $divisionName,
                                    'sub_division_name' => $subDivision['sub_division_name'] ?? null,
                                ];
                            }
                        }
                    }
                    return [
                        'division_name' => $divisionName,
                        'sub_division_name' => null,
                    ];
                }
            }

            return [
                'division_name' => null,
                'sub_division_name' => null,
            ];
        };

        $data = DB::table('src_pro_inv_check_history as h')
            ->select(
                'h.inv_id',
                'p.id as pro_inv_id',
                'h.fiscal_year',
                'h.dispense_flg',
                'h.inv_name',
                'h.inv_sn',
                'e.emp_name',
                'e.dss_phone',
                'b.building_name',
                'f.floor_no',
                'r.room_name',
                'p.pfix_inv_no',
                'h.division_id',
                'h.sub_division_id',
                'h.owner_emp_id'
            )
            ->join('hr_employee as e', 'h.owner_emp_id', '=', 'e.emp_id')
            ->join('pro_inv_info as p', 'h.inv_id', '=', 'p.id')
            ->join('pro_inv_building as b', 'h.building_code', '=', 'b.building_code')
            ->join('pro_inv_floor as f', 'h.floor_code', '=', 'f.floor_code')
            ->join('pro_inv_room as r', 'h.room_id', '=', 'r.id')
            ->get();

            $data = $data->map(function($item) use ($organizations, $getOrganizationNames) {
            $orgNames = $getOrganizationNames($item->division_id, $item->sub_division_id, $organizations);

            $item->division_name = $orgNames['division_name'];
            $item->sub_division_name = $orgNames['sub_division_name'];

            return $item;
        });

        $result = $data->map(function($item) {
            return (object) [
                'inv_id' => $item->inv_id,
                'fiscal_year' => $item->fiscal_year,
                'dispense_flg' => $item->dispense_flg,
                'inv_name' => $item->inv_name,
                'inv_sn' => $item->inv_sn,
                'owner_emp_id' => $item->owner_emp_id,
                'emp_name' => $item->emp_name,
                'dss_phone' => $item->dss_phone,
                'building_name' => $item->building_name,
                'floor_no' => $item->floor_no,
                'room_name' => $item->room_name,
                'pfix_inv_no' => $item->pfix_inv_no,
                'division_id' => $item->division_id,
                'division_name' => $item->division_name,
                'sub_division_id' => $item->sub_division_id,
                'sub_division_name' => $item->sub_division_name
            ];
        });

        return response()->json($result);
    }
}
