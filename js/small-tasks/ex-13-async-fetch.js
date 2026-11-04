const testLink = "https://jsonplaceholder.typicode.com";

// ------------ q1 ------------
function getUserData(userId) {
  const url = `${testLink}/users/${userId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`User's name: ${data.name}`))
    .catch((error) => console.error(error));
}

// ------------ q2 ------------
function getPostDetails(postId) {
  const url = `${testLink}/posts/${postId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`Post title: ${data.title}`))
    .catch((error) => console.error(error));
}

// ------------ q3 ------------
function getUserEmail(userId) {
  const url = `${testLink}/users/${userId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`User's email: ${data.email}`))
    .catch((error) => console.error(error));
}
// ------------ q4 ------------
function listUserTodos(userId) {
  const url = `${testLink}/todos?userId=${userId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`User ${userId} has ${data.length} todos.`))
    .catch((error) => console.error(error));
}

// ------------ q5 ------------
function checkPostExists(postId) {
  const url = `${testLink}/posts/${postId}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      console.log(`Post ${postId} exists.`);
    } else {
      console.log(`Post ${postId} does not found.`);
    }
  });
}

// ------------ q6 ------------
function fetchWithDelay(url, delay) {
  setTimeout(() => {
    fetch(url).then((res) =>
      res
        .json()
        .then((data) =>
          console.log(`First 50 chars: ${JSON.stringify(data).slice(0, 50)}`),
        ),
    );
  }, delay);
}
// ------------ q7 ------------
function showKeys(url) {
  fetch(url).then((res) =>
    res.json().then((data) => {
        console.log(data);
      console.log("Keys: ", Object.keys(data));
    }),
  );
}

// ------------ q8 ------------
function getUserFirstPost(userId) {
  const url = `${testLink}/users/${userId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((userData) => {
      return fetch(`${testLink}/posts?userId=${userData.id}`);
    })
    .then((response) => response.json())
    .then((postsData) => {
      console.log(`First post title: ${postsData[0].title}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

//----------- q9 ------------
function getPostCommentsCount(postId) {
  const url = `${testLink}/posts/${postId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((postData) => {
      return fetch(`${testLink}/comments?postId=${postData.id}`);
    })
    .then((response) => response.json())
    .then((commentsData) => {
      console.log(`Post ${postId} has ${commentsData.length} comments.`);
    })
    .catch((error) => {
      console.error(error);
    });
}

//------------ q10 ------------
function todoAndUser(todoId) {
  const url = `${testLink}/todos/${todoId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((todoData) => {
      return fetch(`${testLink}/users/${todoData.userId}`)
        .then((response) => response.json())
        .then((userData) => {
          console.log(
            `Todo title: ${todoData.title} \nUser name: ${userData.name}`,
          );
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

// ------------ main ------------
function main() {
//   console.log("q1: Get User Data");
//   getUserData(1);

//   console.log("q2: Get Post Details");
//   getPostDetails(1);

//   console.log("q3: Get User Email");
//   getUserEmail(1);

//   console.log("q4: Amount of User Todos");
//   console.log(listUserTodos(3));

//   console.log("q5: Check if Post Exists");
//   checkPostExists(1);

//   console.log("q6: Fetch with Delay");
//   fetchWithDelay(`${testLink}/posts/1`, 2000);

  console.log("q7: Show Keys");
  showKeys(`${testLink}/posts/1`);

//   console.log("q8: Get User's First Post");
//   getUserFirstPost(1);

//   console.log("q9: Get Post Comments Count");
//   getPostCommentsCount(1);

//   console.log("q10: Get Todo and User");
//   todoAndUser(1);
}
main();
