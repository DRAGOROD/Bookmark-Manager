
//Returns the bookmarks array from localStorage.//
function getBookmarks() {
  const stored = localStorage.getItem("bookmarks");

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

//SECTION REFERENCES//

const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");

//Toggle between main and form //
function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

//Toggle between main and category list//
function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}


const categoryDropdown = document.getElementById("category-dropdown");
const categoryNames = document.querySelectorAll(".category-name");

const addBookmarkButton = document.getElementById("add-bookmark-button");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkFormButton = document.getElementById("add-bookmark-button-form");

const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");

//Open form//
addBookmarkButton.addEventListener("click", () => {
  categoryNames.forEach(el => {
    el.innerText = categoryDropdown.value;
  });
  displayOrCloseForm();
});

//Close form//
closeFormButton.addEventListener("click", displayOrCloseForm);

//Save bookmark//
addBookmarkFormButton.addEventListener("click", () => {
  const bookmarks = getBookmarks();

  bookmarks.push({
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
});

//VIEW CATEGORY//

const viewCategoryButton = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");

viewCategoryButton.addEventListener("click", () => {
  const selectedCategory = categoryDropdown.value;

  categoryNames.forEach(el => {
    el.innerText = selectedCategory;
  });

  const bookmarks = getBookmarks();
  const filtered = bookmarks.filter(
    bookmark => bookmark.category === selectedCategory
  );

  if (filtered.length === 0) {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    categoryList.innerHTML = filtered
      .map((bookmark, index) => `
        <div>
          <input
            type="radio"
            id="bookmark-${index}"
            name="bookmark"
            value="${bookmark.name}"
          />
          <label for="bookmark-${index}">
            <a href="${bookmark.url}" target="_blank">
              ${bookmark.name}
            </a>
          </label>
        </div>
      `)
      .join("");
  }

  displayOrHideCategory();
});

//CLOSE LIST/

const closeListButton = document.getElementById("close-list-button");
closeListButton.addEventListener("click", displayOrHideCategory);

// DELETE BOOKMARK/

const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

deleteBookmarkButton.addEventListener("click", () => {
  const selectedRadio = document.querySelector(
    'input[name="bookmark"]:checked'
  );

  if (!selectedRadio) return;

  const bookmarks = getBookmarks();
  const selectedCategory = categoryDropdown.value;

  const updatedBookmarks = bookmarks.filter(
    bookmark =>
      !(
        bookmark.name === selectedRadio.value &&
        bookmark.category === selectedCategory
      )
  );

  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

  viewCategoryButton.click(); // refresh list//
});