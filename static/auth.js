var name;
window.onload = function(){
    try {
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var name = url.searchParams.get('name');
        // console.log(name);
    } catch (error) {
        console.log(error);
    }
    if (typeof name == 'string'){
        document.title = 'CS Geeks Blog | '+name;
        getData(undefined,name);
    }else{
        document.getElementById('d-2').innerHTML=``;
        document.getElementById('d-2').innerHTML+=
        `<div class="container text-center">
        <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
        <div class="p-4 d-flex flex-column">
        <h3 class="mb-0">Author Not Found!</h3>
        <p class="card-text mb-auto">Not enough information to search for the author you are looking for...</p>
        </div>
        </div>
        </div>`;
    }
    backtotop = document.getElementById('backtotop')
    backtotop.addEventListener('click', () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
        console.log('backtotop clicked');
    }
    );
};
const filterBy=(tag)=>{
    try {
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var name = url.searchParams.get('name');
        // console.log(name);
    } catch (error) {
        console.log(error);
    }
    if (name){
    window.location.href='/?author='+name+'&tag='+tag;
    }
    else
    window.location.href='/?tag='+tag;
}
function getData(tag=undefined,name,order=undefined,orderby=undefined){
    let blog_tags ;
    document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
    axios.get('https://redrangerpostgres1.herokuapp.com/blog?get=tags').then(response => {
        if(response.data.success)
        blog_tags = response.data.tags
    }).finally(()=>{
            
                    var div = document.getElementById('navbar-tags');
                    div.innerHTML='';
                    if(blog_tags.length>0)
                    div.innerHTML='<section class="text-muted p-2">Tags:</section>';
                    for (const tag in blog_tags) {
                        if (blog_tags.hasOwnProperty(tag)) {
                            const t = blog_tags[tag];
                            div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="filterBy('`+t+`')">`+t+`</a>`;
                        }
                    }
    });
    axios.get('https://redrangerpostgres1.herokuapp.com/blog/author?name='+name).then(response => {
        if(response['data']['success']){
            // console.log(response['data']);
            document.getElementById('d-2').innerHTML=``;
            let tempo = '';
            social = response['data']['author']['social'];
            for (let index = 0; index < social.length; index++) {
                tempo += '<p class="card-text mb-auto"><a href="'+social[index].url+'">'+social[index].name+'</a></p>';
            }
            document.title = "CS Geeks | "+response['data']['author']['rname'];
            document.querySelector('meta[name="description"]').setAttribute("content", response['data']['author']['bio']);
            document.getElementById('d-2').innerHTML+=
            `<div class="container">
            <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
            <div class="p-4 d-flex flex-column">
            <h3 class="mb-1">Author : `+response['data']['author']['name']+`</h3>
            <div class="mb-1">Name : `+response['data']['author']['rname']+`</div>
            <div class="mb-1">Bio : `+response['data']['author']['bio']+`</div>
            <p class="card-text mb-auto">E-mail : <a href="mailto:`+response['data']['author']['mail']+`">`+response['data']['author']['mail']+`</a></p>
            <p class="card-text mb-auto">Social Links :</p>
            `+tempo+`
            </div>
            </div>
            </div>`;
            axios.get('https://redrangerpostgres1.herokuapp.com/blog/posts?author='+name).then(response => {
            // console.log(response.data);
            if(response.data.success&&response.data.articles.length>0){;
                for (let index = 0; index < response.data.articles.length ; index++) {
                    description = response.data.articles[index].description?response.data.articles[index].description:'';
                    let d = new Date(Date.parse(response.data.articles[index].created))
                    document.getElementById('d-2').innerHTML+=
                    `<div class="container col-md-6">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="blog-cards">
                    <div class="col p-4 d-flex flex-column position-static">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`">
                    <h3 class="mb-0">`+response.data.articles[index].title+`</h3>
                    </a>
                    <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/author?name=`+response.data.articles[index].author+`">
                    <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                    </a>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`">
                    <p class="card-text mb-auto">`+description+`</p>
                    <p class="card-text mb-auto">Click to see detail...</p>
                    </a>
                    </div>
                    <div class="d-lg-block" id="tb-1">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`">
                    <img class="bd-placeholder-img" id="img-thumbnail" width="200" height="100%" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    <div class="text-center d-lg-block" id="tb-2">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`">
                    <img class="bd-placeholder-img" id="img-thumbnail-2" width="60%" height="auto" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    </div>
                    </div>
                    </div>`;
                    // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><imgage href="`+response['data']['articles'][index]['thumbnail']+`"x="0" y="0" height="50px" width="50px"/></svg>
                }
            }
        });
        }else{
            document.getElementById('d-2').innerHTML=``;
            document.getElementById('d-2').innerHTML+=
            `<div class="container text-center">
            <div class="no-gutters border rounded mb-4 shadow-sm position-relative">
            <div class="p-4 d-flex flex-column">
            <h3 class="mb-0">This Author Does not Exists!</h3>
            <p class="card-text mb-auto">The information provided about Author didn't match to any of the existing authors!</p>
            </div>
            </div>
            </div>`;
        }
            
    }).catch(res=>{
        console.log(res);
    });
};