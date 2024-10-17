<?php

use Carbon\Carbon;

if (!function_exists('parseThaiDateTime')) {
    /**
     *
     *
     * @param string $dateTimeStr
     * @return \Carbon\Carbon|null
     */
    function parseThaiDateTime($dateTimeStr)
    {
        $dateTimeStr = str_replace(['หลังเที่ยง', 'ก่อนเที่ยง'], ['PM', 'AM'], $dateTimeStr);
        $formats = [
            'm/d/Y h:i A',
            'd/m/Y h:i A'
        ];

        foreach ($formats as $format) {
            try {
                $date = Carbon::createFromFormat($format, $dateTimeStr);
                return $date;
            } catch (\Exception $e) {
                // Error Exception
            }
        }
        return null;
    }
}
