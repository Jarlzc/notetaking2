console.log('WORKING')


$('.del').on('click', function (event) {
    // console.log('clicked', this.attr('data-id'));
    console.log(event.target.dataset.id);
    let delnum = event.target.dataset.id;
    $.ajax({
        type: "POST",
        url: `delete/${delnum}`,
        success: function () {
            window.location = '/';
        }
    })
    })




$('.add').on('click', function (event) {
    $.ajax({
        type: "GET",
        url: '/',
    })
})