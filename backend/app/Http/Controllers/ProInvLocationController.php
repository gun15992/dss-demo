<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProInvBuilding;
use App\Http\Resources\ProInvLocationCollection;

class ProInvLocationController extends Controller
{
    /**
     * @OA\Tag(
     *     name="Locations",
     * )
     *
     * @OA\Get(
     *     path="/api/getLocations",
     *     summary="GET: All Locations Data",
     *     tags={"Locations"},
     *     @OA\Response(response="200", description="OK"),
     *     @OA\Response(response="204", description="No Content"),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Not Found"),
     *     @OA\Response(response="500", description="Internal Server Error"),
     * )
     */
    public function index()
    {
        $allProInvLocation = ProInvBuilding::all();
        return new ProInvLocationCollection($allProInvLocation);
    }
}
