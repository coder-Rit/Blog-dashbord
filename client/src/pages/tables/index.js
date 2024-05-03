
const API_URI = "https://blog-dashbord-0777.onrender.com";
const CLIENT_URI = "https://coder-rit.github.io/Blog-dashbord";
function setPages( ) {
  const role = localStorage.getItem('role')
  const addUserPage  = document.getElementById("addUserPage")

  console.log(role);
  if (role==="blogger") {
      addUserPage.style.display ="none"
  } 
}
setPages()

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

if (!token) {
   window.location = `${CLIENT_URI}/client/src/pages/auth/login.html`
}

function profiling() {
  document.getElementById("ProfileImage").src = localStorage.getItem("imgUrl");
  document.getElementById("UserName").innerText = localStorage.getItem("name");
  document.getElementById("userRole").innerText = localStorage.getItem("role");
}
profiling();

let CategoryList = [];
let AllCategoyes = [];

let setRecomendtion = false;
let stories = false;

async function addBlog(imgUrl) {
  const Title = document.getElementById("blogTitle").value;
  const paragraph = document.getElementById("textArea").value;

  let formData = {
    Title: Title,
    stories: stories,
    recommended: setRecomendtion,
    category: CategoryList,
    paragraph: paragraph,
    imgUrl: imgUrl,
    createdBy: localStorage.getItem("email")
      ? localStorage.getItem("email")
      : null,
  };

  if (localStorage.getItem("currentBlogID")) {
    formData._id = localStorage.getItem("currentBlogID")
  }


  try {
    const response = await fetch(`${API_URI}/api/v1/uploadBlog`, {
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

    toastit("Blog Uploaded", "s");
     window.location = `${CLIENT_URI}/client/src/index.html`
  } catch (error) {
    toastit("Blog Uploaded", "r");

    console.log(error);
  }
  console.log("2");
}

async function addCategory() {
  const category = document.getElementById("CategoryInput").value;

  if (!category) {
    return;
  }
  const formData = {
    category: category,
  };

  try {
    const response = await fetch(`${API_URI}/api/v1/addCategory`, {
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
    toastit("Category Added", "s");
    getCategorys();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getCategorys() {
  const CategoryFid = document.getElementById("CategoryFid");
  const CategoryDiv = document.getElementById("CategoryDiv");

  let temp = "";
  let temp2 = "";

  try {
    const response = await fetch(`${API_URI}/api/v1/getCategory`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      temp += `
          <div class="form-check">
            <input type="checkbox" id="${element.category}" onchange="appendCategory('${element.category}')" class="form-check-input" id="checkbox${i}" value="${element.category}">
            <label class="form-check-label" for="checkbox${i}">${element.category}</label>
          </div>
        `;

      temp2 += `
        
        <div class="catorgryElems" >
        
        <span class="categoryNameDiv">
        ${element.category}
      </span>
          <button type="button" class="btn btn-danger mr-2" onclick="deleteCategory('${element._id}','${element.category}')" >Delete</button>
      </div>
        
        `;
    }

    CategoryFid.innerHTML = temp;
    CategoryDiv.innerHTML = temp2;
    updateBlogUpdate(data.data);
  } catch (error) {
    console.log(error);
  }
}

getCategorys();

function appendCategory(cate) {
  if (CategoryList.includes(cate)) {
    CategoryList = CategoryList.filter((item) => item !== cate);
  } else {
    CategoryList.push(cate);
  }
  console.log(CategoryList);
}

function setStories() {
  if (stories) {
    stories = false;
  } else {
    stories = true;
  }
}

function setRecomend() {
  if (setRecomendtion) {
    setRecomendtion = false;
  } else {
    setRecomendtion = true;
  }
}

async function deleteCategory(id, name) {
  window.alert(`Do you want to delete category, ${name}`);

  try {
    const response = await fetch(
      `${API_URI}/api/v1/deleteCategory/${id}`,
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
    toastit("User Deleted ", "s");
    getCategorys();
  } catch (error) {
    console.log(error);
  }
}

async function updateBlogUpdate(CategoryList) {
  console.log(CategoryList);
  const blogId = localStorage.getItem("currentBlogID");

  if (blogId) {
    try {
      const response = await fetch(
        `${API_URI}/api/v1/getblog/${blogId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok === false) {
        console.log("error");
        return;
      }

      const { data } = await response.json();

      document.getElementById("blogTitle").value = data.Title;
      document.getElementById("textArea").value = data.paragraph;
      if (data.stories) {
        document.getElementById("storiesCheck").checked = true;
        stories = true;
      }
      
      if (data.recommended) {
        document.getElementById("RecommendCheck").checked = true;
        setRecomendtion = true;
      }

      for (let i = 0; i < data.category.length; i++) {
        const element1 = data.category[i];
        for (let j = 0; j < CategoryList.length; j++) {
          const element2 = CategoryList[j].category;
          if (element1 === element2) {
            appendCategory(element1)
            document.getElementById(element1).checked = true;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}


function logOutUser() {
    
  document.cookie = "Token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload(true)


}