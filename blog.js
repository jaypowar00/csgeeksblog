
const openpost = (id) => {
    window.location = "post.html?id="+id;
}
function getData(){
    axios.get('https://redrangerpostgres1.herokuapp.com/blog/posts').then(response => {
        console.log(response['data']);
        if(response['data']['posts']['length']>0){;
            for (let index = 0; index < response['data']['posts']['length'] ; index++) {
                document.getElementById('d-2').innerHTML+=
                `<div class="container col-md-6" onclick="openpost(`+response['data']['posts'][index]['_id']+`)">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">`+response['data']['posts'][index]['title']+`</h3>
                <div class="mb-1 text-muted">`+response['data']['posts'][index]['author']+`</div>
                <p class="card-text mb-auto">Click to see detail...</p>
                </div>
                <div class="col-auto d-none d-lg-block">
                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
                </div>
                </div>`;
            }
        }
    });
};
const postData = () => {
    const title = document.forms["form-1"]["title"].value;
    const content = document.forms["form-1"]["content"].value;
    const author = document.forms["form-1"]["author"].value;
    if (title != "" && content != "" && author != "" ) {
        var data = new FormData();
        data.append('title',title);
        data.append('content',content);
        data.append('author',author);
    }
    axios.post('https://redrangerpostgres1.herokuapp.com/blog/post',data,{
        headers:{
            'C_AUTH':'?Rkqj98_hNV77aR67MRQhXz6_WC7XApXdG8@'
        }
    }).then(response => {
        console.log(response['data']);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
    }).catch(err => {
        console.log(err.response.data);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(err.response.data)+'</p></div><hr>';
    });
};
const delData = () => {
    axios.post('https://redrangerpostgres1.herokuapp.com/blog/post/delete',undefined,{
        headers:{
            'C_AUTH':'?Rkqj98_hNV77aR67MRQhXz6_WC7XApXdG8@'
        }
    }).then(response => {
        console.log(response['data']);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
    });
};