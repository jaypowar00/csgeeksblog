var token;
var timedRedirect;
window.onload=()=>{
    token=getCookie('access_token_cookie')
    backtotop = document.getElementById('backtotop')
    backtotop.addEventListener('click', () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    }
    );
}
const loginpageload =()=>{
    token=getCookie('access_token_cookie')
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            document.getElementById('login-btn').disabled = true;
            document.getElementById('response-msg').innerHTML='--> Successfully Logged In <--<br>(redirecting to admin page shortly...)';
            timedRedirect=setTimeout(function(){
                document.location.href='/csgeeksblog/admin/admin';
            },3000)
        }
        else{
            document.getElementById('logout-btn').disabled = true;
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.getElementById('response-msg').innerHTML='--> Not Logged in! <--<br>(please login in to continue...)';
        }
        // var cookie = res.headers['set-cookie'];
        // console.log('cookies:');
        // console.log(cookie);
        // var cookie = document.cookie;
        // console.log(cookie);
    }).catch(res=>{
        document.getElementById('response-msg').innerHTML='error: '+res;
    });
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
const login=()=>{
    document.getElementById('response-msg').innerHTML=`(confirming login...)<br><br>
    <div class="sk-wave sk-center">
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
    </div><br>
    `
    var form = document.forms['form-1'];
    var name = form['username'].value;
    var pass = form['password'].value;
    var data = new FormData();
    data.append('username',name);
    data.append('password',pass);
    // console.log(token)
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login';
    axios.post(query,data).then(res=>{
        // console.log(res);
        if (res.data['token'])
            document.cookie = "access_token_cookie="+res.data['token'];
        token=res.data['token']
        // console.log("access api token is")
        // console.log(token)
        if(res.data['already_logged_in']){
            document.getElementById('login-btn').disabled = true;
            document.getElementById('logout-btn').disabled = false;
            document.getElementById('response-msg').innerHTML=`already logged in!(redirecting to admin page shortly...)<br><br>
            <div class="sk-chase sk-center">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            </div><br>
            `;
            timedRedirect=setTimeout(function(){
                document.location.href='/csgeeksblog/admin/admin';
            },3000)
        }
        else{
            if(res.data['success']){
            document.getElementById('login-btn').disabled = true;
            document.getElementById('logout-btn').disabled = false;
            document.getElementById('response-msg').innerHTML=res.data.response+`<br>(redirecting to admin page shortly...)<br><br>
            <div class="sk-chase sk-center">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            </div><br>
            `;
            timedRedirect=setTimeout(function(){
                document.location.href='/csgeeksblog/admin/admin';
            },3000)
        }else{
            document.getElementById('login-btn').disabled = false;
            document.getElementById('logout-btn').disabled = true;
            document.getElementById('response-msg').innerHTML=res.data.response+`<br>`
            }
        }
        // console.log('cookies:');
        // var cookie = document.cookie['access_token_cookie'];
        // console.log(cookie);
    }).catch(res=>{
        document.getElementById('response-msg').innerHTML='error: '+res;
    });
};
const logout=()=>{
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res)
        if(res.data['success']){
            clearTimeout(timedRedirect);
            var query = 'https://csgeeks-blog-api.onrender.com/blog/logout?token='+token;
            axios.get(query).then(res=>{

            }).catch(res=>{
                console.log(res)
                document.getElementById('response-msg').innerHTML='error: '+res.data;
            })
            // document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            token=undefined;
            document.getElementById('logout-btn').disabled = true;
            document.getElementById('login-btn').disabled = false;
            document.getElementById('response-msg').innerHTML='successfully logged out!';
        }else{
            document.getElementById('logout-btn').disabled = true;
            document.getElementById('login-btn').disabled = false;
            document.getElementById('response-msg').innerHTML='Not logged in!<br>(please login in to continue...)';
        }
        // document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }).catch(res=>{
        console.log(res)
        document.getElementById('response-msg').innerHTML='error: '+res.data;
    })
}
const getData = () => {
    axios.get('https://csgeeks-blog-api.onrender.com/blog/posts').then(response => {
        // console.log(response['data']);
        if(response['data']['articles']['length']>0){
            for (let index = 0; index < response['data']['articles']['length'] ; index++) {
                document.getElementById('list').innerHTML+=
                `
                <div class="card col-md-6 border-dark ">Id:`+response.data.articles[index]._id+`<br>Title:`+response.data.articles[index].title+`<br>Author:`+response.data.articles[index].author+`</div><hr>
                `
            }
        }
    });
};
const getDataForUpdate = () => {
    token=getCookie('access_token_cookie')
    //
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            if(!res.data['admin'])
                query='https://csgeeks-blog-api.onrender.com/blog/posts?orderby=_id&order=asc&token='+token;
            else
                query='https://csgeeks-blog-api.onrender.com/blog/posts?orderby=_id&order=asc';
            axios.get(query).then(response => {
                // console.log(response['data']);
                if(response.data.success&&response.data.articles.length>0){
                    document.getElementById('list').innerHTML='';
                    var article_list = ``;
                    for (let index = 0; index < response.data.articles.length ; index++) {
                        let d = new Date(Date.parse(response.data.articles[index].created))
                        description = response.data.articles[index].description?response.data.articles[index].description:'';
                        article_list +=
                        `<div class="container col-md-6">
                            <a style="color:inherit;" class="block" href="javascript:;" onclick="getPostForUpdate(`+response.data.articles[index]._id+`)">
                                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div class="col p-4 d-flex flex-column position-static">
                                        <h3 class="mb-0">`+response.data.articles[index].title+`</h3>
                                        <div class=" mb-n1 text-muted">`+d.toDateString()+`</div>
                                        <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                                        <p class="card-text mb-auto">`+description+`</p>
                                        <p class="card-text mb-auto">Click to see detail...</p>
                                    </div>
                                </div>
                            </a>
                        </div>`;
                    }
                    document.getElementById('list').innerHTML+=
                    article_list+`
                    <div class="container text-center" style="width:90%;">
                    <input class="btn btn-success mt-2 form-control-lg" type="button" value="Cancle" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                    </div>`;
                }
            });
        }else{
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        alert(`(connection failed try again shortly...)`);
        token=undefined;
        console.log(res);
    });
    //
};
const getPostForUpdate = (id) => {
    token=getCookie('access_token_cookie');
    //
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
    var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            // document.getElementById('d-1').innerHTML=`
            
            // `;
            axios.get('https://csgeeks-blog-api.onrender.com/blog/post?id='+id).then(response => {
                if(response.data.success){
                    console.log(response.data);
                    description = (response.data.article.description)?response.data.article.description:'';
                    authorhtml=(res.data['admin'])?`<input type="text" placeholder="author" name="author" class="form-control text-center py-1" id="article-input" value="`+response.data.article.author+`" required><br>`:`<input type="text" placeholder="author" name="author" class="form-control text-center py-1" id="article-input" value="`+response.data.article.author+`" required readonly><br>`;
                    vlink=(response.data.article.vlink)?response.data.article.vlink:'';
                        document.getElementById('d-1').innerHTML=
                        `
                        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" hidden></iframe>
                        <form name="form-1" action="" method="post" class="" target="dummyframe">
                        <div class="form-group ">
                        <div class="col-lg-4 d-inline-block mt-n3 text-center">
                        <div class="container text-center">Title:</div>
                        <input type="text" placeholder="title" name="title" class="form-control article-input" value="`+response.data.article.title+`" required><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">Author:</div>
                        `+authorhtml+`
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">Content:</div>
                        <textarea name="content" cols="23" rows="10" placeholder="content" class="border-dark form-control py-1 mt-1 article-input" required>`+response.data.article.content+`</textarea><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">Description:</div>
                        <input type="text" placeholder="description" name="description" class="form-control py-1 article-input" value="`+description+`"><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">YouTube Video Link:</div>
                        <input type="text" placeholder="YouTube Video Link" name="vlink" class="form-control mt-1 article-input" value="`+vlink+`"><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">Tags:</div>
                        <input id="tags" type="text" name="tags" placeholder="tags (separated by commas)" class="form-control mt-1 article-input" value="`+response.data.article.tags.join(',')+`" required><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                        <div class="container text-center">Thumbnail Link:</div>
                        <input type="text" placeholder="thumbnail link" name="thumbnail" class="form-control mt-1 article-input" value="`+response.data.article.thumbnail+`" required><br>
                        </div><br>
                        <input class="btn btn-success mt-2 form-control-lg" type="submit" value="Update" id="update-btn" style="font-size: 30px;" onsubmit="return false" onclick="updateData(`+id+`)">
                        <input class="btn btn-danger mt-2 form-control-lg" type="button" value="Cancel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/update'"><br/>
                        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Admin Panel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                        </div>
                        </form>
                        `
                }else{
                    alert('post with id='+form.id.value+' does not exists');
                }
            }).catch(res=>{
                document.getElementById('d-1').innerHTML=`(connection failed try again shortly...)`;
                token=undefined;
                console.log(res);
            });
        }else{
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        document.getElementById('d-1').innerHTML=`(connection failed try again shortly...)`;
        token=undefined;
        console.log(res);
    })
    //
};
const getForCreate = (id) => {
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            if(!res.data['admin']){
                authorhtml=`<input type="text" placeholder="author" name="author" class="border-dark form-control text-center py-1" id="article-input" value="`+res.data['author']+`" required readonly><br>`;
            }else{
                authorhtml=`<input type="text" placeholder="author" name="author" class="border-dark form-control text-center py-1" id="article-input" required><br>`;
            }
            document.getElementById('d-1').innerHTML=`
            <div class="container text-center">
                <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" hidden></iframe>
                <form name="form-1" action="" method="post" class="" target="dummyframe">
                    <div class="form-group ">
                        <div class="col-lg-4 d-inline-block mt-0 text-center">
                            <div class="container text-center">Title:</div>
                            <input type="text" placeholder="title" name="title" class="border-dark form-control article-input" required><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">Author:</div>
                            `+authorhtml+`
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">Content:</div>
                            <textarea name="content" cols="23" rows="8" placeholder="content" class="border-dark form-control py-1 mt-1 article-input" required></textarea><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">Description:</div>
                            <input type="text" placeholder="description" name="description" class="border-dark form-control py-1 article-input"><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">YouTube Video Link:</div>
                            <input type="text" placeholder="YouTube Video Link" name="vlink" class="border-dark form-control py-1 article-input"><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">Tags:</div>
                            <input id="tags" type="text" name="tags" placeholder="tags (separated by commas)" class="border-dark form-control mt-1 article-input" required><br>
                        </div><br>
                        <div class="col-lg-4 d-inline-block mt-n3">
                            <div class="container text-center">Thumbnail Link:</div>
                            <input type="text" placeholder="thumbnail link" name="thumbnail" class="border-dark form-control mt-1 article-input" required><br>
                        </div><br>
                        <input class="btn btn-success mt-2 form-control-lg" type="submit" value="Create Post" id="update-btn" style="font-size: 30px;" onsubmit="return false" onclick="postData()">
                        <input class="btn btn-danger mt-2 form-control-lg" type="button" value="Cancel" style="font-size: 30px" onclick="location.href='/csgeeksblog/admin/admin'"><br/>
                    </div>
                </form>
            </div>
            `;

        }else{
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        document.getElementById('d-1').innerHTML=`(connection failed try again shortly...)`;
        token=undefined;
        console.log(res);
    })
    //
};

const postData = () => {
    let form = document.forms["form-1"];
    if (form.title.value && form.content.value && form.author.value && form.thumbnail.value && form.tags.value) {
        var title = form.title.value;
        var content = form.content.value;
        var author = form.author.value;
        var description = '';
        var vlink = '';
        if( form.description.value)
        description = form.description.value;
        if( form.vlink.value)
        vlink = form.vlink.value;
        var tags = form.tags.value
        var thumbnail = form.thumbnail.value;
        if (title != "" && content != "" && author != "" && thumbnail != "" && tags != "") {
            var data = new FormData();
            data.append('title',title);
            data.append('content',content);
            data.append('author',author);
            data.append('description',description);
            data.append('vlink',vlink);
            data.append('thumbnail',thumbnail);
            data.append('tags',tags);
        }
        axios.post('https://csgeeks-blog-api.onrender.com/blog/create',data,{
            headers:{
                'C_AUTH':'?Rkqj98_hNV77aR67MRQhXz6_WC7XApXdG8@'
            }
        }).then(response => {
            // console.log(response['data']);
            if(response['data']['success']){
                document.getElementById('d-1').innerHTML=`
                <hr>
                <div class="container text-success text-center">result:<br><p>Article Successfully created!</p></div>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Create Again" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/create'"><br/>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Admin Panel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                <hr>`;
            }else{
                document.getElementById('d-1').innerHTML=`
                <hr>
                <div class="container text-danger text-center">result:<br><p>Failed to Create Article!</p></div>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Create Again" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/create'"><br/>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Admin Panel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                <hr>`;
            }
        }).catch(err => {
            console.log(err.response.data);
            document.getElementById('d-1').innerHTML=`
            <hr>
            <div class="container text-danger text-center">result:<br><p>Failed to Create Article!</p></div>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Create Again" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/create'"><br/>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Admin Panel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            <hr>`;
        });
    }
};
const updateData = (id) => {
    token=getCookie('access_token_cookie');
    let form = document.forms["form-1"];
    if (form.title.value && form.content.value && form.author.value && form.thumbnail.value && form.tags.value) {
        var title = form.title.value;
        var content = form.content.value;
        var author = form.author.value;
        var description = '';
        var vlink = '';
        if( form.description.value)
        description = form.description.value;
        if( form.vlink.value)
        vlink = form.vlink.value;
        var tags = form.tags.value
        var thumbnail = form.thumbnail.value;
        if (title != "" && content != "" && author != "" && thumbnail != "" && tags != "") {
            var data = new FormData();
            data.append('title',title);
            data.append('content',content);
            data.append('author',author);
            data.append('description',description);
            data.append('vlink',vlink);
            data.append('thumbnail',thumbnail);
            data.append('tags',tags);
        }
        if(token)
            query='https://csgeeks-blog-api.onrender.com/blog/update?id='+id+'&token='+token;
        else
            query='https://csgeeks-blog-api.onrender.com/blog/update?id='+id;
        axios.post(query,data,{
            headers:{
                'C_AUTH':'?Rkqj98_hNV77aR67MRQhXz6_WC7XApXdG8@'
            }
        }).then(response => {
            // console.log(response['data']);
            if(response['data']['success']){
                document.getElementById('d-1').innerHTML=`
                <hr>
                <div class="container text-success text-center">result:<br><p>Article Successfully Updated!</p></div>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/update'">
                <hr>
                `;
            }else{
                document.getElementById('d-1').innerHTML=`
                <hr>
                <div class="container text-danger text-center">result:<br><p>Failed to Update Article!</p></div>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/update'">
                <hr>
                `;
            }
            getData();
        }).catch(err => {
            console.log(err.response.data);
            document.getElementById('d-1').innerHTML=`
            <hr>
                <div class="container text-danger text-center">result:<br><p>Failed to Update Article!</p></div>
                <div class="container mt-2 text-success text-center">result:<br><p>'+JSON.stringify(err.response.data)+'</p></div>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/update'">
            <hr>`;
        });
    }
};
loadForDelAll=()=>{
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            if(res.data['admin'])
                document.getElementById('delAllOption').innerHTML=`
                <input class="btn btn-danger" type="button" value="Delete All" id="delete-btn" style="font-size: 30px;" onclick="delData()"><br/>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Cancle" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                `;
            else
                document.getElementById('delAllOption').innerHTML=`
                <input class="btn btn-danger" type="button" value="Delete All" id="delete-btn" style="font-size: 30px;" onclick="delData()" disabled><br/>
                <input class="btn btn-success mt-2 form-control-lg" type="button" value="Cancle" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                `;
        }
        else{
            document.getElementById('delAllOption').innerHTML=`
            <h3>not logged in</h3>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            `;
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        document.getElementById('delAllOption').innerHTML=`(connection failed try again shortly...)`;
        token=undefined;
        console.log(res);
    });
}
const delData = () => {
    axios.post('https://csgeeks-blog-api.onrender.com/blog/post/delete',undefined,{
        headers:{
            'C_AUTH':'?Rkqj98_hNV77aR67MRQhXz6_WC7XApXdG8@'
        }
    }).then(response => {
        // console.log(response['data']);
        if(response['data']['success']) {
            document.getElementById('d-1').innerHTML=`
            <hr><div class="container text-success text-center">result:<br><p>All Articles has been successfully deleted!</p></div><hr>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Done" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            `;
        }else {
            document.getElementById('d-1').innerHTML=`
            <hr><div class="container text-danger text-center">result:<br><p>Failed to delete All Articles!\nReason: `+response['data']['result']+`</p></div><hr>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Done" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            `;
        }
    });
};
const showBeforeDelById = () => {
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            if(!res.data['admin']){
                query='https://csgeeks-blog-api.onrender.com/blog/posts?orderby=_id&order=asc&author='+res.data['author'];
            }else{
                query='https://csgeeks-blog-api.onrender.com/blog/posts?orderby=_id&order=asc';
            }

            axios.get(query).then(response => {
                // console.log(response['data']);
                if(response.data.success&&response['data']['articles']['length']>0){
                    document.getElementById('delform2').innerHTML=`
                    <input type="number" min="0" placeholder="Post Id" name="id" class="form-control-lg text-center article-input" required><br>
                    <input class="btn btn-danger mt-3 mb-1 form-control-lg" type="submit" value="Delete Post" id="delby-btn" style="font-size: 30px;" onsubmit="return false" onclick="delDataById()">
                    `;
                    document.getElementById('list').innerHTML='';
                    var article_list = ``;
                    for (let index = 0; index < response['data']['articles']['length'] ; index++) {
                        description = response.data.articles[index].description?response.data.articles[index].description:'';
                        article_list += `
                        <div class="container col-md-6">
                            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col p-4 d-flex flex-column position-static">
                                    <h3 class="mb-0">ID: `+response.data.articles[index]._id+`</h3>
                                    <h4 class="mb-0">Title: `+response.data.articles[index].title+`</h4>
                                    <div class="mb-1 text-info">`+response.data.articles[index].author+`</div>
                                    <p class="card-text mb-auto">`+description+`</p>
                                </div>
                            </div>
                        </div>
                        `;
                        document.getElementById('list').innerHTML+=article_list+`
                        <div class="container text-center" style="width:90%;">
                        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Cancle" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                        </div>`;
                    }
                }
            });
        }else{
            document.getElementById('list').innerHTML=`<h3>not logged in</h3>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            `;
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        document.getElementById('list').innerHTML=`
        (connection failed try again shortly...)
        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
        `;
        token=undefined;
        console.log(res);
    });
    //
}
const delDataById = () => {
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        // console.log(res);
        if(res.data['success']){
            let form = document.forms["form-2"];
            if(!res.data['admin']){
                if(form.id.value){
                    var id=form.id.value;
                    axios.get('https://csgeeks-blog-api.onrender.com/blog/post?id='+id).then(response => {
                        if(response.data.success){
                            if(res.data['author']!=response.data.article.author){
                                // document.getElementById('d-1').innerHTML=`(can't delete posts of another author please try again...)`;
                                alert(`(can't delete posts of another author please try again...)`);
                            }else{
                                axios.post('https://csgeeks-blog-api.onrender.com/blog/post/delete?id='+id+'&token='+token).then(response => {
                                    // console.log(response['data']);
                                    alert(JSON.stringify(response['data']));
                                    showBeforeDelById();
                                });
                            }
                        }else{
                            alert('post with id='+form.id.value+' does not exists');
                        }
                    }).catch(res=>{
                        document.getElementById('d-1').innerHTML=`
                        (connection failed try again shortly...)
                        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                        `;
                        token=undefined;
                        console.log(res);
                    });
                }
            }else{
                if (form.id.value) {
                    var id = form.id.value;
                    axios.get('https://csgeeks-blog-api.onrender.com/blog/post?id='+id).then(response => {
                        if(response.data.success){
                            axios.post('https://csgeeks-blog-api.onrender.com/blog/post/delete?id='+id+'&token='+token).then(response => {
                                // console.log(response['data']);
                                if(response.data.success) {
                                    document.getElementById('d-1').innerHTML=`
                                    <hr><div class="container text-success text-center"><p>Successfully Deleted Article</p></div><hr>
                                    <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/delete'"><br/>
                                    <input class="btn btn-success mt-2 form-control-lg" type="button" value="Admin Panel" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
                                    `;
                                }else {
                                    document.getElementById('d-1').innerHTML=`
                                    <hr><div class="container text-danger text-center"><p>'+JSON.stringify(response['data'])+'</p></div><hr>
                                    <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'"><br/>
                                    `;
                                }
                            });
                        }else{
                            alert('post with id='+form.id.value+' does not exists');
                        }
                    }).catch(res=>{
                        document.getElementById('d-1').innerHTML=`
                        (connection failed try again shortly...)
                        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">`;
                        token=undefined;
                        console.log(res);
                    });
                }
            }
        }else{
            document.getElementById('d-1').innerHTML=`
            <h3>not logged in</h3>
            <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
            `;
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            alert('Not Logged In\nPlease login to access these features!');
        }
    }).catch(res=>{
        document.getElementById('d-1').innerHTML=`
        (connection failed try again shortly...)
        <input class="btn btn-success mt-2 form-control-lg" type="button" value="Ok" style="font-size: 30px" onclick="window.location.href='/csgeeksblog/admin/admin'">
        `;
        token=undefined;
        console.log(res);
    })
};
