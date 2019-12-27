var appCode = angular.module("myCodeAngular", []);

appCode.filter('text2html', function ($sce) {
        return function (text) {
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            // return stripHtml(text);
            return $sce.trustAsHtml(text);
        };
    }
);

appCode.controller('initController', function ($scope, $http, $timeout) {
    let that = $scope;
    that.dirName = "";
    that.codeName = "";
    that.codeContents = "";
    that.codeFilterByName = "";
    that.init = function () {
        that.testArr = [];
        for (i = 0; i < 100; i++) {
            that.testArr.push(i);
        }
    }
    that.getFolderList = function (folderPath) {
        that.codeContents = "";
        that.dirName = folderPath;
        var url = "../services/readCodeFiles.php?id=getCodeDir";
        if (folderPath !== "") {
            url = url + "&myDir=" + folderPath;
        }
        $http.get(url).then(function (res) {
            if (folderPath !== "") {
                that.fileList = res.data;
            } else {
                that.codeDirList = res.data;
            }
            // console.log(that.codeDirList);
        });
    }
    that.getCodeContents = function (filePath) {
        that.codeName = filePath;
        filePath = that.dirName + "/" + filePath;
        // console.log(filePath);
        $http.get('../services/readCodeFiles.php?id=getCodeContents&filePath=' + filePath).then(function (res) {
            that.codeContents = res.data[0];
        });
    }


    // var stripHtml = (function () {
    //     var tmpEl = $document[0].createElement("DIV");
    //
    //     function strip(html) {
    //         if (!html) {
    //             return "";
    //         }
    //         tmpEl.innerHTML = html;
    //         return tmpEl.textContent || tmpEl.innerText || "";
    //     }
    //
    //     return strip;
    // }());

});

appCode.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel)
            var modelSetter = model.assign
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files)
                })
            })
            // console.log(scope, element, attrs)
        }
    }
}]);

appCode.service('fileUpload', function ($http) {
    this.uploadFileUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file)
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            header: {'Content-Type': undefined}
        }).success(function (res) {
            console.log(res)
        }).error(function (err) {
            console.log(err)
        })
    }
})

appCode.controller('myChoiceController', function ($scope, fileUpload) {
    var that = $scope;
    that.getFiles2Send = function () {
        var file = $scope.choice;
        console.log("file is: ", file)
        var uploadUrl = 'http://localhost/resume/services/choice.php'
        fileUpload.uploadFileUrl(file, uploadUrl)

    }
});


;(function (document, window, index) {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                label.querySelector('span').innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    });
}(document, window, 0));