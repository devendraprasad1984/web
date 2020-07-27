<?php
session_save_path('/tmp');
session_start();
require_once './handlerPosts.php';
?>

<!doctype html>
<html lang="en">
<!--php comments: https://www.youtube.com/watch?v=eD02QLsTUnY-->
<!--php comments & reply: https://www.youtube.com/watch?v=4Of5v-rfmys-->
<!--php n& REST: https://www.youtube.com/watch?v=OxdgtFs9Z_0-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IBDN Messaging platform in association with Natwest Group</title>
    <!--    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>-->
    <link rel="stylesheet" href="./libs/bootstrap.min.css"/>
    <link rel="stylesheet" href="./custom.css"/>
</head>


<body class="container-fluid">
<h3 class="topHeading">
    <span>IBDN Messaging Platform</span>
    <span style="float: right">@Natwest Group</span>
</h3>
<div class="modal" id="registerModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Registration Form</h5>
            </div>
            <div class="modal-body">
                <input type="text" id="userName" class="form-control" placeholder="your name">
                <input type="text" id="userEmail" class="form-control" placeholder="your email">
                <input type="password" id="userPassword" class="form-control" placeholder="your password">
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">Close</button>
                <button class="btn btn-primary" id="registerBtn">Register</button>
            </div>
        </div>
    </div>
</div>


<div class="modal" id="loginModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Login Form</h5>
            </div>
            <div class="modal-body">
                <input type="text" id="userLEmail" class="form-control" placeholder="your email">
                <input type="password" id="userLPassword" class="form-control" placeholder="your password">
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">Close</button>
                <button class="btn btn-primary" id="loginBtn">Login</button>
            </div>
        </div>
    </div>
</div>


<div class="container" style="margin-top: 50px;margin-bottom: 30px;">

    <div class="row" style="margin-top: 50px;margin-bottom: 30px;">
        <div class="col-md-12  welcomeMsg" align="right">
            <?php
            if (!$loggedIn) {
                echo '
            <button class="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>
            <button class="btn btn-success" data-toggle="modal" data-target="#loginModal">Login</button>
        ';
            } else {
                echo '<span class="badge badge-secondary">Welcome, ' . $_SESSION["name"] . '</span>'
                    . ($_SESSION["role"] == 'admin' ? '<a href="./admin.php" class="btn bgpurple">Admin Console</a>' : '')
                    . '<a href="./logout.php" class="btn bg-warning">logout</a>
        ';
            }
            ?>
        </div>
    </div>


    <div class="row">
        <div class="col-md-12" align="right">
            <textarea class="form-control" id="mainComment" placeholder="add new post" cols="30"
                      rows="2"></textarea><br>
            <button class="btn btn-primary" id="addComment" onclick="fnAddComments(this,false)">Submit</button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h2><b id="idNumComments"><?php echo fetchpostsCount() ?> posts</b></h2>
            <div class="userComments"></div>
        </div>
    </div>
</div>
</div>

<div class="row replyRow" style="display: none">
    <div class="col-md-12" align="right">
        <textarea class="form-control" id="replyComment" placeholder="add reply" cols="30" rows="1"></textarea><br>
        <button class="btn btn-warning" id="addReply" onclick="fnAddComments(this,true)">Submit</button>
        <button class="btn btn-dark" onclick="$('.replyRow').hide()">Close</button>
    </div>
</div>


<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"-->
<!--        integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="-->
<!--        crossorigin="anonymous"></script>-->
<!--<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"-->
<!--        integrity="sha384-1CmrxMRARb6aLqgBO7yyAxTOQE2AKb9GfXnEo760AUcUmFx3ibVJJAzGytlQcNXd"-->
<!--        crossorigin="anonymous"></script>-->
<script src="./libs/jquery.min.js"></script>
<script src="./libs/bootstrap.bundle.min.js"></script>
<script>
    let max = <?php echo fetchpostsCount() ?>;
</script>
<script type="text/javascript" src="postsComments.js"></script>

</body>
</html>
