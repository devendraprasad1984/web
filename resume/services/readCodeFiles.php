<?php

try {
    if (isset($_REQUEST["id"])) {
        $myId = $_REQUEST["id"];
        $objFiles = new getCodeFiles();
        if ($myId == "getCodeDir") {
            $myDir = "";
            if (isset($_REQUEST["myDir"]) && $_REQUEST["myDir"] != "") {
                $myDir = $_REQUEST["myDir"];
            }
            echo $objFiles->getCodeDir($myDir);
        } else if ($myId == "getCodeContents") {
            if (isset($_REQUEST["filePath"])) {
                $filePath = $_REQUEST["filePath"];
                echo $objFiles->getCodeContents($filePath);
            }
        }
    } else {
        echo "Invalid server call";
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage() . "<br/>" . $e->getTraceAsString();
}

class getCodeFiles
{
    function getCodeDir($myDir)
    {
        $dirList = array();
        $myPath = "../codeSamples";
        if ($myDir != "") {
            $myPath .= "/" . $myDir;
        }
        $dir = opendir($myPath);
        while ($file = readdir($dir)) {
            if ($file == '.' || $file == '..') {
                continue;
            }
//            $dirList[] = "<span class='btn btn-info'>"+$file+"<span>";
            $dirList[] = $file;
        }
        header('Content-type: application/json');
        return json_encode($dirList);
    }

    function getCodeContents($filePath)
    {
        $content = "";
        $myPath = "../codeSamples";
        $filePath = $myPath . '/' . $filePath;
        $contentsArray = array();
//        $content =file_get_contents($filePath);
        $fh = fopen($filePath, 'r');
//        $content.=fread($fh,filesize($filePath));
        $lineCounter=0;
        if ($fh) {
            while (($line = fgets($fh)) != false) {
                $lineCounter+=1;
                if (substr($line, 0, 1) == "#") {
                    $line = str_replace($line, "<span style='color: #ADD8E6;'>" . $line . "</span>", $line);
                } else if (substr($line, 0, 1) == "@") {
                    $line = str_replace($line, "<span style='color: #4B0082;'>" . $line . "</span>", $line);
                }  else {
                    $line = str_replace("def", "<span style='color: blue;'>def</span>", $line);
                    $line = str_replace("function", "<span style='color: blue;'>function</span>", $line);
                    $line = str_replace("return", "<span style='color: blue;'>return</span>", $line);
                    $line = str_replace("{", "<span style='font-weight: bold; ccolor: red;'>{</span>", $line);
                    $line = str_replace("}", "<span style='font-weight: bold; ccolor: red;'>}</span>", $line);
                    $line = str_replace("(", "<span style='font-weight: bold; color:#BA55D3;'>(</span>", $line);
                    $line = str_replace(")", "<span style='font-weight: bold; color:#BA55D3;'>)</span>", $line);
                    $line = str_replace("if", "<span style='color: green;'>if</span>", $line);
                    $line = str_replace("else", "<span style='color: green;'>else</span>", $line);
                    $line = str_replace("for", "<span style='color: magenta;'>for</span>", $line);
                    $line = str_replace("print", "<span style='color: green;'>print</span>", $line);
                    $line = str_replace("var", "<span style='color: teal;'>var</span>", $line);
                    $line = str_replace("console", "<span style='color: brown;'>console</span>", $line);
                    $line = str_replace("log", "<span style='color: red;'>log</span>", $line);
                    $line = str_replace("class", "<span style='color: magenta;'>class</span>", $line);
                    $line = str_replace("public", "<span style='color: green;'>public</span>", $line);
                    $line = str_replace("System", "<span style='color: red;'>System</span>", $line);
                    $line = str_replace("try", "<span style='color: #90EE90;'>try</span>", $line);
                    $line = str_replace("catch", "<span style='color: #90EE90;'>catch</span>", $line);
                }
//                $content .= "\t".$line . "<br/>";
                $content .= "\t".$line . "<br/>";
            }
        }
        fclose($fh);
        $contentsArray[] = $content;
        header('Content-type: application/json');
        return json_encode($contentsArray);
    }

}


?>