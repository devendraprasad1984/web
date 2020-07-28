<?php
require_once './handlerAdmin.php';
?>

<!doctype html>
<html lang="en">
<!--php n& REST: https://www.youtube.com/watch?v=OxdgtFs9Z_0-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IBDN Admin</title>
    <link rel="stylesheet" href="./libs/bootstrap.min.css"/>
    <link rel="stylesheet" href="./custom.css"/>
</head>


<body class="container-fluid">
<h3 class="topHeading">
    <span>IBDN Messaging Platform</span>
    <span style="float: right">@Natwest Group</span>
</h3>

<div class="container-fluid" style="margin-top: 50px;margin-bottom: 30px;">
    <div class="row" style="margin-top: 50px;margin-bottom: 30px;">
        <div class="col-md-12  welcomeMsg" align="right">
            <?php
            if ($loggedIn) {
                echo '
            <span class="badge badge-secondary">Welcome Admin, ' . $_SESSION["name"] . '</span>
            <a href="logout.php" class="btn bg-warning">logout</a>
        ';
            } else {
                echo '<h2 class="userCommentTitle" style="text-align: left; width:100%">You are not logged in. plz login to proceed</h2>';
            }
            ?>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="sidenav">
                <div>Admin Dashboard</div>
                <a href="javascript:void(0)" onclick="clickHandler(this,'home')">Home</a>
                <a href="javascript:void(0)" onclick="clickHandler(this,'users')">Users</a>
                <a href="javascript:void(0)" onclick="clickHandler(this,'posts')">Posts</a>
                <a href="javascript:void(0)" onclick="clickHandler(this,'replies')">Replies</a>
            </div>
            <div class="right">
                <div class="row">
                    <div class="col-md-12">
                        <input id="searchBox" class="customInput purple" type="text" placeholder="search contents"/>
                        <a href="javascript:void(0)" class="btn bgblue" onclick="clickSearch(this)">Search</a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div></div>
                        <div id="rightContents">
                            <div id="adminDashboardHome">
                                <div>
                                    <span>USERS: </span>
                                    <span>POSTS: </span>
                                    <span>Replies: </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


<script src="./libs/jquery.min.js"></script>
<script src="./libs/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="./admin.js"></script>

</body>
</html>
