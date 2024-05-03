const API_URI = "https://blog-dashbord-0777.onrender.com";
const CLIENT_URI = "https://coder-rit.github.io/Blog-dashbord";
 

function setPages() {
  const role = localStorage.getItem("role");
  const addUserPage = document.getElementById("addUserPage");

  console.log(role);
  if (role === "blogger") {
    addUserPage.style.display = "none";
  }
}

setPages();
function getCookie(name) {
  let cookieArray = document.cookie.split(";"); // Split the cookie string into an array
  for (let i = 0; i < cookieArray.length; i++) {
    let cookiePair = cookieArray[i].split("="); // Split each individual cookie into its name and value
    let cookieName = cookiePair[0].trim(); // Trim whitespace from the cookie name
    if (cookieName === name) {
      return decodeURIComponent(cookiePair[1]); // Decode and return the cookie value
    }
  }
  return null; // Return null if the cookie was not found
}

const token = getCookie("Token");
localStorage.setItem("currentBlogID", "");

if (!token) {
  window.location = `${CLIENT_URI}/client/src/pages/auth/login.html`;
}

function profiling() {
  document.getElementById("ProfileImage").src = localStorage.getItem("imgUrl");
  document.getElementById("UserName").innerText = localStorage.getItem("name");
  document.getElementById("userRole").innerText = localStorage.getItem("role");
}
profiling();

function renderFirst10Words(str, stock) {
  // Split the string into an array of words
  const words = str.split(/\s+/); // This regex splits by any whitespace characters

  // Take the first 10 words and join them back into a string
  const first10Words = words.slice(0, stock).join(" ") + "...";

  return first10Words;
}

async function getAllBlogs() {
  const blogsCarts = document.getElementById("blogsCarts");

  let temp = "";

  try {
    let response;
    if (localStorage.getItem("role") === "blogger") {
      response = await fetch(`${API_URI}/api/v1/getBloggerBlogs/${localStorage.getItem(
          "email"
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      response = await fetch(`${API_URI}/api/v1/getBlogs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      temp += `
        <div class=" customCartBlog">
        <div class="blogImageDiv">
          <img
            src="${element.imgUrl}"
            class="blogImage" alt="">
        </div>
        <h4 class="margin15">${renderFirst10Words(element.Title, 10)}</h4>
        <p class="margin15"> ${renderFirst10Words(element.paragraph, 20)}</p>
        <div class="margin15 btnDIv absDiv" >
          <span>
            <button type="button" class="btn btn-danger mr-2"  onclick="deleteBlog('${
              element._id
            }','${element.Title}')">Delete</button>
          </span>
          <span> <button type="button" onclick="editBlog('${
            element._id
          }')"  class="btn btn-warning mr-2">Edit</button></span>
        </div>
      </div>
          `;
    }

    blogsCarts.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}

getAllBlogs();

async function deleteBlog(id, name) {
  window.alert(`Do you want to delete Blog, ${name}`);

  try {
    const response = await fetch(`${API_URI}/api/v1/deleteBlog/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok === false) {
      console.log("error");
      return;
    }
    const data = await response.json();
    toastit("Blog Deleted ", "s");
    getAllBlogs();
  } catch (error) {
    console.log(error);
  }
}

function editBlog(id) {
  localStorage.setItem("currentBlogID", id);
  window.location = `${CLIENT_URI}client/src/pages/tables/basic-table.html`
}

function logOutUser() {
  document.cookie =
    "Token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    
 window.location = `${CLIENT_URI}/client/src/pages/auth/login.html`;
}
