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


function getCookie(name) {
  let cookieArray = document.cookie.split(';'); // Split the cookie string into an array
  for(let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split('='); // Split each individual cookie into its name and value
      let cookieName = cookiePair[0].trim(); // Trim whitespace from the cookie name
      if (cookieName === name) {
          return decodeURIComponent(cookiePair[1]); // Decode and return the cookie value
      }
  }
  return null; // Return null if the cookie was not found
}

const token = getCookie("Token")
localStorage.setItem("currentBlogID","")


if (!token) {
   window.location = `${CLIENT_URI}/client/pages/auth/login.html`
}


function profiling( ) {
  document.getElementById("ProfileImage").src =  localStorage.getItem("imgUrl")
 
  document.getElementById("UserName").innerText =localStorage.getItem("name")
  document.getElementById("userRole").innerText = localStorage.getItem("role")

}
profiling()





async function addAdmin(imgUrl) {
    const name = document.getElementById("a_name").value;
    const email = document.getElementById("a_email").value;
    const password = document.getElementById("a_pass").value;
   
  
    const formData = {
      name: name,
      email: email,
      password: password,
      imgUrl: imgUrl,
    };
    try {
      const response = await fetch(`${API_URI}/api/v1/addAdmin`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok === false) {
        console.log("error");
        return;
      }
  
      const data = await response.json();
      toastit("New Admin Created ","s")
      getUsers()
    } catch (error) {
      console.log(error);
    }
  }



async function addBlogger(imgUrl) {
    const name = document.getElementById("b_name").value;
    const email = document.getElementById("b_email").value;
    const password = document.getElementById("b_pass").value;
    
  
    const formData = {
      name: name,
      email: email,
      password: password,
      imgUrl: imgUrl,
    };
    try {
      const response = await fetch(`${API_URI}/api/v1/addBlogger`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok === false) {
        console.log("error");
        return;
      }
  
      const data = await response.json();
  
     
      toastit("New Blogger Created ","s")
      getUsers()
    } catch (error) {
      console.log(error);
    }
  }








async function getUsers() {
    const userTable = document.getElementById("userTable");
    
  let temp = ""
    
    try {
      const response = await fetch(`${API_URI}/api/v1/getUsers`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
       
      });
  
      if (response.ok === false) {
        console.log("error");
        return;
      }
  
      const {user} = await response.json();


      for (let i = 0; i < user.length; i++) {
        const element = user[i];
        temp += `
        <tr>
        <td class="py-1">
          <img src="${element.imgUrl}" alt="image" />
        </td>
        <td> ${element.name} </td>
        <td> ${element.email} </td>
        <td>
          <label class="badge badge-${element.role==="admin"?"primary":"info"}">${element.role}</label>
        </td>
        <td> 
        <div class="margin15 btnDIv">
        <span>
          <button type="button" class="btn btn-danger mr-2" onclick="deleteUser('${element._id}','${element.name}')" >Delete</button>
        </span>
      </div>
    </div>

        </td>
      </tr>

        `


      }
  
     

      userTable.innerHTML = temp
  
    } catch (error) {
      console.log(error);
    }
  }

  getUsers()



  const deleteUser = async (id,name)=>{

    window.alert(`Do you want to delete user, ${name}`)

    try {
      const response = await fetch(`${API_URI}/api/v1/deleteUser${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
  
      if (response.ok === false) {
        console.log("error");
        return;
      }
      const data = await response.json();
      toastit("User Deleted ","s")
      getUsers()
    } catch (error) {
      console.log(error);
    }

  }


  function logOutUser() {
    
    document.cookie = "Token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    location.reload(true)


} 