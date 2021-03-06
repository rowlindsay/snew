const apiURL = "http://vivalasalsa.ca/api/";

var app = new Vue({
  el: '#app',

  mounted: function() {
    this.refreshLoginState()
  },

  data: {
    authed: false,
    user: null
  },

  methods: {
    refreshLoginState: function() {
      makeGetRequest(apiURL + 'session').then(res => {
        this.authed = res.authed;
        if (this.authed)
          this.user = res.user;
      });
    }
  }
});

async function makeGetRequest(url) {
  return new Promise(resolve => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resolve(JSON.parse(xmlHttp.responseText));
      // return the object version
      }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  });
}
