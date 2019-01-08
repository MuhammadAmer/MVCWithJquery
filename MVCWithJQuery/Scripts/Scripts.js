// Loading function 
$(function () {
    $("#loaderbody").addClass('hide');

    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
});

// Function to show selected image in preview
function showImagePreview(imageUploader, previewImage) {

    if (imageUploader.files && imageUploader.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e)
        {
            $(previewImage).attr('src', e.target.result);
        }
        reader.readAsDataURL(imageUploader.files[0]);
    }
}

// Post data function
function jQueryAjaxPost(form) {

    $.validator.unobtrusive.parse(form);
    if($(form).valid()){
        var ajaxConfig = {
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            success: function (response) {
                if (response.success) {
                    $("#firstTab").html(response.html);
                    refreshAddNewTab($(form).attr('data-resetUrl'), true);
                    $.notify(response.message, "success");
                    if (typeof activateJqueryTable !== 'undefined' && $.isFunction(activateJqueryTable))
                        activateJqueryTable();
                }
                else {
                    $.notify(response.message, "error");
                }
            }
        }
        if ($(form).attr('enctype') == "multipart/form-data") {
            ajaxConfig["contentType"] = false;
            ajaxConfig["processData"] = false;
        }

        $.ajax(ajaxConfig);
    }
    return false;
}

// Refresh form after POST
function refreshAddNewTab(resetUrl,showViewTab) {

    $.ajax({
        type: 'GET',
        url: resetUrl,
        success: function (response) {
            $("#secondTab").html(response);
            $('ul.nav.nav-tabs a:eq(1)').html('Add New');
            if (showViewTab)
                $('ul.nav.nav-tabs a:eq(0)').tab('show');
        } 
    });
}

// Edit function
function Edit(url){
    $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
            $("#secondTab").html(response);
            $('ul.nav.nav-tabs a:eq(1)').html('Edit');
             $('ul.nav.nav-tabs a:eq(1)').tab('show');
        }
    });
}

// Delete Function
function Delete(url) {

    if(confirm('Are You sure want to delete this Employee?')==true)
        $.ajax({
            type: 'POST',
            url: url,
            success: function (response) {
                if (response.success) {
                    $("#firstTab").html(response.html);
                    $.notify(response.message, "warn");
                    if (typeof activateJqueryTable !== 'undefined' && $.isFunction(activateJqueryTable))
                        activateJqueryTable();
                }
                else {
                    $.notify(response.message, "error");
                }
            }
        });

}