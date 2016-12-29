var url = "http://sentence.iciba.com/index.php";

window.onload = function() {
  var app = new Vue({
    el: '#app',
    data: {
      title: "",
      content: "",
      note: "",
      translation: "",
      picture: "",
      picture2: "",
      picture3: "",
      caption: "每日一句",
      tts: "",
    },
    ready: function() {
      this.get('2016-11-13');
    },
    methods: {
      get: function(title) {
        var now = moment();
        var params = {
          "c": "dailysentence",
          "m": "getdetail",
          "title": title ? title : now.format('YYYY-MM-DD')
        }

        var options = {
          params: params
        };
        if (chrome.extension) {
          console.debug("in chrome extenstion");
          result = this.$http.get(url, options);
        } else {
          console.debug("not in chrome extenstion");
          result = this.$http.jsonp(url, options);
        }

        result.then((response) => {
          this.apply(response.data);
        }).catch(function(response) {
          console.log(JSON.stringify(response))
        });
      },
      request: function(title) {
        var vm = this;
        var now = moment();
        var params = {
          "c": "dailysentence",
          "m": "getdetail",
          "title": title ? title : now.format('YYYY-MM-DD')
        }

        $.ajax({
          url: url,
          dataType: 'jsonp',
          data: $.param(params, true),
          jsonp: 'callback',
          timeout: 3000,
          success: function(response) {
            vm.apply(response);
          }
        });
      },
      apply: function(data) {
        console.info("apply data into page~");
        this.$set('title', data.title);
        this.$set('content', data.content);
        this.$set('note', data.note);
        this.$set('translation', data.translation);
        this.$set('picture', data.picture);
        this.$set('picture2', data.picture2);
        this.$set('picture3', data.picture3);
        this.$set('caption', data.caption);
        this.$set('tts', data.tts);

        // this.$els.audio.play();
      }
    }
  });

  placeholder.render();

}
