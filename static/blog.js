window.onload = function(){
    
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    // toastr["success"]("Welcome To CS Geeks Official Blog!");
    try {
        var url_string = (window.location.href);
        var url = new URL(url_string);
        // console.log(url);
        var tag = url.searchParams.get('tag');
        var author = url.searchParams.get('author');
        var orderby = url.searchParams.get('orderby');
        var order = url.searchParams.get('order');
        // console.log(order);
        // console.log(orderby);
        // console.log(author);
        // console.log(tag);
    } catch (error) {
        console.log(error);
    }
    if(tag && author && orderby && order){
        // console.log('auth('+author+') tag('+tag+') orderby('+orderby+') order('+order+')');
        getData(tag,author,orderby,order)
    }
    else if(tag && author && orderby){
        // console.log('both auth('+author+') tag('+tag+') orderby('+orderby+')');
        getData(tag,author,orderby)
    }
    else if(tag && author && order){
        // console.log('both auth('+author+') tag('+tag+') order('+order+')');
        getData(tag,author,undefined,order)
    }
    else if(tag && author){
        // console.log('both auth('+author+') tag('+tag+')');
        getData(tag,author)
    }
    else if (tag){
        // console.log('only tag');
        getData(tag=tag);
    }
    else if (author){
        // console.log('only auth');
        getData(undefined,author=author);
    }
    else{
        getData();
    }
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        // console.info( "This page is reloaded" );
        window.location.href='/csgeeksblog/';
    }
    //function for action for hovering above dropdown button
    $('#dropdown-btn,.dropdown-menu').hover(function() {
        $('.dropdown').addClass('show');
        $('.dropdown').find('.dropdown-menu').addClass('show');
    },
    function() {
        $('.dropdown').removeClass('show');
        $('.dropdown').find('.dropdown-menu').removeClass('show');
    });
    //function for action after dropdown-item click
    $('.dropdown-item').click(function() {
        $('.dropdown').removeClass('show');
        $('.dropdown').find('.dropdown-menu').removeClass('show');
    });
    $(".dropdown-menu a").click(function () {
        var selText = $(this).text();
        $("#dropdown-btn").html(selText);
    });
    // let input=document.getElementById('search-input');
    // input.addEventListener('keyup',(e)=>{});
    btn = document.getElementById('search-btn')
    btn.addEventListener('click', () => window.scrollTo({
        top: 250,
        behavior: 'smooth',
      }));
    backtotop = document.getElementById('backtotop')
    backtotop.addEventListener('click', () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
        console.log('backtotop clicked');
    }
    );
}
function getData(tag=undefined,author=undefined,orderby='created',order='desc',search=false){
    let blog_tags ;
    axios.get('https://csgeeks-blog-api.onrender.com/blog?get=tags').then(response => {
        if(response.data.success)
        blog_tags = response.data.tags
        blog_tags.sort();
        if(blog_tags.length>0){
            document.getElementById('navbarscroller').innerHTML=
            `
            <label for="navbar-tags" class="d-inline-flex scrollable-tags"><span class="p-2 text-muted">Tags:</span>
            <nav class="nav justify-content-start" id="navbar-tags" >
              
            </nav>
            </label>
            `;
        }
    }).finally(()=>{
        // console.log(blog_tags)
        // console.log('ok')
        try {
            var url_string = (window.location.href);
            var url = new URL(url_string);
            // console.log('data1');
            // console.log(order);
            // console.log(orderby);
            // console.log(author);
            // console.log(tag);
            if(!orderby)
            {orderby = url.searchParams.get('orderby')?url.searchParams.get('orderby'):'created';}
            if(!order)
            {order = url.searchParams.get('order')?url.searchParams.get('order'):'desc';}
            if(!author)
            {author = url.searchParams.get('author')?url.searchParams.get('author'):undefined;}
            if(!tag)
            {tag = url.searchParams.get('tag')?url.searchParams.get('tag'):undefined;}
            // console.log('data2');
            // console.log(order);
            // console.log(orderby);
            // console.log(author);
            // console.log(tag);
            if(tag||author){
                var div = document.getElementById('navbar-sort');
                var divs = div.getElementsByTagName('a');
                if(tag&&author){
                    if(search)
                    {
                        divs[0].setAttribute('onclick',"getData('"+tag+"','"+author+"','created','desc',"+true+")")
                        divs[1].setAttribute('onclick',"getData('"+tag+"','"+author+"','created','asc',"+true+")")
                        divs[2].setAttribute('onclick',"getData('"+tag+"','"+author+"','title','asc',"+true+")")
                        divs[3].setAttribute('onclick',"getData('"+tag+"','"+author+"','title','desc',"+true+")")
                        divs[4].setAttribute('class',"dropdown-item disabled")
                        divs[5].setAttribute('class',"dropdown-item disabled")
                    }else
                    {
                        divs[0].setAttribute('onclick',"getData('"+tag+"','"+author+"','created','desc')")
                        divs[1].setAttribute('onclick',"getData('"+tag+"','"+author+"','created','asc')")
                        divs[2].setAttribute('onclick',"getData('"+tag+"','"+author+"','title','asc')")
                        divs[3].setAttribute('onclick',"getData('"+tag+"','"+author+"','title','desc')")
                        divs[4].setAttribute('class',"dropdown-item disabled")
                        divs[5].setAttribute('class',"dropdown-item disabled")
                    }
                }
                else if(tag){
                    if(search){
                        divs[0].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'created','desc',"+true+")")
                        divs[1].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'created','asc',"+true+")")
                        divs[2].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'title','asc',"+true+")")
                        divs[3].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'title','desc',"+true+")")
                        divs[4].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'author','asc',"+true+")")
                        divs[5].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'author','desc',"+true+")")
                    }else{
                        divs[0].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'created','desc')")
                        divs[1].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'created','asc')")
                        divs[2].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'title','asc')")
                        divs[3].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'title','desc')")
                        divs[4].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'author','asc')")
                        divs[5].setAttribute('onclick',"getData('"+tag+"',"+undefined+",'author','desc')")
                    }
                }
                else if(author){
                    if(search){
                        divs[0].setAttribute('onclick',"getData("+undefined+",'"+author+"','created','desc',"+true+")")
                        divs[1].setAttribute('onclick',"getData("+undefined+",'"+author+"','created','asc',"+true+")")
                        divs[2].setAttribute('onclick',"getData("+undefined+",'"+author+"','title','asc',"+true+")")
                        divs[3].setAttribute('onclick',"getData("+undefined+",'"+author+"','title','desc',"+true+")")
                        divs[4].setAttribute('class',"dropdown-item disabled")
                        divs[5].setAttribute('class',"dropdown-item disabled")
                    }else{
                        divs[0].setAttribute('onclick',"getData("+undefined+",'"+author+"','created','desc')")
                        divs[1].setAttribute('onclick',"getData("+undefined+",'"+author+"','created','asc')")
                        divs[2].setAttribute('onclick',"getData("+undefined+",'"+author+"','title','asc')")
                        divs[3].setAttribute('onclick',"getData("+undefined+",'"+author+"','title','desc')")
                        divs[4].setAttribute('class',"dropdown-item disabled")
                        divs[5].setAttribute('class',"dropdown-item disabled")
                    }
                }
            }
            else{
                var div = document.getElementById('navbar-sort');
                var divs = div.getElementsByTagName('a');
                if(search){
                    divs[0].setAttribute('onclick',"getData("+undefined+","+undefined+",'created','desc',"+true+")")
                    divs[1].setAttribute('onclick',"getData("+undefined+","+undefined+",'created','asc',"+true+")")
                    divs[2].setAttribute('onclick',"getData("+undefined+","+undefined+",'title','asc',"+true+")")
                    divs[3].setAttribute('onclick',"getData("+undefined+","+undefined+",'title','desc',"+true+")")
                    divs[4].setAttribute('onclick',"getData("+undefined+","+undefined+",'author','asc',"+true+")")
                    divs[5].setAttribute('onclick',"getData("+undefined+","+undefined+",'author','desc',"+true+")")
                }else{
                    divs[0].setAttribute('onclick',"getData("+undefined+","+undefined+",'created','desc')")
                    divs[1].setAttribute('onclick',"getData("+undefined+","+undefined+",'created','asc')")
                    divs[2].setAttribute('onclick',"getData("+undefined+","+undefined+",'title','asc')")
                    divs[3].setAttribute('onclick',"getData("+undefined+","+undefined+",'title','desc')")
                    divs[4].setAttribute('onclick',"getData("+undefined+","+undefined+",'author','asc')")
                    divs[5].setAttribute('onclick',"getData("+undefined+","+undefined+",'author','desc')")
                }
            }
            if(order||orderby){
                var div = document.getElementById('navbar-tags');
                var divs = div.getElementsByTagName('a');
                if(order&&orderby&&author){
                    if(tag){
                        var div = document.getElementById('navbar-tags');
                        div.innerHTML='';
                        temp=tag;
                        for (const tag in blog_tags) {
                            if (blog_tags.hasOwnProperty(tag)) {
                                const t = blog_tags[tag];
                                if(temp!=t)
                                    if(search)
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`','`+author+`','`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                    else
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`','`+author+`','`+orderby+`','`+order+`')">`+t+`</a>`;
                                else
                                if(search)
                                    div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData(`+undefined+`,'`+author+`','`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                else
                                    div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData(`+undefined+`,'`+author+`','`+orderby+`','`+order+`')">`+t+`</a>`;
                            }
                        }
                    }else{
                        var div = document.getElementById('navbar-tags');
                        div.innerHTML='';
                        for (const tag in blog_tags) {
                            if (blog_tags.hasOwnProperty(tag)) {
                                const t = blog_tags[tag];
                                if(search)
                                    div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`','`+author+`','`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                else
                                    div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`','`+author+`','`+orderby+`','`+order+`')">`+t+`</a>`;
                            }
                        }
                    }
                }
                else if(order&&orderby){
                    if(tag){
                        var div = document.getElementById('navbar-tags');
                        div.innerHTML='';
                        temp=tag;
                        for (const tag in blog_tags) {
                            if (blog_tags.hasOwnProperty(tag)) {
                                const t = blog_tags[tag];
                                if(temp!=t)
                                    if(search)
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`',`+undefined+`,'`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                    else
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`',`+undefined+`,'`+orderby+`','`+order+`')">`+t+`</a>`;
                                else
                                    if(search)
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData(`+undefined+`,`+undefined+`,'`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                    else
                                        div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData(`+undefined+`,`+undefined+`,'`+orderby+`','`+order+`')">`+t+`</a>`;
                            }
                        }
                    }else{
                        var div = document.getElementById('navbar-tags');
                        div.innerHTML='';
                        for (const tag in blog_tags) {
                            if (blog_tags.hasOwnProperty(tag)) {
                                const t = blog_tags[tag];
                                if(search)
                                    div.innerHTML+=`<a class="p-2 text-muted" href="javascript:;" onclick="getData('`+t+`',`+undefined+`,'`+orderby+`','`+order+`',`+true+`)">`+t+`</a>`;
                                else
                                    div.innerHTML+=`<a class="rounded p-2 text-muted" href="javascript:;" onclick="getData('`+t+`',`+undefined+`,'`+orderby+`','`+order+`')">`+t+`</a>`;
                            }
                        }
                    }
                }
            }
        }catch (error) {
            console.log(error);
        }
    });
    if(tag&&author){
        var searchString;
        if(search){
            searchString=document.forms['search-form'].search.value;
            if(searchString){
                document.getElementById('d-2').innerHTML='<div class="container text-muted text-center ">search results for "'+searchString+'"</div><br>';
                document.getElementById('d-2').innerHTML+=`
                    <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                        <div class="sk-wave-rect"></div>
                        <div class="sk-wave-rect"></div>
                        <div class="sk-wave-rect"></div>
                        <div class="sk-wave-rect"></div>
                        <div class="sk-wave-rect"></div>
                    </div><br><br><br>
                    `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?search=`+searchString+`&`+`tag=`+tag+`&author=`+author+`&orderby=`+orderby+`&order=`+order;
                // console.log('formdata-> '+searchString);
            }
            else{
                document.getElementById('d-2').innerHTML=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?tag=`+tag+`&author=`+author+`&orderby=`+orderby+`&order=`+order;
            }
        }else{
            document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
            query = `https://csgeeks-blog-api.onrender.com/blog/posts?tag=`+tag+`&author=`+author+`&orderby=`+orderby+`&order=`+order;
        }
        axios.get(query).then(response => {
            // console.log(response.data);
            if(response.data.success&&response.data.articles.length>0){
                if(searchString)
                    document.getElementById('d-2').innerHTML='<div class="container text-muted text-center ">search results for "'+searchString+'"</div>';
                else
                    document.getElementById('d-2').innerHTML=``;
                document.getElementById('d-2').innerHTML+=`<div class="container text-center mb-3">filtered by `+author+`(Author) & `+tag+`(Tag)</div>`;
                for (let index = 0; index < response.data.articles.length ; index++) {
                    description = response.data.articles[index].description?response.data.articles[index].description:'';
                    let d = new Date(Date.parse(response.data.articles[index].created))
                    document.getElementById('d-2').innerHTML+=
                    `<div class="container col-md-6">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="blog-cards">
                    <div class="col p-4 d-flex flex-column position-static">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <h3 class="mb-0">`+response.data.articles[index].title+`</h3>
                    </a>
                    <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/author?name=`+response.data.articles[index].author+`">
                    <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                    </a>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <p class="card-text mb-auto">`+description+`...</p>
                    </a>
                    </div>
                    <div class="d-lg-block" id="tb-1">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <img class="bd-placeholder-img" id="img-thumbnail" width="200" height="100%" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    <div class="text-center d-lg-block" id="tb-2">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <img class="bd-placeholder-img" id="img-thumbnail-2" width="60%" height="auto" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    </div>
                    </div>
                    </div>`;
                    // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><imgage href="`+response['data']['articles'][index]['thumbnail']+`"x="0" y="0" height="50px" width="50px"/></svg>
                }
            }else{
                if(searchString){
                    // toastr["error"]("Try again with different search...", "Search Failed!")
                    document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div><br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>`;
                }else{
                document.getElementById('d-2').innerHTML=`<div class="container text-center mb-3">filtered by `+author+`(Author) & `+tag+`(Tag)</div>`;
                document.getElementById('d-2').innerHTML+=
                    `<div class="container text-center col-md-6">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >
                    <div class="col p-4 d-flex flex-column position-static">
                    <h3 class="mb-0">No Posts!</h3>
                    <p class="card-text mb-auto">`+author+` does not have any post having tag as `+tag+`</p>
                    </div>
                    </div>
                    </div>
                    </div>`;
                }
            }
        });
    }
    else if(author){
        var searchString;
        if(search){
            searchString=document.forms['search-form'].search.value;
            if(searchString){
                document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div>`;
                document.getElementById('d-2').innerHTML+=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?search=`+searchString+`&`+`author=`+author+`&orderby=`+orderby+`&order=`+order
                // console.log('formdata-> '+searchString);
            }
            else{
                document.getElementById('d-2').innerHTML=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?author=`+author+`&orderby=`+orderby+`&order=`+order
            }
        }else{
            document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
            query = `https://csgeeks-blog-api.onrender.com/blog/posts?author=`+author+`&orderby=`+orderby+`&order=`+order
        }
        axios.get('https://csgeeks-blog-api.onrender.com/blog/posts?author='+author+'&orderby='+orderby+"&order="+order).then(response => {
            // console.log(response.data);
            if(response.data.success&&response.data.articles.length>0){
                if(searchString)
                    document.getElementById('d-2').innerHTML='<div class="container text-muted text-center ">search results for "'+searchString+'"</div>';
                else
                    document.getElementById('d-2').innerHTML=``;
                document.getElementById('d-2').innerHTML+=`<div class="container text-center mb-3">filtered by `+author+`(Author)</div>`;
                for (let index = 0; index < response.data.articles.length ; index++) {
                    description = response.data.articles[index].description?response.data.articles[index].description:'';
                    let d = new Date(Date.parse(response.data.articles[index].created))
                    document.getElementById('d-2').innerHTML+=
                    `<div class="container col-md-6">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="blog-cards">
                    <div class="col p-4 d-flex flex-column position-static">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <h3 class="mb-0">`+response.data.articles[index].title+`</h3>
                    </a>
                    <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/author?name=`+response.data.articles[index].author+`">
                    <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                    </a>
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <p class="card-text mb-auto">`+description+`...</p>
                    </a>
                    </div>
                    <div class="d-lg-block" id="tb-1">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <img class="bd-placeholder-img" id="img-thumbnail" width="200" height="100%" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    <div class="text-center d-lg-block" id="tb-2">
                    <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                    <img class="bd-placeholder-img" id="img-thumbnail-2" width="60%" height="auto" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                    </a>
                    </div>
                    </div>
                    </div>
                    </div>`;
                    // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><imgage href="`+response['data']['articles'][index]['thumbnail']+`"x="0" y="0" height="50px" width="50px"/></svg>
                }
            }else{
                if(searchString){
                    // toastr["error"]("Try again with different search...", "Search Failed!")
                    document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div><br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>`;
                }else{
                document.getElementById('d-2').innerHTML=`<div class="container text-center mb-3">filtered by `+author+`(Author)</div>`;
                document.getElementById('d-2').innerHTML+=
                    `<div class="container text-center col-md-6">
                    <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                    <h3 class="mb-0">No Posts!</h3>
                    </div>
                    </div>
                    </div>
                    </div>`;
                }
            }
        });
    }
    else if(tag){
        var searchString;
        if(search){
            searchString=document.forms['search-form'].search.value;
            if(searchString){
                document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div>`;
                document.getElementById('d-2').innerHTML+=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?search=`+searchString+`&`+`tag=`+tag+`&orderby=`+orderby+`&order=`+order
                // console.log('formdata-> '+searchString)
            }
            else{
                document.getElementById('d-2').innerHTML=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?tag=`+tag+`&orderby=`+orderby+`&order=`+order
            }
        }
        else{
            document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
            query = `https://csgeeks-blog-api.onrender.com/blog/posts?tag=`+tag+`&orderby=`+orderby+`&order=`+order
        }
        axios.get(query).then(response => {
            // console.log(response.data);
            if(response.data.success&&response.data.articles.length>0){
                if(searchString)
                    document.getElementById('d-2').innerHTML='<div class="container text-muted text-center ">search results for "'+searchString+'"</div>';
                else
                    document.getElementById('d-2').innerHTML=``;
                document.getElementById('d-2').innerHTML+=`<div class="container text-center mb-3">filtered by `+tag+`(Tag)</div>`;
            for (let index = 0; index < response.data.articles.length ; index++) {
                description = response.data.articles[index].description?response.data.articles[index].description:'';
                let d = new Date(Date.parse(response.data.articles[index].created))
                document.getElementById('d-2').innerHTML+=
                `<div class="container col-md-6">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="blog-cards">
                <div class="col p-4 d-flex flex-column position-static">
                <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                <h3 class="mb-0">`+response.data.articles[index].title+`</h3>
                </a>
                <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                <a style="color:inherit;" class="block" href="/csgeeksblog/author?name=`+response.data.articles[index].author+`">
                <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                </a>
                <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                <p class="card-text mb-auto">`+description+`...</p>
                </a>
                </div>
                <div class="d-lg-block" id="tb-1">
                <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                <img class="bd-placeholder-img" id="img-thumbnail" width="200" height="100%" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                </a>
                </div>
                <div class="text-center d-lg-block" id="tb-2">
                <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                <img class="bd-placeholder-img" id="img-thumbnail-2" width="60%" height="auto" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                </a>
                </div>
                </div>
                </div>
                </div>`;
                // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><imgage href="`+response['data']['articles'][index]['thumbnail']+`"x="0" y="0" height="50px" width="50px"/></svg>
            }
        }else{
            if(searchString){
                toastr["error"]("Try again with different search...", "Search Failed!")
                document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div><br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>`;
            }else{
                document.getElementById('d-2').innerHTML='<br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>';
                document.getElementById('d-2').innerHTML+=`<div class="container text-center mb-3">filtered by `+tag+`(Tag)</div>`;
                document.getElementById('d-2').innerHTML+=
                `<div class="container text-center col-md-6">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">No Posts!</h3>
                </div>
                </div>
                </div>
                </div>`;
            }
        }
    });
    }
    else{
        var searchString;
        if(search){
            var searchString=document.getElementById('search-input').value;
            if(searchString){
                document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div>`;
                document.getElementById('d-2').innerHTML+=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                var selText = $(".dropdown-menu a").first().text();
                $("#dropdown-btn").html(selText);
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?search=`+searchString+`&`+`orderby=`+orderby+`&order=`+order
                // console.log('formdata-> '+searchString);
            }
            else{
                document.getElementById('d-2').innerHTML=`
                <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                    <div class="sk-wave-rect"></div>
                </div><br><br><br>
                `;
                query = `https://csgeeks-blog-api.onrender.com/blog/posts?`+`orderby=`+orderby+`&order=`+order
            }
        }else{
            document.getElementById('d-2').innerHTML=`
            <div class="sk-wave mb-3 sk-center" style="inline-size: 70px;block-size: 70px;">
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
                <div class="sk-wave-rect"></div>
            </div><br><br><br>
            `;
            query = `https://csgeeks-blog-api.onrender.com/blog/posts?`+`orderby=`+orderby+`&order=`+order
        }
        var selText = $(".dropdown-menu a").first().text();
        $("#dropdown-btn").html(selText);

        axios.get(query).then(response => {
            // console.log(response.data);
            if(response.data.success&&response.data.articles.length>0){
                if(searchString)
                    document.getElementById('d-2').innerHTML='<div class="container text-muted text-center ">search results for "'+searchString+'"</div>';
                else
                    document.getElementById('d-2').innerHTML=``;
                for (let index = 0; index < response.data.articles.length ; index++) {
                    description = response.data.articles[index].description?response.data.articles[index].description:'';
                    let d = new Date(Date.parse(response.data.articles[index].created))
                    document.getElementById('d-2').innerHTML+=
                    `<div class="container col-md-6 my-3">
                        <div class="card row no-gutters overflow-hidden rounded flex-md-row mb-4 shadow-sm position-relative" id="blog-cards">
                            <div class="col p-4 d-flex flex-column position-static">
                                <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                                    <h3 class="card-title mb-0">`+response.data.articles[index].title+`</h3>
                                </a>
                            <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                            <a style="color:inherit;" class="block" href="/csgeeksblog/author?name=`+response.data.articles[index].author+`">
                                <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                            </a>
                            <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                                <p class="card-text mb-auto">`+description+`</p>
                            </a>
                        </div>
                        <div class="d-lg-block card-img-right" id="tb-1">
                            <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                                <img class="bd-placeholder-img" id="img-thumbnail" width="200" height="100%" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail'>
                            </a>
                        </div>
                        <div class="d-lg-block" id="tb-2">
                            <a style="color:inherit;" class="block" href="/csgeeksblog/post?id=`+response.data.articles[index]._id+`&a=`+response.data.articles[index].title.toLowerCase().split(' ').join('-')+`">
                                <img class="bd-placeholder-img" id="img-thumbnail-2" width="60%" height="auto" src='`+response.data.articles[index].thumbnail+`' alt='Thumbnail' loading="lazy">
                                </a>
                        </div>
                    </div>
                </div>
                    </div>`;
                    // <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><imgage href="`+response['data']['articles'][index]['thumbnail']+`"x="0" y="0" height="50px" width="50px"/></svg>
                    // console.log('timer')
                }
            }else{
                if(searchString){
                    // toastr["error"]("Try again with different search...", "Search Failed!")
                    document.getElementById('d-2').innerHTML=`<div class="container text-muted text-center ">search results for "`+searchString+`"</div><br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>`;
                }else
                document.getElementById('d-2').innerHTML='<br><h3 class="container text-center mb-3" id="blog-card">Nothing Found !</h3>';
            }
        });
    }
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
    axios.post('https://csgeeks-blog-api.onrender.com/blog/post',data,{
        headers:{
            'C_AUTH':process.env.CS_HEADER
        }
    }).then(response => {
        // console.log(response['data']);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
    }).catch(err => {
        console.log(err.response.data);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(err.response.data)+'</p></div><hr>';
    });
};
const delData = () => {
    axios.post('https://csgeeks-blog-api.onrender.com/blog/post/delete',undefined,{
        headers:{
            'C_AUTH':process.env.CS_HEADER
        }
    }).then(response => {
        // console.log(response['data']);
        document.getElementById('d-1').innerHTML='<hr><div class="container text-success text-center">result:<br><p>'+JSON.stringify(response['data'])+'</p></div><hr>';
    });
};