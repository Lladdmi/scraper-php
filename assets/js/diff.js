export function showDiff(old_html, new_html) {
    const one = old_html,
        other = new_html,
        color = '',
        span = null;

    const diff = Diff.diffLines(one, other),
        display = document.getElementById('display'),
        fragment = document.createDocumentFragment();

    display.innerText = "";
    let diffTableData = [];
    let index = 0;
    diff.forEach((part) => {
        // green for additions, red for deletions
        // grey for common parts
        let color, cls;
        if (part.added) {
            color = cls = 'green'
        } else if (part.removed) {
            color = cls = 'red'
        } else {
            color = 'grey'
        }
        // const color = part.added ? 'green' :
        //     part.removed ? 'red' : 'grey';
        let span = document.createElement('span');
        $(span).addClass('el-'+String(index))
        span.style.color = color;
        $(span).addClass(cls)
        span.appendChild(document
            .createTextNode(part.value));
        fragment.appendChild(span);

        //array creator
        if (part.removed || part.added){
            diffTableData.push({
                'type': part.removed ? 'removed' : 'added',
                'change': (part.value).replace(/(\r\n|\n|\r)/gm, "").trim(),
                'color': part.removed ? 'text-danger' : 'text-success',
                'element': 'el-'+index
            })
        }
        index++;
    });

    display.appendChild(fragment);
    $('#html_prev').data('html', fragment);

    return diffTableData;
}

function jumpToChange(element) {
    console.log('element');
}

$.fn.glowEffect = function(start, end, duration) {
    let el = this;
    return this.css("a", start).animate({
        a: end
    }, {
        duration: duration,
        step: function(now) {
            el.css("text-shadow","0px 0px "+now+"px #777");
        },
        complete: function() {
            el.css("text-shadow","");
        }
    });
};

export function showDiffTable(data) {
    // console.log(data)
    let table = $('#changes');
    data.forEach((el) => {
        // console.log(el)
        let change = el.change.replace(/\t/g, '');
        table.append(`
                    <tr>
                        <td class="${el.color}"><b>${el.type}</b></td>
                        <td class=""><xmp style="white-space: break-spaces;">${change}</xmp></td>
<!--                        <td></td>-->
                        <td><button class="btn btn-sm btn-outline-dark p-1 btn-${el.element}">Skocz</button></td>
                    </tr>
                   `)
        $('.btn-'+el.element).click(()=>{
            let element = $('.'+el.element);
            element[0].scrollIntoView({behavior: "smooth", block: "center", inline: "end"});
            if ( !$(this).is(':animated') ){
                element.glowEffect(0, 40, 2000);
            }
        });
    });
}