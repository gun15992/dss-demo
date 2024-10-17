<?php

namespace App\Http\Resources;

use App\Models\ProInvInfo;
use App\Models\SrcProInvCheckHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;

class ProInvInfoCountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Count Inventories by Fiscal Years
        $fiscalYears = SrcProInvCheckHistory::select('fiscal_year', DB::raw('COUNT(fiscal_year) as count'))
            ->groupBy('fiscal_year')
            ->orderBy('fiscal_year', 'desc')
            ->distinct()
            ->get();

        // Count Using Inventories by Organizations
        $countOrg01 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1767])
            ->count();
        $countOrg02 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1768])
            ->count();
        $countOrg03 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1769])
            ->count();
        $countOrg04 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [252, 711, 1111, 1382, 1608, 1770])
            ->count();
        $countOrg05 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [167, 192, 267, 767, 1447, 1627, 1778])
            ->count();
        $countOrg06 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [274, 807, 1172, 1454, 1687, 1785])
            ->count();
        $countOrg07 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [187, 280, 1692, 1790])
            ->count();
        $countOrg08 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [188, 286, 819, 1401, 1698, 1796])
            ->count();
        $countOrg09 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [189, 291, 827, 1190, 1465, 1704, 1802])
            ->count();
        $countOrg10 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [190, 299, 835, 1198, 1473, 1712, 1810])
            ->count();
        $countOrg11 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [191, 309, 587, 848, 1207, 1482, 1721, 1869])
            ->count();
        $countOrg12 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1729, 1877])
            ->count();
        $countOrg13 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [548, 856, 1733, 1881])
            ->count();
        $countOrg14 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1739, 1887])
            ->count();
        $countOrg15 = ProInvInfo::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('org_org_id', [1215, 1490, 1736, 1908])
            ->count();

        // Count Not Using Inventories by Organizations
        $countNotOrg01 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1767])
            ->count();
        $countNotOrg02 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1768])
            ->count();
        $countNotOrg03 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1769])
            ->count();
        $countNotOrg04 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [252, 711, 1111, 1382, 1608, 1770])
            ->count();
        $countNotOrg05 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [167, 192, 267, 767, 1447, 1627, 1778])
            ->count();
        $countNotOrg06 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [274, 807, 1172, 1454, 1687, 1785])
            ->count();
        $countNotOrg07 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [187, 280, 1692, 1790])
            ->count();
        $countNotOrg08 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [188, 286, 819, 1401, 1698, 1796])
            ->count();
        $countNotOrg09 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [189, 291, 827, 1190, 1465, 1704, 1802])
            ->count();
        $countNotOrg10 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [190, 299, 835, 1198, 1473, 1712, 1810])
            ->count();
        $countNotOrg11 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [191, 309, 587, 848, 1207, 1482, 1721, 1869])
            ->count();
        $countNotOrg12 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1729, 1877])
            ->count();
        $countNotOrg13 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [548, 856, 1733, 1881])
            ->count();
        $countNotOrg14 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1739, 1887])
            ->count();
        $countNotOrg15 = ProInvInfo::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('org_org_id', [1215, 1490, 1736, 1908])
            ->count();

        // Count Check Using Inventories by Organizations
        $countCheckOrg01 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1767])
            ->count();
        $countCheckOrg02 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1768])
            ->count();
        $countCheckOrg03 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1769])
            ->count();
        $countCheckOrg04 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [252, 711, 1111, 1382, 1608, 1770])
            ->count();
        $countCheckOrg05 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [167, 192, 267, 767, 1447, 1627, 1778])
            ->count();
        $countCheckOrg06 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [274, 807, 1172, 1454, 1687, 1785])
            ->count();
        $countCheckOrg07 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [187, 280, 1692, 1790])
            ->count();
        $countCheckOrg08 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [188, 286, 819, 1401, 1698, 1796])
            ->count();
        $countCheckOrg09 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [189, 291, 827, 1190, 1465, 1704, 1802])
            ->count();
        $countCheckOrg10 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [190, 299, 835, 1198, 1473, 1712, 1810])
            ->count();
        $countCheckOrg11 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [191, 309, 587, 848, 1207, 1482, 1721, 1869])
            ->count();
        $countCheckOrg12 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1729, 1877])
            ->count();
        $countCheckOrg13 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [548, 856, 1733, 1881])
            ->count();
        $countCheckOrg14 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1739, 1887])
            ->count();
        $countCheckOrg15 = SrcProInvCheckHistory::whereIn('dispense_flg', ['N', 'W', 'F'])
            ->whereIn('division_id', [1215, 1490, 1736, 1908])
            ->count();

        // Count Check Not Using Inventories by Organizations
        $countCheckNotOrg01 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1767])
            ->count();
        $countCheckNotOrg02 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1768])
            ->count();
        $countCheckNotOrg03 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1769])
            ->count();
        $countCheckNotOrg04 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [252, 711, 1111, 1382, 1608, 1770])
            ->count();
        $countCheckNotOrg05 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [167, 192, 267, 767, 1447, 1627, 1778])
            ->count();
        $countCheckNotOrg06 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [274, 807, 1172, 1454, 1687, 1785])
            ->count();
        $countCheckNotOrg07 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [187, 280, 1692, 1790])
            ->count();
        $countCheckNotOrg08 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [188, 286, 819, 1401, 1698, 1796])
            ->count();
        $countCheckNotOrg09 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [189, 291, 827, 1190, 1465, 1704, 1802])
            ->count();
        $countCheckNotOrg10 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [190, 299, 835, 1198, 1473, 1712, 1810])
            ->count();
        $countCheckNotOrg11 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [191, 309, 587, 848, 1207, 1482, 1721, 1869])
            ->count();
        $countCheckNotOrg12 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1729, 1877])
            ->count();
        $countCheckNotOrg13 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [548, 856, 1733, 1881])
            ->count();
        $countCheckNotOrg14 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1739, 1887])
            ->count();
        $countCheckNotOrg15 = SrcProInvCheckHistory::whereIn('dispense_flg', ['Y', 'T', 'C', 'D', 'U'])
            ->whereIn('division_id', [1215, 1490, 1736, 1908])
            ->count();

        // Count All Inventories
        $countAllInv = ProInvInfo::whereNotNull('dispense_flg')
            ->count();
        $countAllHaveType = ProInvInfo::whereNotNull('classify_inv_type')
            ->where('classify_inv_type', '!=', '99')
            ->whereNotNull('dispense_flg')
            ->count();
        $countAllHaveNotTypeA = ProInvInfo::whereNull('classify_inv_type')
            ->whereNotNull('dispense_flg')
            ->count();
        $countAllHaveNotTypeB = ProInvInfo::where('classify_inv_type', '99')
            ->whereNotNull('dispense_flg')
            ->count();
        $countAllHaveNotType = $countAllHaveNotTypeA + $countAllHaveNotTypeB;

        // Count Inventories Types: Summary
        $countNHaveType = ProInvInfo::whereNotNull('classify_inv_type')
            ->where('classify_inv_type', '!=', '99')
            ->where('dispense_flg', '=', 'N')
            ->count();
        $countNHaveNotTypeA = ProInvInfo::whereNull('classify_inv_type')
            ->where('dispense_flg', '=', 'N')
            ->count();
        $countNHaveNotTypeB = ProInvInfo::where('classify_inv_type', '99')
            ->where('dispense_flg', '=', 'N')
            ->count();
        $countNHaveNotType = $countNHaveNotTypeA + $countNHaveNotTypeB;

        $countWHaveType = ProInvInfo::whereNotNull('classify_inv_type')
            ->where('classify_inv_type', '!=', '99')
            ->where('dispense_flg', '=', 'W')
            ->count();
        $countWHaveNotTypeA = ProInvInfo::whereNull('classify_inv_type')
            ->where('dispense_flg', '=', 'W')
            ->count();
        $countWHaveNotTypeB = ProInvInfo::where('classify_inv_type', '99')
            ->where('dispense_flg', '=', 'W')
            ->count();
        $countWHaveNotType = $countWHaveNotTypeA + $countWHaveNotTypeB;

        $countFHaveType = ProInvInfo::whereNotNull('classify_inv_type')
            ->where('classify_inv_type', '!=', '99')
            ->where('dispense_flg', '=', 'F')
            ->count();
        $countFHaveNotTypeA = ProInvInfo::whereNull('classify_inv_type')
            ->where('dispense_flg', '=', 'F')
            ->count();
        $countFHaveNotTypeB = ProInvInfo::where('classify_inv_type', '99')
            ->where('dispense_flg', '=', 'F')
            ->count();
        $countFHaveNotType = $countFHaveNotTypeA + $countFHaveNotTypeB;

        $countSumHaveType = $countNHaveType + $countWHaveType + $countFHaveType;
        $countSumHaveNotType = $countNHaveNotType + $countWHaveNotType + $countFHaveNotType;
        $countSumAllInv = $countSumHaveType + $countSumHaveNotType;

        // Count Inventories Types: Each type
        $countBuilding = ProInvInfo::where('classify_inv_type', '1')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countAgri = ProInvInfo::where('classify_inv_type', '2')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countMedSci = ProInvInfo::where('classify_inv_type', '3')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countEdu = ProInvInfo::where('classify_inv_type', '4')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countSport = ProInvInfo::where('classify_inv_type', '5')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countCom = ProInvInfo::where('classify_inv_type', '6')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countPr = ProInvInfo::where('classify_inv_type', '7')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countKitchen = ProInvInfo::where('classify_inv_type', '8')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countArt = ProInvInfo::where('classify_inv_type', '9')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countLand = ProInvInfo::where('classify_inv_type', '10')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countElectric = ProInvInfo::where('classify_inv_type', '11')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countCar = ProInvInfo::where('classify_inv_type', '12')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countFactory = ProInvInfo::where('classify_inv_type', '13')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countGround = ProInvInfo::where('classify_inv_type', '14')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countOffice = ProInvInfo::where('classify_inv_type', '15')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countSurvey = ProInvInfo::where('classify_inv_type', '16')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countWeapon = ProInvInfo::where('classify_inv_type', '17')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countOther = ProInvInfo::where('classify_inv_type', '18')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countGovGround = ProInvInfo::where('classify_inv_type', '19')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countProgram = ProInvInfo::where('classify_inv_type', '20')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countBuild = ProInvInfo::where('classify_inv_type', '21')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countConstruct = ProInvInfo::where('classify_inv_type', '22')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countAsset = ProInvInfo::where('classify_inv_type', '23')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countBlankAsset = ProInvInfo::where('classify_inv_type', '24')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countTempBuilding = ProInvInfo::where('classify_inv_type', '25')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();
        $countPermanentBuilding = ProInvInfo::where('classify_inv_type', '26')
            ->whereIn('dispense_flg', ['N', 'W', 'F'])
            ->count();

        // Count Inventories Status
        $countUsageStatus = ProInvInfo::where('dispense_flg', '=', 'N')
            ->count();
        $countWaitSoldOutStatus = ProInvInfo::where('dispense_flg', '=', 'W')
            ->count();
        $countSomeSoldOutStatus = ProInvInfo::where('dispense_flg', '=', 'F')
            ->count();
        $countSoldOutStatus = ProInvInfo::where('dispense_flg', '=', 'Y')
            ->count();
        $countCrimeStatus = ProInvInfo::where('dispense_flg', '=', 'C')
            ->count();
        $countTransferStatus = ProInvInfo::where('dispense_flg', '=', 'T')
            ->count();
        $countDamagedStatus = ProInvInfo::where('dispense_flg', '=', 'D')
            ->count();
        $countNeedlessStatus = ProInvInfo::where('dispense_flg', '=', 'U')
            ->count();

        return [
            'total' => [
                'total_all' => $countAllInv,
                'total_all_have_type' => $countAllHaveType,
                'total_all_have_not_type' => $countAllHaveNotType,
                'total_sum_all' => $countSumAllInv,
                'total_sum_have_type' => $countSumHaveType,
                'total_sum_have_not_type' => $countSumHaveNotType,
                // 'total_N_have_type' => $countNHaveType,
                // 'total_N_have_not_type' => $countNHaveNotType,
                // 'total_W_have_type' => $countWHaveType,
                // 'total_W_have_not_type' => $countWHaveNotType,
                // 'total_F_have_type' => $countFHaveType,
                // 'total_F_have_not_type' => $countFHaveNotType
            ],
            'status' => [
                'N_status' => $countUsageStatus,
                'W_status' => $countWaitSoldOutStatus,
                'F_status' => $countSomeSoldOutStatus,
                'Y_status' => $countSoldOutStatus,
                'C_status' => $countCrimeStatus,
                'T_status' => $countTransferStatus,
                'D_status' => $countDamagedStatus,
                'U_status' => $countNeedlessStatus
            ],
            'type' => [
                'building' => $countBuilding,
                'agri' => $countAgri,
                'med_sci' => $countMedSci,
                'edu' => $countEdu,
                'sport' => $countSport,
                'com' => $countCom,
                'pr' => $countPr,
                'kitchen' => $countKitchen,
                'art' => $countArt,
                'land' => $countLand,
                'electric' => $countElectric,
                'car' => $countCar,
                'factory' => $countFactory,
                'ground' => $countGround,
                'office' => $countOffice,
                'survey' => $countSurvey,
                'weapon' => $countWeapon,
                'other' => $countOther,
                'gov_ground' => $countGovGround,
                'program' => $countProgram,
                'build' => $countBuild,
                'construct' => $countConstruct,
                'asset' => $countAsset,
                'blank_asset' => $countBlankAsset,
                'temp_building' => $countTempBuilding,
                'permanent_building' => $countPermanentBuilding
            ],
            'check' => FiscalYearCheckResource::collection($fiscalYears),
            'org' => [
                'org_01' => $countOrg01,
                'org_02' => $countOrg02,
                'org_03' => $countOrg03,
                'org_04' => $countOrg04,
                'org_05' => $countOrg05,
                'org_06' => $countOrg06,
                'org_07' => $countOrg07,
                'org_08' => $countOrg08,
                'org_09' => $countOrg09,
                'org_10' => $countOrg10,
                'org_11' => $countOrg11,
                'org_12' => $countOrg12,
                'org_13' => $countOrg13,
                'org_14' => $countOrg14,
                'org_15' => $countOrg15
            ],
            'not_org' => [
                'not_org_01' => $countNotOrg01,
                'not_org_02' => $countNotOrg02,
                'not_org_03' => $countNotOrg03,
                'not_org_04' => $countNotOrg04,
                'not_org_05' => $countNotOrg05,
                'not_org_06' => $countNotOrg06,
                'not_org_07' => $countNotOrg07,
                'not_org_08' => $countNotOrg08,
                'not_org_09' => $countNotOrg09,
                'not_org_10' => $countNotOrg10,
                'not_org_11' => $countNotOrg11,
                'not_org_12' => $countNotOrg12,
                'not_org_13' => $countNotOrg13,
                'not_org_14' => $countNotOrg14,
                'not_org_15' => $countNotOrg15
            ],
            'check_org' => [
                'check_org_01' => $countCheckOrg01,
                'check_org_02' => $countCheckOrg02,
                'check_org_03' => $countCheckOrg03,
                'check_org_04' => $countCheckOrg04,
                'check_org_05' => $countCheckOrg05,
                'check_org_06' => $countCheckOrg06,
                'check_org_07' => $countCheckOrg07,
                'check_org_08' => $countCheckOrg08,
                'check_org_09' => $countCheckOrg09,
                'check_org_10' => $countCheckOrg10,
                'check_org_11' => $countCheckOrg11,
                'check_org_12' => $countCheckOrg12,
                'check_org_13' => $countCheckOrg13,
                'check_org_14' => $countCheckOrg14,
                'check_org_15' => $countCheckOrg15
            ],
            'check_not_org' => [
                'check_not_org_01' => $countCheckNotOrg01,
                'check_not_org_02' => $countCheckNotOrg02,
                'check_not_org_03' => $countCheckNotOrg03,
                'check_not_org_04' => $countCheckNotOrg04,
                'check_not_org_05' => $countCheckNotOrg05,
                'check_not_org_06' => $countCheckNotOrg06,
                'check_not_org_07' => $countCheckNotOrg07,
                'check_not_org_08' => $countCheckNotOrg08,
                'check_not_org_09' => $countCheckNotOrg09,
                'check_not_org_10' => $countCheckNotOrg10,
                'check_not_org_11' => $countCheckNotOrg11,
                'check_not_org_12' => $countCheckNotOrg12,
                'check_not_org_13' => $countCheckNotOrg13,
                'check_not_org_14' => $countCheckNotOrg14,
                'check_not_org_15' => $countCheckNotOrg15
            ]
        ];
    }
}
