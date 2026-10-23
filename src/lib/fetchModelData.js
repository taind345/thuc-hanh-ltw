import models from "../modelData/models";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        // Fallback to local models if server is not available
        if (url === "/user/list") {
          resolve({ data: models.userListModel() });
        } else if (url.startsWith("/user/")) {
          const id = url.substring("/user/".length);
          const user = models.userModel(id);
          if (user) resolve({ data: user });
          else reject(error);
        } else if (url.startsWith("/photosOfUser/")) {
          const id = url.substring("/photosOfUser/".length);
          resolve({ data: models.photoOfUserModel(id) });
        } else if (url === "/test/info") {
          resolve({ data: models.schemaInfo() });
        } else {
          reject(error);
        }
      });
  });
}

export default fetchModel;
