<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\SrcProInvCheckHistory;
use App\Http\Resources\SrcProInvCheckHistoryResource;
use App\Http\Resources\SrcProInvCheckHistoryCollection;

class SrcProInvCheckHistoryController extends Controller
{
    /**
     * @OA\Tag(
     *     name="Check Histories",
     * )
     *
     * @OA\Get(
     *     path="/api/getCheckHistories",
     *     summary="GET: Check Inventories Histories Data with Pagination",
     *     tags={"Check Histories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function index(Request $request){
        $query = SrcProInvCheckHistory::query();
        $searchQuery = $request->input('search', '');
        $statusFilter = $request->input('status', []);
        $orgFilter = $request->input('org', []);
        $startYear = $request->input('startYear', null);
        $endYear = $request->input('endYear', null);
        $itemsPerPage = $request->input('itemsPerPage', 10);

        if (!empty($searchQuery)) {
            $query->where(function($query) use ($searchQuery) {
                $query->where('inv_name', 'LIKE', "%{$searchQuery}%")
                    ->orWhere('building_name', 'LIKE', "%{$searchQuery}%")
                    ->orWhere('floor_no', 'LIKE', "%{$searchQuery}%")
                    ->orWhere('room_name', 'LIKE', "%{$searchQuery}%");
            });
        }

        if (is_array($orgFilter) && !empty($orgFilter)) {
            $query->whereIn('division_id', $orgFilter);
        }

        if (is_array($statusFilter) && !empty($statusFilter)) {
            $query->whereIn('dispense_flg', $statusFilter);
        }

        if ($startYear && $endYear) {
            $query->whereBetween('fiscal_year', [$startYear, $endYear]);
        } elseif ($startYear) {
            $query->where('fiscal_year', '=', $startYear);
        } elseif ($endYear) {
            $query->where('fiscal_year', '=', $endYear);
        }

        $srcProInvCheckHistoryPaginate = $query->paginate($itemsPerPage);

        return new SrcProInvCheckHistoryCollection($srcProInvCheckHistoryPaginate);
    }

    /**
     * @OA\Get(
     *     path="/api/getCheckHistories/{id}",
     *     summary="GET: Check Inventories Histories Data by ID",
     *     tags={"Check Histories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Check Inventory History ID",
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
        $srcProInvCheckHistoryId = SrcProInvCheckHistory::findOrFail($id);
        return new SrcProInvCheckHistoryResource($srcProInvCheckHistoryId);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllCheckHistories",
     *     summary="GET: All Check Inventories Histories Data",
     *     tags={"Check Histories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function allIndex()
    {
        $allSrcProInvCheckHistory = SrcProInvCheckHistory::all();
        return new SrcProInvCheckHistoryCollection($allSrcProInvCheckHistory);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllCheckHistories/{id}",
     *     summary="GET: All Check Inventories Histories Data by ID",
     *     tags={"Check Histories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Check Inventory History ID",
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
        $srcProInvCheckHistoryId = SrcProInvCheckHistory::findOrFail($id);
        return new SrcProInvCheckHistoryResource($srcProInvCheckHistoryId);
    }

    /**
     * @OA\Post(
     *     path="/api/postCheckHistories",
     *     summary="POST: Create Check Inventory History Data",
     *     tags={"Check Histories"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="inv_id", type="number", example=108381),
     *             @OA\Property(property="inv_sn", type="string", example="วศ.คอ.7110-002-0001/16 2563"),
     *             @OA\Property(property="inv_name", type="string", example="โต๊ะสำหรับวางคอมพิวเตอร์"),
     *             @OA\Property(property="fiscal_year", type="number", example=2567),
     *             @OA\Property(property="dispense_flg", type="char", example="N"),
     *             @OA\Property(property="building_code", type="number", example=670300),
     *             @OA\Property(property="building_name", type="string", example="อาคารห้องปฏิบัติการเฉพาะทาง (SAL)"),
     *             @OA\Property(property="floor_code", type="number", example=670301),
     *             @OA\Property(property="floor_no", type="number", example=1),
     *             @OA\Property(property="room_id", type="number", example=262),
     *             @OA\Property(property="room_name", type="string", example="พด.สล."),
     *             @OA\Property(property="division_id", type="number", example=1796),
     *             @OA\Property(property="sub_division_id", type="number", example=1801),
     *             @OA\Property(property="owner_emp_id", type="number", example=15404),
     *             @OA\Property(property="remarks", type="string", example="ทดสอบ"),
     *             @OA\Property(property="created_by", type="number", example=111)
     *         )
     *     ),
     *     @OA\Response(response="201", description="Created"),
     *     @OA\Response(response="400", description="Bad Request"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="409", description="Conflict"),
     *     @OA\Response(response="422", description="Unprocessable Content"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'inv_id' => 'required|integer',
            'inv_sn' => 'required|string',
            'inv_name' => 'required|string',
            'fiscal_year' => 'required|integer',
            'dispense_flg' => 'required|string|max:1',
            'building_code' => 'required|integer',
            'building_name' => 'required|string',
            'floor_code' => 'required|integer',
            'floor_no' => 'required|integer',
            'room_id' => 'nullable|integer',
            'room_name' => 'nullable|string',
            'division_id' => 'required|integer',
            'sub_division_id' => 'nullable|integer',
            'owner_emp_id' => 'required|integer',
            'remarks' => 'nullable|string',
            // 'created_by' => 'nullable|integer',
        ]);

        $checkHistory = SrcProInvCheckHistory::create($validated);

        return response()->json($checkHistory, Response::HTTP_CREATED);
    }

    /**
     * @OA\Put(
     *     path="/api/putCheckHistories/{id}",
     *     summary="PUT: Update Check Inventory History Data by ID",
     *     tags={"Check Histories"},
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
     *             @OA\Property(property="inv_id", type="number", example=108381),
     *             @OA\Property(property="inv_sn", type="string", example="วศ.คอ.7110-002-0001/16 2563"),
     *             @OA\Property(property="inv_name", type="string", example="โต๊ะสำหรับวางคอมพิวเตอร์"),
     *             @OA\Property(property="fiscal_year", type="number", example=2567),
     *             @OA\Property(property="dispense_flg", type="char", example="N"),
     *             @OA\Property(property="building_code", type="number", example=670300),
     *             @OA\Property(property="building_name", type="string", example="อาคารห้องปฏิบัติการเฉพาะทาง (SAL)"),
     *             @OA\Property(property="floor_code", type="number", example=670301),
     *             @OA\Property(property="floor_no", type="number", example=1),
     *             @OA\Property(property="room_id", type="number", example=262),
     *             @OA\Property(property="room_name", type="string", example="ห้อง พด.สล."),
     *             @OA\Property(property="division_id", type="number", example=1796),
     *             @OA\Property(property="sub_division_id", type="number", example=1801),
     *             @OA\Property(property="owner_emp_id", type="number", example=15404),
     *             @OA\Property(property="remarks", type="string", example="ทดสอบ"),
     *             @OA\Property(property="created_by", type="number", example=111)
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
        $checkHistory = SrcProInvCheckHistory::find($id);

        if (!$checkHistory) {
            return response()->json([
                'message' => '404 Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'inv_id' => 'required|integer',
            'inv_sn' => 'required|string',
            'inv_name' => 'required|string',
            'fiscal_year' => 'required|integer',
            'dispense_flg' => 'required|string|max:1',
            'building_code' => 'required|integer',
            'building_name' => 'required|string',
            'floor_code' => 'required|integer',
            'floor_no' => 'required|integer',
            'room_id' => 'nullable|integer',
            'room_name' => 'nullable|string',
            'division_id' => 'required|integer',
            'sub_division_id' => 'nullable|integer',
            'owner_emp_id' => 'required|integer',
            'remarks' => 'nullable|string',
            // 'updated_by' => 'nullable|integer',
        ]);

        $checkHistory->update($validated);

        return response()->json($checkHistory, Response::HTTP_OK);
    }

    /**
     * @OA\Delete(
     *     path="/api/deleteCheckHistories/{id}",
     *     summary="DELETE: Delete Check Inventory History Data by ID",
     *     tags={"Check Histories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="422", description="Unprocessable Content"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function destroy($id)
    {
        $checkHistory = SrcProInvCheckHistory::find($id);

        if (!$checkHistory) {
            return response()->json([
                'message' => '404 Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $checkHistory->delete();

        return response()->json([
            'message' => '200 OK'
        ], Response::HTTP_OK);
    }
}
