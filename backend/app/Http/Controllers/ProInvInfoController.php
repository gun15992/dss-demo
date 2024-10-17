<?php

namespace App\Http\Controllers;

use App\Models\ProInvInfo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ProInvInfoResource;
use App\Http\Resources\ProInvInfoCollection;
use App\Http\Resources\ProInvInfoCountResource;
use App\Http\Resources\ProInvQrCodeInfoCollection;
use App\Http\Resources\ProInvInfoOrgsCountResource;

class ProInvInfoController extends Controller
{
    /**
     * @OA\Tag(
     *     name="Inventories",
     * )
     *
     * @OA\Get(
     *     path="/api/getInventories",
     *     summary="GET: Inventories Data with Pagination",
     *     tags={"Inventories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function index(Request $request)
    {
        $query = ProInvInfo::query();

        $searchQuery = $request->input('search', '');
        $statusFilter = $request->input('status', []);
        $inventoryTypeFilter = $request->input('type', []);
        $orgFilter = $request->input('org', []);
        $itemsPerPage = $request->input('itemsPerPage', 10);

        if (!empty($searchQuery)) {
            $query->where(function($query) use ($searchQuery) {
                $query->where('inv_name', 'LIKE', "%{$searchQuery}%");
            });
        }

        if (is_array($inventoryTypeFilter) && !empty($inventoryTypeFilter)) {
            $query->whereIn('classify_inv_type', $inventoryTypeFilter);
        }

        if (is_array($orgFilter) && !empty($orgFilter)) {
            $query->whereIn('org_org_id', $orgFilter);
        }

        if (is_array($statusFilter) && !empty($statusFilter)) {
            $query->whereIn('dispense_flg', $statusFilter);
        }

        $proInvInfoPaginate = $query->paginate($itemsPerPage);

        return new ProInvInfoCollection($proInvInfoPaginate);
    }

    /**
     * @OA\Get(
     *     path="/api/getInventories/{id}",
     *     summary="GET: Inventories Data by ID",
     *     tags={"Inventories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Inventory ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function show($id)
    {
        $proInvInfoId = ProInvInfo::findOrFail($id);
        return new ProInvInfoResource($proInvInfoId);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllInventories",
     *     summary="GET: All Inventories Data",
     *     tags={"Inventories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function allIndex()
    {
        $allProInvInfo = ProInvInfo::all();
        return new ProInvInfoCollection($allProInvInfo);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllInventories/{id}",
     *     summary="GET: All Inventories Data by ID",
     *     tags={"Inventories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Inventory ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function allShow($id)
    {
        $proInvInfoId = ProInvInfo::findOrFail($id);
        return new ProInvInfoResource($proInvInfoId);
    }

    /**
     * @OA\Get(
     *     path="/api/getQrCodeInventories",
     *     summary="GET: QR Code Inventories Data",
     *     tags={"Inventories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function qrcodeIndex(Request $request)
    {
        $orgId = $request->input('org_id', []);
        $search = $request->input('search');
        $itemsPerPage = $request->input('itemsPerPage', 999999999);
        $page = $request->input('page', 1);

        $query = ProInvInfo::select(
            'pro_inv_info.id',
            'pro_inv_info.inv_no',
            'pro_inv_info.inv_name',
            DB::raw("pro_inv_info.pfix_inv_no || pro_inv_info.inv_no1 || '-' || pro_inv_info.inv_no2 || '-' || pro_inv_info.inv_no3 || '/' || pro_inv_info.inv_no4 || ' ' || pro_inv_info.fiscal_year AS inv_sn"),
            'pro_inv_info.dispense_flg',
            'pro_inv_info.inv_uom',
            'glb_organization.org_id',
            'glb_organization.org_name',
            'hr_employee.emp_name',
            'pro_inv_building.building_name',
            'pro_inv_move_history.floor',
            'pro_inv_move_history.room_number',
            DB::raw("pro_inv_building.building_name || ' ชั้น ' || pro_inv_move_history.floor || ' ห้อง ' || pro_inv_move_history.room_number AS location")
        );

        $subQuery = DB::table('pro_inv_move_history')
            ->select('inv_id', DB::raw('MAX(updated_at) as max_updated_at'))
            ->groupBy('inv_id');

            $query->join('glb_organization', 'pro_inv_info.org_org_id', '=', 'glb_organization.org_id')
                ->leftJoinSub($subQuery, 'latest_move_history', function($join) {
                    $join->on('pro_inv_info.id', '=', 'latest_move_history.inv_id');
                })
                ->leftJoin('pro_inv_move_history', function($join) {
                    $join->on('pro_inv_info.id', '=', 'pro_inv_move_history.inv_id')
                        ->on('pro_inv_move_history.updated_at', '=', 'latest_move_history.max_updated_at');
                })
            ->leftJoin('hr_employee','pro_inv_move_history.owner_emp_id', '=', 'hr_employee.emp_id')
            ->leftJoin('pro_inv_building','pro_inv_move_history.building_id', '=', 'pro_inv_building.id')
            ->whereIn('pro_inv_info.dispense_flg', ['N', 'F'])
            ->whereNotNull('pro_inv_info.org_org_id')
            ->distinct();

        if (is_array($orgId) && !empty($orgId)) {
            $query->where('pro_inv_info.org_org_id', $orgId);
        }

        if (!empty($search)) {
            $query->where(function($query) use ($search) {
                $query->where('pro_inv_info.inv_name', 'LIKE', "%{$search}%")
                    ->orWhere('pro_inv_info.inv_no', 'LIKE', "%{$search}%");
            });
        }

        $proInvInfoPaginate = $query->paginate($itemsPerPage, ['*'], 'page', $page);

        return response()->json($proInvInfoPaginate);
    }

    /**
     * @OA\Get(
     *     path="/api/getCountInventories",
     *     summary="GET: Count All Inventories Data",
     *     tags={"Inventories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function count()
    {
        return new ProInvInfoCountResource(null);
    }

    /**
     * @OA\Put(
     *     path="/api/putInventories/{id}",
     *     summary="PUT: Update Inventory Data by ID",
     *     tags={"Inventories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="check_fiscal_year", type="integer", example=2567),
     *             @OA\Property(property="dispense_flg", type="char", example="N")
     *         )
     *     ),
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="400", description="Bad Request"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="422", description="Unprocessable Content"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function update(Request $request, $id)
    {
        $proInvInfo = ProInvInfo::find($id);

        if (!$proInvInfo) {
            return response()->json([
                'message' => '404 Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'check_fiscal_year' => 'nullable|integer',
            'dispense_flg' => 'required|string|max:1'
        ]);

        $proInvInfo->update($validated);

        return response()->json($proInvInfo, Response::HTTP_OK);
    }
}
