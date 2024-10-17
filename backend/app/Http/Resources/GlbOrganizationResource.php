<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GlbOrganizationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'org_id' => $this->org_id,
            'org_code' => $this->org_code,
            'org_name' => $this->org_name,
            'org_name_new' => $this->getOrganizationName($this->org_id),
            'org_abbr' => $this->org_abbr,
            'org_phone' => $this->org_phone
        ];
    }
    private function getOrganizationName($org_id)
    {
        if (in_array($org_id, [1767])) return 'ส่วนกลาง';
        if (in_array($org_id, [1768])) return 'กลุ่มตรวจสอบภายใน (ตน.)';
        if (in_array($org_id, [1769])) return 'กลุ่มพัฒนาระบบบริหาร (พร.)';
        if (in_array($org_id, [252, 711, 1111, 1382, 1608, 1770])) return 'สำนักงานเลขานุการกรม (สล.)';
        if (in_array($org_id, [167, 192, 267, 767, 1447, 1627, 1778])) return 'กองเทคโนโลยีชุมชน (ทช.)';
        if (in_array($org_id, [274, 807, 1172, 1454, 1687, 1785])) return 'กองบริหารและรับรองห้องปฏิบัติการ (บร.)';
        if (in_array($org_id, [187, 280, 1692, 1790])) return 'กองพัฒนาศักยภาพนักวิทยาศาสตร์ห้องปฏิบัติการ (พศ.)';
        if (in_array($org_id, [188, 286, 819, 1401, 1698, 1796])) return 'กองหอสมุดและศูนย์สารสนเทศวิทยาศาสตร์และเทคโนโลยี (สท.)';
        if (in_array($org_id, [189, 291, 827, 1190, 1465, 1704, 1802])) return 'กองเคมีภัณฑ์และผลิตภัณฑ์อุปโภค (คอ.)';
        if (in_array($org_id, [190, 299, 835, 1198, 1473, 1712, 1810])) return 'กองวัสดุวิศวกรรม (วว.)';
        if (in_array($org_id, [191, 309, 587, 848, 1207, 1482, 1721, 1869])) return 'กองผลิตภัณฑ์อาหารและวัสดุสัมผัสอาหาร (อว.)';
        if (in_array($org_id, [1729, 1877])) return 'กองสอบเทียบเครื่องมือวัด (สค.)';
        if (in_array($org_id, [548, 856, 1733, 1881])) return 'กองบริหารจัดการทดสอบความชำนาญห้องปฏิบัติการ (บท.)';
        if (in_array($org_id, [1739, 1887])) return 'กองยุทธศาสตร์และแผนงาน (ยผ.)';
        if (in_array($org_id, [1215, 1490, 1736, 1908])) return 'กองตรวจและรับรองคุณภาพผลิตภัณฑ์ (รผ.)';
        return 'ไม่ระบุ';
    }
}
