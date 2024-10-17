<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\ProInvMoveHistory;
use App\Http\Resources\ProInvMoveHistoryResource;
use App\Http\Resources\ProInvMoveHistoryCollection;

class ProInvMoveHistoryController extends Controller
{
    /**
     * @OA\Tag(
     *     name="Move Histories",
     * )
     *
     * @OA\Get(
     *     path="/api/getMoveHistories",
     *     summary="GET: Move Inventories Histories Data with Pagination",
     *     tags={"Move Histories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function index(Request $request){
        $query = ProInvMoveHistory::query();
        $searchQuery = $request->input('search', '');
        $itemsPerPage = $request->input('itemsPerPage', 10);

        $srcProInvMoveHistoryPaginate = $query->paginate($itemsPerPage);

        return new ProInvMoveHistoryCollection($srcProInvMoveHistoryPaginate);
    }

    /**
     * @OA\Get(
     *     path="/api/getMoveHistories/{id}",
     *     summary="GET: Move Inventories Histories Data by ID",
     *     tags={"Move Histories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Move Inventory History ID",
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
        $proInvMoveHistoryId = ProInvMoveHistory::findOrFail($id);
        return new ProInvMoveHistoryResource($proInvMoveHistoryId);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllMoveHistories",
     *     summary="GET: All Move Inventories Histories Data",
     *     tags={"Move Histories"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function allIndex()
    {
        $allProInvMoveHistory = ProInvMoveHistory::all();
        return new ProInvMoveHistoryCollection($allProInvMoveHistory);
    }

    /**
     * @OA\Get(
     *     path="/api/getAllMoveHistories/{id}",
     *     summary="GET: All Move Inventories Histories Data by ID",
     *     tags={"Move Histories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Move Inventory History ID",
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
        $proInvMoveHistoryId = ProInvMoveHistory::findOrFail($id);
        return new ProInvMoveHistoryResource($proInvMoveHistoryId);
    }

    /**
     * @OA\Post(
     *     path="/api/postMoveHistories",
     *     summary="POST: Create Move Inventory History Data",
     *     tags={"Move Histories"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="inv_id", type="number", example=1),
     *             @OA\Property(property="detail", type="string", example="ทดสอบ"),
     *             @OA\Property(property="building_id", type="number", example=2),
     *             @OA\Property(property="floor", type="number", example=4),
     *             @OA\Property(property="room_number", type="string", example="ห้องอบรมคอมพิวเตอร์"),
     *             @OA\Property(property="sub_division_id", type="number", example=1801),
     *             @OA\Property(property="owner_emp_id", type="number", example=15404),
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
            'detail' => 'nullable|string',
            'building_id' => 'required|integer',
            'floor' => 'required|integer',
            'room_number' => 'nullable|string',
            'sub_division_id' => 'nullable|integer',
            'owner_emp_id' => 'required|integer',
            // 'created_by' => 'nullable|integer',
        ]);

        $moveHistory = ProInvMoveHistory::create($validated);

        return response()->json($moveHistory, Response::HTTP_CREATED);
    }
}
