const API_URI = "https://blog-dashbord-0777.onrender.com";
const CLIENT_URI = "https://coder-rit.github.io/Blog-dashbord";
function setPages( ) {
  const role = localStorage.getItem('role')
  const sidebar  = document.getElementById("sidebar")

  console.log(role);
  if (role==="admin") {
      sidebar.innerHTML =` <ul class="nav">
      <li class="nav-item nav-profile">
        <a href="#" class="nav-link">
          <div class="profile-image">
            <img class="img-xs rounded-circle" id="ProfileImage" alt="profile image">
            <div class="dot-indicator bg-success"></div>
          </div>
          <div class="text-wrapper">
            <p class="profile-name" id="UserName"></p>
            <p class="designation" id="userRole"></p>
          </div>
        </a>
      </li>
      <li class="nav-item nav-category">Main Menu</li>
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="menu-icon typcn typcn-document-text"></i>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="pages/forms/basic_elements.html">
          <i class="menu-icon typcn typcn-shopping-bag"></i>
          <span class="menu-title">Add Users</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="pages/tables/basic-table.html">
          <i class="menu-icon typcn typcn-bell"></i>
          <span class="menu-title">Add Blogs</span>
        </a>
      </li>


    </ul>`
  }else{
      sidebar.innerHTML =` <ul class="nav">
      <li class="nav-item nav-profile">
        <a href="#" class="nav-link">
          <div class="profile-image">
            <img class="img-xs rounded-circle" id="ProfileImage" alt="profile image">
            <div class="dot-indicator bg-success"></div>
          </div>
          <div class="text-wrapper">
            <p class="profile-name" id="UserName"></p>
            <p class="designation" id="userRole"></p>
          </div>
        </a>
      </li>
      <li class="nav-item nav-category">Main Menu</li>
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="menu-icon typcn typcn-document-text"></i>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>  
      <li class="nav-item">
        <a class="nav-link" href="pages/tables/basic-table.html">
          <i class="menu-icon typcn typcn-bell"></i>
          <span class="menu-title">Add Blogs</span>
        </a>
      </li>


    </ul>`
      
  }
}

let imageURI = "";

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function profiling( ) {
  document.getElementById("ProfileImage").src =  localStorage.getItem("imgUrl")
  document.getElementById("UserName").innerText =localStorage.getItem("name")
  document.getElementById("userRole").innerText = localStorage.getItem("role")

}
profiling()



async function signUp(imgUrl) {
  const name = document.getElementById("reg_name").value;
  const email = document.getElementById("reg_email").value;
  const password = document.getElementById("reg_pass").value;

  const formData = {
    name: name,
    email: email,
    password: password,
    imgUrl: imgUrl,
  };
  try {
    const response = await fetch(`${API_URI}/api/v1/signup `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();

    setCookie("Token", data.Token, 7);

    localStorage.setItem("imgUrl",data.user.imgUrl)
    localStorage.setItem("name",data.user.name)
    localStorage.setItem("email",data.user.email)
    localStorage.setItem("role",data.user.role)

    
   window.location = `${CLIENT_URI}/client/src/index.html`

  } catch (error) {
    console.log(error);
  }
}

async function login() {
  const email = document.getElementById("log_email").value;
  const password = document.getElementById("log_pass").value;

  const formData = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch(`${API_URI}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();
    setCookie("Token", data.Token, 7);

    localStorage.setItem("imgUrl",data.user.imgUrl)
    localStorage.setItem("name",data.user.name)
    localStorage.setItem("email",data.user.email)
    localStorage.setItem("role",data.user.role)
     window.location = `${CLIENT_URI}/client/src/index.html`

  } catch (error) {
    console.log(error);
  }
}




