var id;
window.onload = function(){
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var id_raw = url.searchParams.get('id');
        id = parseInt(id_raw,10);
        console.log(id);
    } catch (error) {
        console.log(error);
    }
    getData(id);
};
function getData(id){
    axios.get('https://redrangerpostgres1.herokuapp.com/blog/posts/id='+id).then(response => {
        console.log(response['data']['post '+id]);

                document.getElementById('d-2').innerHTML+=
                `<div class="container">
                <div class="text-center d-lg-block">
                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
                <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
                <div class="p-4 d-flex flex-column">
                <h3 class="mb-0">`+response['data']['post '+id]['title']+`</h3>
                <div class="mb-1 text-muted">`+response['data']['post '+id]['author']+`</div>
                <p class="card-text mb-auto">`+response['data']['post '+id]['content']+`</p>
                </div>
                </div>
                </div>`;
    });
};