angular
    .module('shared')
    .service('AuthService', AuthService)
    .service('CookieService', CookieService);

CookieService.$inject = ['$window'];
function CookieService($window){
  var self = this;
  this.put = function (name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";path=/;";

    if (expires) {
      // If it's a date
      if(expires instanceof Date) {
        // If it isn't a valid date
        if (isNaN(expires.getTime()))
          expires = new Date();
      }
      else
        expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24 * 30);

      cookie += "expires=" + expires.toGMTString() + ";";
    }

    if (path)
      cookie += "path=" + path + ";";
    if (domain)
      cookie += "domain=" + domain + ";";

    document.cookie = cookie;
  }

  this.remove = function (key){
    if(self.read(key)){
      self.put(key,'',-1);
    }
  }
  this.read = function(key, c){
    c = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return c ? c.pop() : '';
  }
}

AuthService.$inject = ['CookieService'];
function AuthService(CookieService){
  this.isAuthenticated = function(){
    return CookieService.read('token') ? true : false;
  }
}