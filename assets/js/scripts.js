$(document).ready(function(){
    $(".btn-check").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/check",
            data: {
                url: $(this).val()
            },
            success: function(data) {
                // $('#display').text('');
                if (data['old_html'] && data['new_html']) {
                    let diff_data = showDiff(data['old_html'], data['new_html']);
                    showDiffTable(diff_data);
                }
                console.log(data)
            },
            statusCode:{
                500: function () {
                    let result = {'status': 500}
                    console.log(result)
                }
            }
        });
    });

    $(".btn-save").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/save",
            data: {
                url: $(this).val()
            },
            success: function(data) {
                console.log('saved')
            },
            statusCode:{
                500: function () {
                    let result = {'status': 500};
                    alert('Nie można zapisac, podana strona nie istnieje')
                    console.log(result)
                }
            }
        });
    });
});