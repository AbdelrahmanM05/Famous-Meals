$(() => {
  $("#loader .sk-chase").fadeOut(800, () => {
    $("#loader").fadeOut(1000, () => {
      $("body").css("overflow", "visible");
      $("#main").fadeIn(500);
      searchByName(" ");
    });
  });
});

// SIDEMENU *SECTION

let sideBarPostion = $(".side-bar").innerWidth();
$(".side-menu").css({ left: -sideBarPostion });
$("#menu li").animate({ top: 300 });
$("#openBtn").click(() => {
  if ($(".side-menu").css("left") == "0px") {
    $("#openBtn").attr(
      "class",
      "fa-solid open-close-icon fa-2x fa-align-justify"
    );

    $("#menu li").animate(
      {
        top: 300,
      },
      500
    );
    $(".side-menu").animate({ left: -sideBarPostion }, 500);
  } else {
    $("#openBtn").attr("class", "fa-solid open-close-icon fa-2x fa-x");
    for (let i = 0; i < 5; i++) {
      $("#menu li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
    $(".side-menu").animate({ left: 0 }, 500);
  }
});

// Data *SECTION

async function searchByName(name) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await res.json();
  let finalData = displayHeader(data.meals.slice(0, 20));
  $(".meals").html(finalData);
}

async function searchByLetter(letter) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await res.json();
  let finalData = displayHeader(data.meals.slice(0, 20));
  $(".meals").html(finalData);
}

async function category() {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
  });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await res.json();
  displayCate(data.categories.slice(0, 20));
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function getCategoryMeals(category) {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
  });
  $("html,body").animate({ scrollTop: 0 });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await res.json();
  $("#showCategories").fadeOut(10);
  let finalData = displayHeader(data.meals.slice(0, 20));
  $(".meals").fadeIn(1000);
  $(".meals").html(finalData);
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function area() {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
  });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await res.json();
  displayCities(data.meals.slice(0, 20));
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function getAreaMeals(area) {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
  });
  $("html,body").animate({ scrollTop: 0 });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await res.json();
  $("#showArea").fadeOut(10);
  let finalData = displayHeader(data.meals);
  $(".meals").html(finalData);
  $(".meals").fadeIn(1000);
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function ingredient() {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
  });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await res.json();
  displayIngred(data.meals.slice(0, 20));
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function getIngredientMeals(ingredient) {
  $("#loader").fadeIn(600, () => {
    $("#loader .sk-chase").fadeIn();
  });
  $("html,body").animate({ scrollTop: 0 });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await res.json();
  $("#showIngred").fadeOut();
  let finalData = displayHeader(data.meals);
  $(".meals").html(finalData);
  $(".meals").fadeIn(1000);
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
}

async function details(id) {
  $("#loader").fadeIn(600, () => {
    $("#loader .sk-chase").fadeIn();
  });
  $("html,body").animate({ scrollTop: 0 });
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await res.json();
  displayDetails(data.meals[0]);
  $("#loader .sk-chase").fadeOut(400, () => {
    $("#loader").fadeOut(600);
  });
}

// DISPLAY *SECTION

function displayHeader(list) {
  let row = ``;
  for (let i = 0; i < list.length; i++) {
    row += `<div class="col-md-3">
             <div onclick="details('${list[i].idMeal}')" class="small-meal rounded-2 position-relative overflow-hidden">
               <img
                src="${list[i].strMealThumb}"
                class="img-fluid "
                alt=""
               />
               <div
                 class="cont_imgs position-absolute d-flex align-items-center"
               >
                 <h3 class="fw-bolder">${list[i].strMeal}</h3>
               </div>
             </div>
          </div>`;
  }
  return row;
}

function displayCate(categories) {
  let cartona = ``;
  for (let i = 0; i < categories.length; i++) {
    cartona += `<div class="col-md-3" >
            <div onclick="getCategoryMeals('${
              categories[i].strCategory
            }')" class="small-meal position-relative rounded-2 overflow-hidden" >
              <img
                src="${categories[i].strCategoryThumb}"
                class="w-100"
                alt=""
              />
              <div
                class="cont_imgs position-absolute text-center p-2"
              >
                <h3 class="fw-bolder">${categories[i].strCategory}</h3>
                <p>${categories[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div>`;
  }
  $("#showCategories").html(cartona);
}

function displayCities(cities) {
  let cartona = ``;
  for (let i = 0; i < cities.length; i++) {
    cartona += `          <div class="col-md-3">
            <div onclick="getAreaMeals('${cities[i].strArea}')" class="content_area text-center"  >
              <i class="fa-solid fa-house-laptop fa-4x text-white mb-1"></i>
              <h3 class="text-white">${cities[i].strArea}</h3>
            </div>
          </div>`;
  }
  $("#showArea").html(cartona);
}

function displayIngred(ingredient) {
  let cartona = ``;
  for (let i = 0; i < ingredient.length; i++) {
    cartona += ` <div class="col-md-3">
            <div class="content_ingred text-center" onclick="getIngredientMeals('${
              ingredient[i].strIngredient
            }')">
              <i class="fa-solid fa-drumstick-bite fa-4x text-white text-center mb-1"></i>
              <h3 class="text-white">${ingredient[i].strIngredient}</h3>
              <p class="text-white">${ingredient[i].strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>`;
  }
  $("#showIngred").html(cartona);
}

function displayDetails(meal) {
  $(".meals").html("");
  $("#contact").css("display", "none");
  $("#main").css("display", "none");
  $("#search").css("display", "none");
  $("#categories").css("display", "none");
  $("#area").css("display", "none");
  $("#ingredients").css("display", "none");
  $("#details").css("display", "block");
  let measures = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      measures += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  // let tags = meal.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let box = `<div class="col-md-4">
            <div class="img_details">
              <img
                src="${meal.strMealThumb}"
                class="img-fluid rounded-2 mb-2"
                alt=""
              />
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          <div class="col-md-8">
            <div class="content_details">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
            <p class="fs-2 fw-bolder">Area : <span>${meal.strArea}</span></p>
            <p class="fs-2 fw-bolder">Category :<span>${meal.strCategory}</span></p>
            <p class="fs-2 fw-bolder">Recipes :</p>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${measures}
            </ul>
            <p class="fs-2 fw-bolder">Tags :</p>
             <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
              </ul>
            <a class="btn btn-success" href="${meal.strSource}">Source</a>
            <a class="btn btn-danger" href="${meal.strYoutube}">Youtube</a>
            </div>`;

  $("#showDetails").html(box);
}

$("#searchByName").keyup(() => {
  $("#loader").fadeIn(400, () => {
    $("#loader .sk-chase").fadeIn();
  });
  searchByName($("#searchByName").val());
  $("#loader .sk-chase").fadeOut(400, () => {
    $("#loader").fadeOut(600);
  });
});
$("#searchByLetter").keyup(() => {
  $("#loader").fadeIn(400, () => {
    $("#loader .sk-chase").fadeIn();
  });
  searchByLetter($("#searchByLetter").val());
  $("#loader .sk-chase").fadeOut(400, () => {
    $("#loader").fadeOut(600);
  });
});

// Anchors

$("#searchAnc").click(() => {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
    $("#search").css("display", "block");
    $("#main").css("display", "none");
    $(".meals").html("");
    $("#details").css("display", "none");
    $("#categories").css("display", "none");
    $("#area").css("display", "none");
    $("#ingredients").css("display", "none");
    $("#contact").css("display", "none");
    $(".side-menu").animate({ left: -sideBarPostion }, 500);
    $("#openBtn").attr(
      "class",
      "fa-solid open-close-icon fa-2x fa-align-justify"
    );
  });
  $("#loader .sk-chase").fadeOut(600, () => {
    $("#loader").fadeOut(800);
  });
});

$("#categoriesAnc").click(() => {
  $("#main").fadeOut();
  $(".meals").fadeOut();
  $("html,body").animate({ scrollTop: 0 });
  $("#categories").css("display", "block");
  $("#showCategories").fadeIn();
  category();
  $("#search").css("display", "none");
  $("#main").css("display", "none");
  $("#details").css("display", "none");
  $("#area").css("display", "none");
  $("#ingredients").css("display", "none");
  $("#contact").css("display", "none");
  $(".side-menu").animate({ left: -sideBarPostion }, 500);
  $("#openBtn").attr(
    "class",
    "fa-solid open-close-icon fa-2x fa-align-justify"
  );
});

$("#areaAnc").click(() => {
  $("#main").fadeOut();
  $(".meals").fadeOut();
  $("html,body").animate({ scrollTop: 0 });
  $("#area").css("display", "block");
  $("#showArea").fadeIn();
  area();
  $("#main").css("display", "none");
  $("#details").css("display", "none");
  $("#search").css("display", "none");
  $("#categories").css("display", "none");
  $("#ingredients").css("display", "none");
  $("#contact").css("display", "none");
  $(".side-menu").animate({ left: -sideBarPostion }, 500);
  $("#openBtn").attr(
    "class",
    "fa-solid open-close-icon fa-2x fa-align-justify"
  );
});

$("#ingredientsAnc").click(() => {
  $("#main").fadeOut();
  $(".meals").fadeOut();
  $("html,body").animate({ scrollTop: 0 });
  $("#ingredients").css("display", "block");
  $("#showIngred").fadeIn();
  ingredient();
  $("#main").css("display", "none");
  $("#details").css("display", "none");
  $("#search").css("display", "none");
  $("#categories").css("display", "none");
  $("#area").css("display", "none");
  $("#contact").css("display", "none");
  $(".side-menu").animate({ left: -sideBarPostion }, 500);
  $("#openBtn").attr(
    "class",
    "fa-solid open-close-icon fa-2x fa-align-justify"
  );
});

$("#contactAnc").click(() => {
  $("#loader").fadeIn(300, () => {
    $("#loader .sk-chase").fadeIn();
    $("#contact").css("display", "block");
    $("#main").css("display", "none");
    $("#details").css("display", "none");
    $("#search").css("display", "none");
    $("#categories").css("display", "none");
    $("#area").css("display", "none");
    $("#ingredients").css("display", "none");
    $(".side-menu").animate({ left: -sideBarPostion }, 500);
    $("#openBtn").attr(
      "class",
      "fa-solid open-close-icon fa-2x fa-align-justify"
    );
  });
  $("#loader .sk-chase").fadeOut(400, () => {
    $("#loader").fadeOut(600);
  });
});

// CONTACT *SECTION

function validateName() {
  let regex = /^[A-Z][a-z]{3,8}$/gm;
  if (regex.test($("#userName").val())) {
    return true;
  } else {
    return false;
  }
}

function validateEmail() {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
  if (regex.test($("#userEmail").val())) {
    return true;
  } else {
    return false;
  }
}
function validateNumber() {
  let regex = /^(002)?01[0125][0-9]{8}$/gm;
  if (regex.test($("#userPhone").val())) {
    return true;
  } else {
    return false;
  }
}

function validateAge() {
  if ($("#userAge").val() < 0 || $("#userAge").val() > 100) {
    return false;
  } else {
    return true;
  }
}

function validatePassword() {
  let regex = /^[A-Za-z]\w{7,14}$/gm;
  if (regex.test($("#userPassword").val())) {
    return true;
  } else {
    return false;
  }
}

function validateRePassword() {
  if ($("#rePassword").val() != $("#userPassword").val()) {
    return false;
  } else {
    return true;
  }
}

$("#userName").change(() => {
  if (!validateName()) {
    $("#alertName").fadeIn();
  } else {
    $("#alertName").hide();
  }
  checkValid();
});
$("#userEmail").change(() => {
  if (!validateEmail()) {
    $("#alertEmail").fadeIn();
  } else {
    $("#alertEmail").hide();
  }
  checkValid();
});

$("#userPhone").change(() => {
  if (!validateNumber()) {
    $("#alertPhone").fadeIn();
  } else {
    $("#alertPhone").hide();
  }
  checkValid();
});

$("#userAge").change(() => {
  if (!validateAge()) {
    $("#alertAge").fadeIn();
  } else {
    $("#alertAge").hide();
  }
  checkValid();
});

$("#userPassword").change(() => {
  if (!validatePassword()) {
    $("#alertPass").fadeIn();
  } else {
    $("#alertPass").hide();
  }
  checkValid();
});
$("#rePassword").change(() => {
  if (!validateRePassword()) {
    $("#alertRePass").fadeIn();
  } else {
    $("#alertRePass").hide();
  }
  checkValid();
});

let submitBtn = document.querySelector("#submitBtn");

function checkValid() {
  if (
    validateName() &&
    validateEmail() &&
    validateNumber() &&
    validateAge() &&
    validatePassword() &&
    validateRePassword()
  ) {
    console.log("valid");
    submitBtn.removeAttribute("disabled");
  } else {
    console.log("not valid");
    submitBtn.setAttribute("disabled", true);
  }
}
