let headers={
    "Content-type": "application/json; charset=UTF-8"
};


function handleUnlock(){
    swal({title:"Unlocked"});

}

function handleSubmit(){
    data={};
    data['save']=1;
    data['name']=names.value;
    data['time']=time.value;
    data['amount']=amount.value;
    data['remarks']=remarks.value;
    data['ip']='';

    $.ajax({
        type: "POST",
        url: './d155.php',
        dataType: 'text',
        data,
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    });


    swal(
        {
            title: "Are you sure to save.",
            text:JSON.stringify(data),
            buttons: ['No','Yes'],
        }
    ).then((flag)=>{
        if(flag===true){
            swal({
                title: "Your Entry is saved",
                icon: "success",
                button:'Ok',
            });
        }
    });
}

function handleRefresh(){
    swal({title:"Data Refreshed"});
}
