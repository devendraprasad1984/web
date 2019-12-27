<?php
    Class common
    {
        public $br = '<br/>';
        public function __construct()
        {

        }
        public function getArrayAsString($arr)
        {
            $str = '';
            foreach ($arr as $v) {
                $str .=$v . ', ';
            }
            return $str;
        }
    }

?>