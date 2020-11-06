window.onload = () => {
  if (window.sessionStorage.getItem("signStatus") != 1) {
    window.location.href = "login.html";
  } else {
    $.post(
      "login.php", {
        name: window.sessionStorage.getItem("username"),
        password: window.sessionStorage.getItem("password"),
      },
      function (data, status) {
        if (data.indexOf("Wrong") != -1 || data.indexOf("person") != -1) {
          window.sessionStorage.clear();
          window.location.href = "login.html";
        }
      }
    );
  }
  getFileTree();
  if (window.sessionStorage.getItem("username") == "admin") {
    $("#file_upload").append("<form onsubmit='return false;'><input id='file' type='file'><input id='submit' value='上传' type='submit'></form>");
    $("#submit").click(() => {
      if ($("#file").val() == '') {
        return;
      }
      file = document.getElementById("file").files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        let data = e.target.result;
        $.post("yunpan.php", {
          file: data,
          fileName: file.name,
          name: window.sessionStorage.getItem("username"),
          password: window.sessionStorage.getItem("password"),
        }, function (data, status) {
          alert(data);
          $("#yunpan").empty();
          getFileTree();
        })
      }
      reader.readAsDataURL(file);
      document.getElementById('file').value = '';
    })
  }
};

function getFileTree() {
  $.post("filetree.php", {}, (data, status) => {
    data = JSON.parse(data);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      $("#yunpan").append("<li class='list'><span class='rename' spellcheck='false' data-url='" + data[i] + "'>" + data[i] + "</span><div><button class='download' data-url='" + data[i] + "'>下载</button><button class='delete' data-url='" + data[i] + "'>删除</button></div></li>");
    }
    $(".download").click((e) => {
      let url = e.currentTarget.getAttribute("data-url");
      $.get("getfile.php", {
        file: url
      }, (data, status) => {
        console.log(data);
        window.open(data);
      })
      console.log();
    })

    $(".delete").click((e) => {
      let url = e.currentTarget.getAttribute("data-url");
      $.get("deletefile.php", {
        file: url
      }, (data, status) => {
        $("#yunpan").empty();
        getFileTree();
      })
    })

    $(".rename").click((e) => {
      let url = e.currentTarget.getAttribute("data-url");
      e.currentTarget.contentEditable=true;
    })
    $(".rename").blur((e) => {
      let url = e.currentTarget.getAttribute("data-url");
      e.currentTarget.contentEditable=false;
      console.log(e.currentTarget.innerText);
      $.get("renamefile.php", {
        file: url,
        rename:e.currentTarget.innerText
      }, (data, status) => {
        if(data){
          alert("命名不规范");
        }
        $("#yunpan").empty();
        getFileTree();
      })
    })
  })
}