window.onload = () => {
    if (window.sessionStorage.getItem("signStatus") == 1) {
      $.post(
        "login.php",
        {
          name: window.sessionStorage.getItem("username"),
          password: window.sessionStorage.getItem("password"),
        },
        function (data, status) {
          if (data.indexOf("Wrong") == -1 || data.indexOf("person") == -1) {
            window.location.href = "yunpan.html";
          }
        }
      );
    }
  };