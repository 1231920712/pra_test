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
            console.log(item)
            list_html += '<div class="resource-item">';
            list_html += '<img src="' + item.imageUrl + '" alt="" width="100" />';
            list_html += '<div class="body">';
            list_html += "<h4>" + (item.location || "N/A") + "</h4>";
            list_html += "<h5>" + (item.catalogue || "N/A") + "</h5>";
            if (item.plate) list_html += "<h5> Plate ref. " + item.plate.replace('PLATE', '').replace(/ /g, '') + "</h5>";
            else list_html += "<h5> Plate ref. N/A" + "</h5>";
            if (item.height.trim().length > 0) list_html += "<h5>" + item.height + "</h5>";
            else list_html += "<h5> Ht. -" + "</h5>";
            if (item.diameter.trim().length > 0) list_html += "<h5>" + item.diameter + "</h5>";
            list_html += "<p>" + (item.description || "None") + "</p>";
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

          $("#resource-location").html(data.location);
          $("#resource-catalogue").html(data.catalogue || "N/A");
          $("#resource-height").html(data.height + ' cm');
          if (data.diameter.trim().length > 0) $("#resource-diameter").html(data.diameter);
          else $("#diameter-container").hide();
          $("#resource-plate").html(data.plate.replace('PLATE', '').replace(/ /g, ''));
          $("#resource-description").html(data.description);
          $("#resource-note").html(data.note || '-');
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

            $("#location").val(data.location);
            $("#catalogue").val(data.catalogue);
            $("#height").val(data.height);
            $("#diameter").val(data.diameter);
            $("#plate").val(data.plate);
            $("#imageUrl").val(data.imageUrl);
            $("#description").html(data.description);
            $("#note").html(data.note);
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
            location: $("#location").val(),
            catalogue: $("#catalogue").val(),
            height: $("#height").val(),
            diameter: $("#diameter").val() || 0,
            plate: $("#plate").val() ,
            description: $("#description").val(),
            note: $("#note").val(),
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
            location: $("#location").val(),
            catalogue: $("#catalogue").val(),
            height: $("#height").val(),
            diameter: $("#diameter").val() || 0,
            plate: $("#plate").val() || 0,
            description: $("#description").val(),
            note: $("#note").val(),
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
});
