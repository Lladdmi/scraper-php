$(document).ready(function(){
    $(".btn-check").click(function() {
        $('#code_info').removeClass(function (index, css) {
            return (css.match (/\bborder-\S+/g) || []).join(' ');
        });
        $('#changes').children().remove();
        $('#display').text('');
        $('#html_preview').text('');

        $.ajax({
            type: "POST",
            url: "/check",
            data: {
                url: $(this).val()
            },
            success: function(data) {
                console.log(data)
                $('#display').text('');
                $('#changes')[0].scrollIntoView({block: "start"});
                if (data['old_html'] && data['new_html']) {
                    let html_preview = $('#html_preview');
                    // html_preview.append(data['old_html']) //preview
                    let diff_data = showDiff(data['old_html'], data['new_html']);
                    showDiffTable(diff_data);
                }
                let statusColors = {
                    1: 'border-secondary',
                    2: 'border-success',
                    3: 'border-primary',
                    4: 'border-warning',
                    5: 'border-danger'
                }
                $('.info-header').text('Status: '+data['status'])
                let similarity = data['similarity'].toFixed(2);
                $('.info-similarity').text(`Zgodność: ${similarity}%`);
                let count_changes = 0;
                console.log(count_changes)
                count_changes = $('#changes').children().length;

                $('.info-changes').text(`Ilość zmian: ${count_changes}`)
                Object.entries(statusColors).forEach(([key,value]) => {
                    if (String(data['status']).charAt(0) === String(key)){
                        $('#code_info').removeClass(function (index, css) {
                            return (css.match (/\bborder-\S+/g) || []).join(' ');
                        });
                        $('#code_info').addClass(value);
                    }
                })
            },
            statusCode:{
                500: function () {
                    $('.info-header').text('Status: brak');
                    $('.info-similarity').text(`Strona nie istnieje`);
                    $('.info-changes').text(``)

                    let result = {'status': 500}
                    console.log(result)
                },
                502: function () {
                    let result = {'status': 502}
                    console.log(result)
                }
            }
        });
    });

    $(".btn-save").click(function() {
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
                    $('.info-header').text('Status: brak');
                    $('.info-similarity').text(`Strona nie istnieje`);
                    let result = {'status': 500};
                    console.log(result)
                },
                502: function () {
                    let result = {'status': 502}
                    console.log(result)
                }
            }
        });
    });
});