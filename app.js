const getData = () => {
    axios.get('https://csgeeks-blog-api.onrender.com/blog/posts').then(response => {
        console.log(response['data']);
        if(response['data']['articles']['length']>0){
            document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr><div class="container row mb-2" id="d-2"></div>';
            for (let index = 0; index < response['data']['articles']['length'] ; index++) {
                // console.log('_id:'+ typeof(response['data']['posts'][index]['_id']) );
                // console.log('title:'+ typeof(response['data']['posts'][index]['title']) );
                // console.log('author:'+ typeof(response['data']['posts'][index]['author']) );
                document.getElementById('d-2').innerHTML+=
                // `<div class="container text-info" onclick="openpost(`+response['data']['posts'][index]['_id']+`)">
                //     <p>id:`+response['data']['posts'][index]['_id']+`</p>
                //     <p>title:`+response['data']['posts'][index]['title']+`</p>
                //     <p>author:`+response['data']['posts'][index]['author']+`</p>
                // </div><hr>`;
                `<div class="container col-md-6" onclick="openpost(`+response['data']['articles'][index]['_id']+`)">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <h3 class="mb-0">`+response['data']['articles'][index]['title']+`</h3>
                            <div class="mb-1 text-muted">`+response['data']['articles'][index]['author']+`</div>
                            <p class="card-text mb-auto">Click to see detail...</p>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                        <img src="`+response['data']['articles'][index]['thumbnail']+`" alt="thumbnail" width="200" height="250">
                        </div>
                    </div>
                </div>`;
                // document.getElementById('d-2').innerHTML+='<p>title:'+response['data']['posts'][index]['title']+'</p>';
                // document.getElementById('d-2').innerHTML+='<p>author:'+response['data']['posts'][index]['author']+'</p></div><hr>';
            }
        }
    });
};

const postData = () => {
    let form = document.forms["form-1"];
    if (form.title.value && form.content.value && form.author.value && form.thumbnail.value && form.tags.value) {
        var title = form.title.value;
        var content = form.content.value;
        var author = form.author.value;
        var description = '';
        if( form.description.value)
            description = form.description.value;
        var tags = form.tags.value
        var thumbnail = form.thumbnail.value;
        if (title != "" && content != "" && author != "" && thumbnail != "" && tags != "") {
            var data = new FormData();
            data.append('title',title);
            data.append('content',content);
            data.append('author',author);
            data.append('description',description);
            data.append('thumbnail',thumbnail);
            data.append('tags',tags);
        }
        axios.post('https://csgeeks-blog-api.onrender.com/blog/create',data,{
            headers:{
                'C_AUTH':process.env.CS_HEADER
            }
        }).then(response => {
            console.log(response['data']);
            document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
        }).catch(err => {
            console.log(err.response.data);
            document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(err.response.data)+'</p></div><hr>';
        });
    }
};
const delData = () => {
    axios.post('https://csgeeks-blog-api.onrender.com/blog/post/delete',undefined,{
        headers:{
            'C_AUTH':process.env.CS_HEADER
        }
    }).then(response => {
        console.log(response['data']);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
    });
};
const openpost = (id) => {
    alert(id);
}