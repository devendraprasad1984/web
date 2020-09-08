<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D155 Expenses</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
<h1>D155 Expenses Manager</h1>

<button id="btnUnlock" class="btn blue" onclick="handleUnlock()">Unlock by DP</button>
<div id="formInputs" class="input-inline purple">
    <select id="names" name="names">
        <option value="Anish Ji" selected >Anish Ji</option>
        <option value="Devendra Ji" >Devendra Ji</option>
        <option value="Devdatt Ji" >Devdatt Ji</option>
        <option value="Ajay Ji" >Ajay Ji</option>
    </select>
    <select id="time">
        <option value="Oct2020">Oct2020</option>
        <option value="Oct2020">Oct2020</option>
        <option value="Oct2020">Oct2020</option>
    </select>
    <input id="amount" type="text" value="1000" class="input-right" placeholder="enter your amount, if expenses place negative number" width="50px">
    <input id="remarks" type="text" placeholder="what is amount for" width="150px">
    <button id="btnSubmit" class="btn red" onclick="handleSubmit()"> Submit</button>
</div>

<div>
    <button id="btnRefresh" class="btn green" onclick="handleRefresh()">Refresh</button>
    <div>report</div>
</div>

<script src="./libs/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" crossorigin="anonymous"></script>
<script src="index.js"></script>

</body>
</html>