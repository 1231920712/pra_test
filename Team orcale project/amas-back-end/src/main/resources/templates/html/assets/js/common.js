$(function () {
  var BASE_URL = "http://localhost:8080/api";

  $("#header-container").load("../common/header.html");
  $("#top-menu-container").load("../common/menu.html");

  Date.prototype.toJSONLocal = (function () {
    function addZ(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return function () {
      return (
        this.getFullYear() +
        "-" +
        addZ(this.getMonth() + 1) +
        "-" +
        addZ(this.getDate()) +
        "T" +
        addZ(this.getHours()) +
        ":" +
        addZ(this.getMinutes()) +
        ":" +
        addZ(this.getSeconds())
      );
    };
  })();

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  // CHeck if user logged in, redirect to home screen
  var path = window.location.pathname;
  const currentUser = localStorage.getItem("me");
  if (path == "/" || path == "/index.html") {
    if (currentUser) {
      location.href = "/home.html";
    }
  } else {
    if (!currentUser) {
      location.href = "/";
    }
  }

  // Login
  $("#login-form").submit(function (event) {
    $("#result").empty();
    event.preventDefault();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      url: BASE_URL + "/login",
      data: JSON.stringify({
        username: $("#username").val(),
        password: $("#password").val(),
      }),
      success: function (result) {
        console.log(result);
        if (result.status === 200) {
          // Success
          $("#result").empty();
          localStorage.setItem("me", JSON.stringify(result.data));
          location.href = "/home.html";
        } else {
          // Error
          $("#result").empty().addClass("error").append(result.data);
        }
      },
    });
    return false;
  });

  // Resource list
  if ($("#resource-list").length) {
    $.ajax({
      type: "GET",
      url: BASE_URL + "/resources",
      success: function (result) {
        if (result.status === 200) {
          // Success
          var data = result.data;
          var list_html = "";
          /**
           *  <div class="resource-item">
                <img src="./assets/images/banner-3.png" alt="" width="100" />
                <div class="body">
                  <h4>Title</h4>
                  <p>Description</p>
                </div>
                <a class="button" href="./resource-details.html">View details</a>
              </div>
           */
          for (var i = 0; i < data.length; i++) {
            var item = data[i];

            list_html += '<div class="resource-item">';
            list_html += '<img src="' + item.imageUrl + '" alt="" width="100" />';
            list_html += '<div class="body">';
            list_html += "<h4>" + item.title + "</h4>";
            list_html += "<p>" + item.description + "</p>";
            list_html += "</div>";
            list_html +=
              '<div class="detail-button"><a href="/resource-details.html?id=' + item.id + '">View details</a></div>';
            list_html += "</div>";
          }
          $("#resource-list").html(list_html);
        } else {
          // Error
          $("#resource-list").empty().addClass("error").append(result.data);
        }
      },
    });
  }

  // Search in resource list
  $("#resource-search-input").on("input", function () {
    var dInput = this.value.toUpperCase();
    var txtValue, a;

    // Loop through all list items, and hide those who don't match the search query
    $("#resource-list .resource-item").each(function (i) {
      a = $(this).find("h4")[0];
      txtValue = a.textContent || a.innerText;

      if (txtValue.toUpperCase().indexOf(dInput) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Resource details
  if (path.includes("/resource-details.html")) {
    var id = getUrlParameter("id");

    $("#resource-edit-btn").attr("href", "resource-new.html?id=" + id);

    $.ajax({
      type: "GET",
      url: BASE_URL + "/resources/" + id,
      success: function (result) {
        if (result.status === 200) {
          // Success
          var data = result.data;

          $("#resource-title").html(data.title);
          $("#resource-description").html(data.description);
          $("#resource-image").attr("src", data.imageUrl);
        } else {
          // Error
          $("#resource-detail").empty().addClass("error").append(result.data);
        }
      },
    });
  }

  // Resource edit & create
  if (path.includes("/resource-new.html")) {
    $("#imageUrl").on("input", function () {
      var dInput = this.value;
      $("#resource-image").attr("src", dInput);
    });

    var id = getUrlParameter("id");

    if (id) {
      $("#page-title").text("Edit resource");
      $.ajax({
        type: "GET",
        url: BASE_URL + "/resources/" + id,
        success: function (result) {
          if (result.status === 200) {
            // Success
            var data = result.data;

            $("#title").val(data.title);
            $("#imageUrl").val(data.imageUrl);
            $("#description").html(data.description);
            $("#resource-image").attr("src", data.imageUrl);
          } else {
            alert("Cannot get resource detail");
          }
        },
      });

      $("#resource-new-form").submit(function (event) {
        console.log(BASE_URL + "/resources/" + id);
        event.preventDefault();
        $.ajax({
          type: "PUT",
          contentType: "application/json",
          dataType: "json",
          url: BASE_URL + "/resources/" + id,
          data: JSON.stringify({
            title: $("#title").val(),
            description: $("#description").val(),
            imageUrl: $("#imageUrl").val(),
          }),
          success: function (result) {
            console.log(result);
            if (result.status === 200) {
              location.href = "/resource-list.html";
            } else {
              alert(result.data);
            }
          },
        });
        return false;
      });
    } else {
      $("#resource-new-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          url: BASE_URL + "/resources",
          data: JSON.stringify({
            title: $("#title").val(),
            description: $("#description").val(),
            imageUrl: $("#imageUrl").val(),
          }),
          success: function (result) {
            console.log(result);
            if (result.status === 200) {
              location.href = "/resource-list.html";
            } else {
              alert(result.data);
            }
          },
        });
        return false;
      });
    }
  }

  // Conference list
  if ($("#conference-list").length) {
    $.ajax({
      type: "GET",
      url: BASE_URL + "/conferences",
      success: function (result) {
        if (result.status === 200) {
          // Success
          var data = result.data;
          var list_html = "";
          /**
           *  <div class="conference-item">
                <div class="body">
                  <h4>Title: -</h4>
                  <p class="time">Time: -</p>
                  <p>Description: -</p>
                </div>
                <a class="button" href="./conference-details.html">View details</a>
              </div>
           */
          for (var i = 0; i < data.length; i++) {
            console.log("aaaa");
            var item = data[i];
            var time = new Date(item.time);
            list_html += '<div class="conference-item">';
            list_html += '<div class="body">';
            list_html += "<h4>" + item.title + "</h4>";
            list_html += "<h5>" + time.toLocaleDateString() + " " + time.toLocaleTimeString() + "</h5>";
            list_html += "<p>" + item.description + "</p>";
            list_html += "</div>";
            list_html +=
              '<div class="detail-button"><a href="/conference-details.html?id=' + item.id + '">View details</a></div>';
            list_html += "</div>";
          }
          $("#conference-list").html(list_html);
        } else {
          // Error
          $("#conference-list").empty().addClass("error").append(result.data);
        }
      },
    });
  }

  // Search in conference list
  $("#conference-search-input").on("input", function () {
    var dInput = this.value.toUpperCase();
    var txtValue, a;

    // Loop through all list items, and hide those who don't match the search query
    $("#conference-list .conference-item").each(function (i) {
      a = $(this).find("h4")[0];
      txtValue = a.textContent || a.innerText;

      if (txtValue.toUpperCase().indexOf(dInput) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Conference details
  if (path.includes("/conference-details.html")) {
    var id = getUrlParameter("id");

    $("#conference-edit-btn").attr("href", "conference-new.html?id=" + id);

    $.ajax({
      type: "GET",
      url: BASE_URL + "/conferences/" + id,
      success: function (result) {
        if (result.status === 200) {
          // Success
          var data = result.data;

          $("#conference-title").html(data.title);
          $("#conference-description").html(data.description);
          $("#conference-time").html(
            new Date(data.time).toLocaleDateString() + " " + new Date(data.time).toLocaleTimeString()
          );
        } else {
          // Error
          $("#resource-detail").empty().addClass("error").append(result.data);
        }
      },
    });
  }

  // Conference edit & create
  if (path.includes("/conference-new.html")) {
    var id = getUrlParameter("id");

    if (id) {
      $("#page-title").text("Edit conference");
      $.ajax({
        type: "GET",
        url: BASE_URL + "/conferences/" + id,
        success: function (result) {
          if (result.status === 200) {
            // Success
            var data = result.data;

            $("#title").val(data.title);
            $("#description").html(data.description);
            $("#datetime").val(new Date(data.time).toJSONLocal());
          } else {
            alert("Cannot get resource detail");
          }
        },
      });

      $("#conference-new-form").submit(function (event) {
        console.log(BASE_URL + "/conferences/" + id);
        event.preventDefault();
        // console.log(new Date($("#datetime").val()).toISOString())
        $.ajax({
          type: "PUT",
          contentType: "application/json",
          dataType: "json",
          url: BASE_URL + "/conferences/" + id,
          data: JSON.stringify({
            title: $("#title").val(),
            description: $("#description").val(),
            time: new Date($("#datetime").val()).toISOString(),
          }),
          success: function (result) {
            if (result.status === 200) {
              location.href = "/conference-list.html";
            } else {
              alert(result.data);
            }
          },
        });
        return false;
      });
    } else {
      $("#conference-new-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          url: BASE_URL + "/conferences",
          data: JSON.stringify({
            title: $("#title").val(),
            description: $("#description").val(),
            time: new Date($("#datetime").val()).toISOString(),
          }),
          success: function (result) {
            console.log(result);
            if (result.status === 200) {
              location.href = "/conference-list.html";
            } else {
              alert(result.data);
            }
          },
        });
        return false;
      });
    }
  }
});
