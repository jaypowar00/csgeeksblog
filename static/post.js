var id;
window.onload = function(){
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var id_raw = url.searchParams.get('id');
        id = parseInt(id_raw,10);
        // console.log(id);
    } catch (error) {
        console.log(error);
    }
    
    if (Number.isInteger(id)){
        getData(id);
    }else{
        document.getElementById('d-2').innerHTML+=
        `<div class="container text-center">
        <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
        <div class="p-4 d-flex flex-column">
        <h3 class="mb-0">This Post Does not Exists!</h3>
        <p class="card-text mb-auto">The post you are trying to reach does not exists!</p>
        <p class="card-text mb-auto">This might be due to the post is deleted by admin or there is no such post.</p>
        </div>
        </div>
        </div>`;
    }
};
function getData(id){
    document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
    axios.get('https://redrangerpostgres1.herokuapp.com/blog/post?id='+id).then(response => {
        if(response['data']['success']){
            document.getElementById('d-2').innerHTML=``;
            tags = response.data.article.tags;
            tag = '';
            for(let i in tags){
                tag += '<a style="color:inherit; display:inline" class="text-success" href="index.html?tag='+tags[i]+'"> '+tags[i]+' </a>';
            }
            var md = new Remarkable();
            // console.log(response.data.article)
            var c = response.data.article.content;
            var vlink = response.data.article.vlink;
            if(vlink){
                link=`
                <div id="yt-link" class="container-fluid mb-4" style="height:25vw;min-height:200px;">
                    <iframe width="100%" height="100%" src="`+vlink+`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                `;
            }else{link='';}
            c = md.render(c);
            let d = new Date(Date.parse(response.data.article.created))
            // console.log(d.toDateString())
    
            document.getElementById('d-2').innerHTML+=
            `<div class="container">
                <div class="text-center d-lg-block">
                    <img class="bd-placeholder-img img-thumbnail-3" width="50%" height="auto" src='`+response['data']['article']['thumbnail']+`' alt='Thumbnail'>
                </div>
                <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
                    <div class="p-4 d-flex flex-column overflow-hidden">
                        <div class="mt-n3 mb-n1 text-muted text-right">`+d.toDateString()+`</div>
                        <h3 class="mb-0">`+response['data']['article']['title']+`</h3>
                        <a style="color:inherit;" class="block" href="author.html?name=`+response['data']['article']['author']+`">
                        <div class="mb-1 text-info">`+response['data']['article']['author']+`</div>
                        </a>
                        <span>
                        `+tag+`
                        </span>
                        <p class="card-text mb-auto">`+c+`</p>
                    </div>
                    `+link+`
                </div>
            </div>`;
        }else{
            document.getElementById('d-2').innerHTML=
            `<div class="container text-center">
            <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
            <div class="p-4 d-flex flex-column">
            <h3 class="mb-0">This Post Does not Exists!</h3>
            <p class="card-text mb-auto">The post you are trying to reach does not exists!</p>
            <p class="card-text mb-auto">This might be due to the post is deleted by admin or there is no such post.</p>
            </div>
            </div>
            </div>`;
        }
            
    });
};