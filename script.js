// if ($title == '' ){
//     errorMessage += " Enter your Name<br/>";
//     errorCounter++;
// }

// if ($rating == '') {
//     errorMessage += " Enter your age<br/>";
//     errorCounter++;
// }
// else if (!$.isNumeric($rating)) {
//     errorMessage += " Invalid age-should be numeric<br/>";
//     errorCounter++;
// }


$(document).ready(function () {

    //d attribute values for the sorting svg
    path_d_desc = "M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z";
    path_d_asc = "M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z";

    $('path#sortIcon').attr('d', path_d_asc);

    //Add row fuction
    $('#add').on('click', function () {
        $title = $('#title').val();
        $rating = $('#rating').val();

        $('#title').val("");
        $('#rating').val("");

        $("#movie-table").find('tbody')
            .append($('<tr>')
                .append($('<td>')
                    .attr('class', 'title')
                    .text($title)
                )
                .append($('<td>')
                    .attr('class', 'rating')
                    .text($rating)
                )
                .append($('<td>')
                    .append($('<button>')
                        .attr('class', 'btn btn-danger delete')
                        .attr('type', 'delete')
                        .text('Delete')
                    )
                )
            );
    });

    //Delete row function
    $('tbody').on('click', '.delete', function () {
        $(this).closest('tr').remove();
    });


    //Sort function
    $('[name="sort"]').on('click', function () {
        var $sortBy;
        var $sortDir = "asc";
        $(this).addClass("table-primary");
        $(this).siblings().removeClass("table-primary");
        if ($(this).hasClass("title")) {
            $sortBy = ".title";
        }
        else if ($(this).hasClass("rating")) {
            $sortBy = ".rating";
        }
        else {
            console.log("Error no class to sort by");
            return;
        }
        if ($(this).hasClass("asc")) {
            $sortDir = "desc";
            $(this).removeClass("asc");
            $(this).addClass("desc");
            $(this).find('path#sortIcon').attr("d", path_d_desc);
        }
        else {
            $(this).removeClass("desc");
            $(this).addClass("asc");
            $(this).find("path#sortIcon").attr("d", path_d_asc);
        }
        sort($sortBy, $sortDir);
    })


    //Sort by rating
    function sort(sortBy, sortDir) {

        var rows = $('tbody').children();

        rows.sort(function (first, second) {
            var first_val = $(first).find(sortBy).text().toUpperCase();
            var second_val = $(second).find(sortBy).text().toUpperCase();
            if (sortDir == "asc") {
                return first_val.localeCompare(second_val, false, { numeric: true });
            }
            else if (sortDir == "desc") {
                return second_val.localeCompare(first_val, false, { numeric: true });
            }
        })

        $('tbody').append(rows);
    }
});



