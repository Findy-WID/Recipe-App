const recipeSearch = document.querySelector(".recipeSearch");
const Btnsearch = document.querySelector(".Btnsearch");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");
const recipeDetailsContent = document.querySelector(".recipeDetailsContent");

const fetchRecipes = async (query) => {
    try {
        recipeContainer.innerHTML = "<h2>Fetching Recipes ...</h2>"
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        console.log(response);

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {

            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add('recipes');
            recipeDiv.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>Category: ${meal.strCategory}</p>
            <p>${meal.strArea}</p>`;

            const button = document.createElement("button");
            button.textContent = "View recipes";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })

            recipeContainer.appendChild(recipeDiv);
        });

        //Function to fetch ingredients and measurements
       const fetchIngredients = (meal) => {
        let ingredientsList = "";

        for(i=1; i<=20; i++) {
            const ingredient = meal[`strIngredient${i}`];

            if(ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            } else {
                break;
            }
        }
        return ingredientsList;
       }

        const openRecipePopup = (meal) => {
            recipeDetailsContent.innerHTML = `
            <h2 class = "recipeName">${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul class = "IngredientList">${fetchIngredients(meal)}</ul>
            <div>
            <h3>Instructions:</h3>
            <p class = "instructions">${meal.strInstructions}</p>
            </div>
            `
            recipeDetailsContent.parentElement.style.display = "block";
        }        
    } catch (error) {
        console.error("Failed to fetch recipes", error);
    }
    recipeCloseBtn.addEventListener('click', () => {
        recipeDetailsContent.parentElement.style.display = "none";
    })
}

Btnsearch.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log("Button Clicked");
    const query = recipeSearch.value;
    fetchRecipes(query);
});

//EXERCISES:
//1. const getData = () => {
//     return new Promise((resolve, reject) => {
//         resolve('data received')
//     });
// };

// const processdata = (data) => {
//     return new Promise((resolve, reject) => {
//         if (data) {
//             resolve ('data processed');
//         } else {
//             reject ("Failure to resolve");
//         }
//     })
// }
// getData()
// .then((data) => processdata(data))
// .then((result) => console.log(result))
// .catch((error) => console.error('error found'));

//2. const fetchUserData = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({id:1, name: 'Alice'});
//         }, 1000);
//     });
// };
// const fetchUserPost = (id) => {
//     return new Promise((resolve, reject) => {
//         if(id === 1) {
//             resolve(['Post 1', 'Post 2']);
//         } else {
//             reject ('User not found');
//         };
//     });
// }
// fetchUserData()
// .then((person) => fetchUserPost(person.id))
// .then((Arr) => console.log(Arr[0]))
// .catch((error) => console.log('Error found', error));
 
// const fetchUserData = async () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({id:1, name: 'Alice'});
//         }, 1000);
//     });
// };

//3. const fetchUserPost = async (id) => {
//     return new Promise((resolve, reject) => {
//         if (id === 1) {
//             resolve(['post 1', 'post 2']);
//         } else {
//             reject ('User Not Found');
//         };
//     });
// };

// const consoleData = async () => {
//     try {
//         const person = await fetchUserData();
//         const post = await fetchUserPost(person.id);
//         console.log(post);
        
//     } catch (error) {
//         console.error(error);
//     }
// };

// consoleData();
//4. const fetchUserId = async () => {
//     return new Promise((res, rej) => {
//         setTimeout (() => {
//             res({id:1});
//         }, 1000);
//     });
// };

// const fetchUserData = async (id) => {
//     return new Promise((a, b) => {
//         setTimeout(() => {
//             a({data: `user data user with id: ${id}`});
//         }, 1000);
//     })
// };


// const getUserDetails = async () => {
//     try {
//         const userId = await fetchUserId();
//         const userData = await fetchUserData(userId.id);
//         console.log(userData);
        
//     } catch (error) {
//         console.error ("An error was found:", error);
//     };
// };

// getUserDetails ();

//5. function delay (ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve (`This message waited for ${ms} seconds`);
//             console.log(resolve);
//         }, ms);
//     });
// };
// delay (1000)
// .then(() => delay (2000))
// .then(() => delay (5000))
// .catch((error) => console.log ('Error Found!!!'))

// 6. const fetchProduct = async () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({id:1, name: "Laptop"})
//         }, 1000);
//     });
// };
// const fetchPrice = async () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({id:1, price: 1000})
//         }, 1000);
//     });
// };

// const getProductDetails = async () => {
//     const productDetail = await Promise.all([
//         fetchProduct(),
//         fetchPrice(),
//     ]);
//     console.log(productDetail);
// };
// getProductDetails ();
//
// 7. const fetchComments = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(['comment1', 'comment2'])
//         }, 1000);
//     })
// };
// const fetchLikes = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject("Unable to fetch likes")
//         }, 1000);
//     })
// };
// const fetchShares = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(5)
//         }, 1000);
//     })
// };

// async function getAllResults () {
//     const Results = await Promise.allSettled([
//         fetchComments(),
//         fetchLikes(),
//         fetchShares()
//     ]).then((result) => console.log(result));
// };

// getAllResults();



















