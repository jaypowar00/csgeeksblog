var token;
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
const adminpageload=()=>{
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        console.log(res);
        if(res.data['success']){
            document.getElementById('logout-btn-admin').hidden = false;
            document.getElementById('admin-page-top').innerHTML='<h2>Welcome '+res.data['author']+'</h2>';
            document.getElementById('admin-list').innerHTML=`
            <li><div><a href="/csgeeksblog/admin/create">Create Post</a></div></li>
            <li><div><a href="/csgeeksblog/admin/update">Update Posts</a></div></li>
            <li><div><a href="/csgeeksblog/admin/delete">Delete Post</a></div></li>
            <li><div><a href="/csgeeksblog/admin/deleteall">Delete All Posts</a></div></li>
            `;
        }else{
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.getElementById('admin-page-top').innerHTML='';
            document.getElementById('logout-btn-admin').hidden = true;
            document.getElementById('admin-list').innerHTML=``;
            document.getElementById('loginbtnappear').innerHTML=`
            <div><a class="btn btn-success" href="login.html" id="login-link">Login</a></div>
            `;
        }
    }).catch(res=>{
        document.getElementById('admin-page-top').innerHTML=`(connection failed try again shortly...)`;
        token=undefined;
        document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.getElementById('logout-btn-admin').hidden = true;
        document.getElementById('login-link').hidden = false;
        console.log(res);
    });
}
const logoutinadmin=()=>{
    token=undefined;
    token=getCookie('access_token_cookie');
    if(token){
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check?token='+token;
    }
    else
        var query = 'https://csgeeks-blog-api.onrender.com/blog/login/check';
    axios.get(query).then(res=>{
        console.log(res)
        if(res.data['success']){
            console.log('deleting cookie...');
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            token=undefined;
            document.getElementById('logout-btn-admin').hidden = true;
            document.getElementById('admin-page-top').innerHTML='';
            document.getElementById('admin-list').innerHTML=``;
            document.getElementById('loginbtnappear').innerHTML=`
            <div><a class="btn btn-success" href="login.html" id="login-link">Login</a></div>
            `;
        }else{
            console.log('else deleting');
            document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.getElementById('admin-page-top').innerHTML='';
            document.getElementById('logout-btn-admin').hidden = true;
            document.getElementById('admin-list').innerHTML=``;
            document.getElementById('loginbtnappear').innerHTML=`
            <div><a class="btn btn-success" href="login.html" id="login-link">Login</a></div>
            `;
        }
        console.log('deleting');
        document.cookie= 'access_token_cookie=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }).catch(res=>{
        console.log(res);
    })
}